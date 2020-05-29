import Vue from 'vue';
import Vuex from 'vuex';
import buildings from './modules/buildings';
import player from './modules/player';
import board from './modules/board';
import visitors from './modules/visitors'

Vue.use(Vuex);

//const state = { }
//const mutations = { } 

const actions = {
	/**
	 * Initialize state's available buildings using an array of building names to retrieve
	 * @param availableBuildings String[] should look like this ['nameOfABuilding', 'anotherBuilding']
	 * It must match a building's JSON filename
	 * */
	init(context, availableBuildings) {
		availableBuildings.forEach(buildingName => context.commit('buildings/loadBuilding', { buildingName }));

		/* INFO automatically set the first building as current selection */
		context.commit('player/setSelected', context.state.buildings.buildings[availableBuildings[0]]);

		context.dispatch('visitors/initVisitorFlow');

		setTimeout(() => context.dispatch('board/weatherUpdater'), 5000);

		//context.state.stats.gameDuration = Date.now();
	},
	stop(context) {
		//context.dispatch('stats/computeDuration');
	}
}

//const getters = { }

export default new Vuex.Store({
	//state,
	//mutations,
	//getters,
	actions,

	modules: {
		buildings,
		player,
		board,
		visitors
	}
})

