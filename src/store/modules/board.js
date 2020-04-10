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
			visitors: Number
		}*/
	],
	weather: 'sun' // NOTE possible values: 'sun' || 'clouds' || 'rain'
}

const mutations = {
	addSquare(state, payload) {
		const { x, y, building } = payload;
		state.squares.push({
			id: state.currentID,
			x,
			y,
			building,
			visitors: 0
		})
	},

	addVisitorToBuilingById(state, id) {
		state.squares.find(square => square.id == id).visitors++;
	},

	incrementIndex(state) {
		state.currentID++;
	},

	freeBuilding(state, id) {
		state.squares.find(square => square.id == id).visitors = 0;
	}
}

const actions = {
	addSquareSel(context, payload) {
		let { x, y } = payload;

		const building = context.rootState.player.selected;

		context.commit('addSquare', { x, y, building });

		/* INFO update the internal index system */
		context.commit('incrementIndex');
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
			if (square.visitors === square.building.capacity) {
				console.log('full')
				setTimeout(() => {
					context.commit('visitors/increment_goneVisitors', square.visitors, { root: true });
					context.commit('freeBuilding', square.id);
				}, square.building.duration * 1000);
			}
		}
		else {
			context.commit('visitors/increment_goneVisitors', 1, { root: true });
		}
		context.commit('visitors/decrement_nextWaveVisitors', null, { root: true });
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
		//const dimensions = getters['buildings/DIMENSIONS'];
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

	AVAILABLE_BUILDING_IDS(state) {
		return state.squares.filter(square => square.building.capacity > square.visitors).map(square => square.id);
	}
}

export default {
	namespaced: true,
	state,
	mutations, 
	getters,
	actions
}
