import Vue from 'vue';
import Vuex from 'vuex';
import buildings from './modules/buildings';
import player from './modules/player';
import board from './modules/board';
//import network from './modules/network';
//import neuron from './modules/neuron';

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
		context.commit('player/setSelected', context.state.buildings.buildings[payload.buildings[0]]);
	}
}

//const getters = { }

export default new Vuex.Store({
	//state,
	//mutations,
	actions,
	//getters,
	modules: {
		buildings,
		player,
		board
	}
})

