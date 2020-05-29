import { isBroken, Beta } from '@/math/VariablesAleatoires'

const state = {
	width: 12,
	height: 8,
	currentID: 0,
	squares: [
		/* NOTE: SCHEMA
		 {
			id: Number,
			x: Number,
			y: Number,
			building: Building,
			visitors: Number,
			running: null
			breakInterval: Interval
			brocken: Boolean
		}*/
	],
	weather: 'sun', // NOTE possible values: 'sun' || 'clouds' || 'rain'
}

const mutations = {
	addSquare(state, payload) {
		const { x, y, building, breakInterval } = payload;
		state.squares.push({
			id: state.currentID,
			x,
			y,
			building,
			visitors: 0,
			breakInterval,
			brocken: false
		})
	},

	addVisitorToBuilingById(state, id) {
		state.squares.find( square => square.id === id ).visitors++;
	},

	incrementIndex(state) {
		state.currentID++;
	},

	removeBuilding(state, id) {
		const index = state.squares.findIndex( square => square.id === id );
		if (index > -1)
			state.squares.splice(index, 1);
	},

	freeBuilding(state, id) {
		state.squares.find(square => square.id == id).visitors = 0;
	},

	set_weather(state, weather) {
		state.weather = weather;
	},

	clearRunningOutdoorBuildings(state) {
		state.squares.filter(square => !square.building.indoor && square.running)
			.forEach(square => clearTimeout(square.running));
	},

	clearBuilding(state, id) {
		const square = state.squares.find( square => square.id === id );
		clearTimeout(square.running);
	},

	freeOutdoorBuildings(state) {
		state.squares.filter(square => !square.building.indoor)
			.forEach(square => square.visitors = 0);
	},

	setBrockenBuilding(state, id) {
		const square = state.squares.find( square => square.id === id );
		square.brocken = true;
	}
}

const actions = {
	removeBuilding(context, id) {
		const square = context.state.squares.find(square => square.id === id);
		console.log(square.building.price, context.rootState.player.money)
		if (square.building.price / 2 <= context.rootState.player.money) {
			const removalPrice = square.building.price * 0.33
			context.commit('removeBuilding', id);
			context.commit('player/reduceMoney', removalPrice, { root: true });
			//context.commit('stats/inc_moneySpent', removalPrice, { root: true })
		}
	},
	addSquareSel(context, payload) {
		let { x, y } = payload
		const building = context.rootState.player.selected

		context.commit('player/reduceMoney', building.price, { root: true })
		//context.commit('stats/inc_moneySpent', building.price, { root: true })
		//context.commit('stats/inc_builtBuildings', null, { root: true })

		const breakInterval = setInterval((id) => {
			// TODO random variable here
			if ( isBroken(building.durability) ) {
				context.dispatch('breakBuilding', id)
			}
		}, 5000, context.state.currentID);
		context.commit('addSquare', { x, y, building, breakInterval })
		/* INFO update the internal index system */
		context.commit('incrementIndex')
	},

	breakBuilding(context, id) {
		const square = context.state.squares.find(square => square.id === id);
		clearInterval(square.breakInterval);
		context.commit('setBrockenBuilding', id);
		context.commit('player/reduceHappiness', context.getters['HAPPINESS_BY_BUILDING_ID'](id) * 1.5, { root: true });
		context.commit('clearBuilding', id);
		context.commit('player/reduceMoney', square.visitors * square.building.ticket_cost, { root: true });
		context.commit('visitors/increment_goneVisitors', square.visitors, { root: true });
		context.commit('freeBuilding', id);
		//context.commit('stats/inc_brockenBuildings', null, { root: true });
		//context.commit('stats/inc_moneyGained',
			//-square.visitors * square.building.ticket_cost, { root: true });
	},

	/**
	 * Dispatches a visitor from the current wave to any available building
	 * The one that can't go anywhere, go straight to the exit of the park
	 * */
	addVisitorToRandomBuilding(context) {
		const availableBuildingIds = context.getters['AVAILABLE_BUILDING_IDS'];
		if (availableBuildingIds.length) {
			const randomIndex = Math.floor(Math.random() * availableBuildingIds.length);
			const randomBuildingId = availableBuildingIds[randomIndex];
			context.commit('addVisitorToBuilingById', randomBuildingId);

			const square = state.squares.find(square => square.id == randomBuildingId);
			context.commit('player/addAmountToMoney', square.building.ticket_cost, { root: true });
			//context.commit('stats/inc_moneyGained', square.building.ticket_cost, { root: true });

			if (square.visitors === square.building.capacity) {
				square.running = setTimeout(() => {
					// TODO calculate the bonus: happiness points because this is the end of the attraction
					context.commit('player/addHappiness', context.getters['HAPPINESS_BY_BUILDING_ID'](square.id), { root: true })
					context.commit('visitors/increment_goneVisitors', square.visitors, { root: true });
					context.commit('freeBuilding', square.id);
				}, square.building.duration * 1000);
			}
		} else {
			context.commit('player/reduceHappiness', 100, { root: true })
			context.commit('visitors/increment_goneVisitors', 1, { root: true });
		}
	},

	weatherUpdater(context) {
		const w = ["sun", "sun", "sun", "sun", "sun", "sun", "sun", "rain", "clouds", "clouds", "clouds"]
		const rand = Math.floor(Math.random() * 11)

		const duration = 1000 * Beta(5, 30, 4)
		//const duration = 1000 *  (Math.random() * 25 + 5)
		context.dispatch('changeWeather', w[rand])
		//context.dispatch('stats/incrementWeatherTime', {
			//type: w[rand],
			//duration: duration
		//}, { root: true })
		setTimeout(() => context.dispatch('weatherUpdater'), duration)
	},

	changeWeather(context, newWeather) {
		if (newWeather === 'rain') {
			context.dispatch('visitors/moveVisitorsInOutdoorBuildingsToExit', null, { root: true });
			context.commit('clearRunningOutdoorBuildings');
			context.commit('freeOutdoorBuildings');
		}
		context.commit('set_weather', newWeather);
	},
}

