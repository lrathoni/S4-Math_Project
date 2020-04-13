const state = {
	goneVisitors: 0,
	nextWaveVisitors: 0,
	visitorPerWave: {
		sun: 20,
		clouds: 10,
		rain: 5
	}
}

const mutations = {
	set_nextWaveVisitors(state, number) {
		state.nextWaveVisitors = number;
	},

	decrement_nextWaveVisitors(state) {
		state.nextWaveVisitors--;
	},

	increment_goneVisitors(state, number = 1) {
		state.goneVisitors += number;
	},
}

const actions = {
	/**
	 * Calls 'board/addVisitorToRandomBuilding' action for each visitor in the current wave to dispatch them to a building
	 * until the wave is emptied
	 * */
	dispatchVisitorWave(context) {
		while(context.state.nextWaveVisitors) {
			context.dispatch('board/addVisitorToRandomBuilding', null, { root: true });
			context.commit('decrement_nextWaveVisitors');
		}
	},

	moveVisitorsInOutdoorBuildingsToExit(context) {
		const visitorsToGo = context.rootState.board.squares.reduce(( acc, square ) => acc + square.visitors, 0);
		console.log(visitorsToGo);
		context.commit('increment_goneVisitors', visitorsToGo);
	},

	/**
	 * Initialize the constant flow of visitors
	 */
	initVisitorFlow(context) {
		const currentWeather = context.rootState.board.weather;
		// TODO bring a random value somewhere over here
		context.commit('set_nextWaveVisitors', context.state.visitorPerWave[currentWeather]);

		setInterval(() => {
			context.dispatch('dispatchVisitorWave');

			const currentWeather = context.rootState.board.weather;
			// TODO bring a random value somewhere over here
			context.commit('set_nextWaveVisitors', context.state.visitorPerWave[currentWeather]);
		}, 2000);
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
