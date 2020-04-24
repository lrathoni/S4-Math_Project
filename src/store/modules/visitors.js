const state = {
	goneVisitors: 0,
	nextWaveVisitors: 0,
	waveInterval: 5000,
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
		const dispatchInterval = setInterval(() => {
			context.dispatch('board/addVisitorToRandomBuilding', null, { root: true });
			context.commit('decrement_nextWaveVisitors');
			if (context.state.nextWaveVisitors === 0) {
				clearInterval(dispatchInterval);
				context.dispatch('launchNewWave');
			}
		}, context.state.waveInterval / context.state.nextWaveVisitors);
	},

	moveVisitorsInOutdoorBuildingsToExit(context) {
		const visitorsToGo = context.rootState.board.squares.reduce(( acc, square ) => acc + square.visitors, 0);
		context.commit('player/reduceHappiness', visitorsToGo, { root: true });
		context.commit('increment_goneVisitors', visitorsToGo);
	},

	launchNewWave(context) {
		const currentWeather = context.rootState.board.weather;
		// TODO bring a random value somewhere over here
		context.commit('set_nextWaveVisitors', context.state.visitorPerWave[currentWeather]);

		context.dispatch('dispatchVisitorWave');

	},

	/**
	 * Initialize the constant flow of visitors
	 */
	initVisitorFlow(context) {
		context.dispatch('launchNewWave');
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