function isOverlaping(squares, element) {
	/* INFO boolean */
	const squareOverlap = squares.some(square => {

		/* INFO start of A must be located before end of B and end of A after start of B 
		 *    start
		 *
		 *        +---------+
		 *        |         |
		 *        |    A +---------+
		 *        |      |         |
		 *        +------|    B    |
		 *               |         |
		 *               +---------+
		 */
		if (
			element.x + element.width - 1 >= square.x &&
			element.x <= square.x + square.building.width - 1 && 
			element.y + element.height - 1 >= square.y &&
			element.y <= square.y + square.building.height - 1
		) return true;
		else return false;
	});

	/* INFO do the check */
	if (squareOverlap)
		return true;
	else
		return false;
}

const getters = {
	/**
	 * Verifies that for a pair of x and y coordinate, the user can place a building at this position
	 * The size of the building is determined by the currently selected building
	 * @param x coordinate in board space
	 * @param y coordinate in board space
	 */
	IS_CONSTRUCTIBLE(state) {
		return (x, y, width, height) => {
			if ((x + width - 1) > state.width)
				return false;
			else if ((y + height - 1) > state.height)
				return false;
			else {
				if (isOverlaping(state.squares, { width, height, x, y }))
					return false;
				else return true;
			}
		} 
	},

	/**
	 * Returns an array of building IDs
	 * The selected buildings have at least one free space and in case of rainy weather they must be indoor
	 * @returns Array of building IDs, can be empty
	 * */
	AVAILABLE_BUILDING_IDS(state) {
		return state.squares.filter(square =>
			( state.weather !== 'rain' || square.building.indoor ) &&
			square.building.capacity > square.visitors &&
			square.brocken === false
		).map(square => square.id);
	},

	AVAILABLE_BUILDING_TOTAL_CAPACITY(state) {
		return state.squares.filter(square =>
				( state.weather !== 'rain' || square.building.indoor ) &&
				square.brocken === false
			)
			//.map(square => square.building.capacity)
			.reduce((acc, square) => acc += square.building.capacity, 0);
	},

	HAPPINESS_BY_BUILDING_ID(state) {
		return (id) => {
			const square = state.squares.find(square => square.id === id)
			return square.building.capacity * square.building.duration * square.building.happiness;
		}
	}
}

export default {
	namespaced: true,
	state,
	mutations, 
	getters,
	actions
}
