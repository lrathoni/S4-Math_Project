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
	 * @param payload .buildings property should look like this ['nameOfABuilding', 'anotherBuilding']
	 * It must match a building's JSON filename
	 * */
	init(context, payload) {
		payload.buildings.forEach(buildingName => context.commit('buildings/loadBuilding', { buildingName }));

		/* INFO automatically set the first building as current selection */
		context.commit('player/setSelected', context.state.buildings.buildings[payload.buildings[0]]);

		context.dispatch('visitors/initVisitorFlow', payload.visitors);
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

