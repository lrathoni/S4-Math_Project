const state = {
	buildings: {}
}

const mutations = {
	/**
	* Load building properties from file and append to the array of available buildings in the state
	* */
	addBuilding(state, payload) {
		state.buildings[payload.buildingName] = require(`../../assets/buildings/${payload.buildingName}.json`);
	},
}

const actions = {
	/**
	 * Initialize state's available buildings using an array of building names to retrieve
	 * @param payload .buildings property should look like this ['nameOfABuilding', 'anotherBuilding']
	 * It must match a building's JSON filename
	 * */

	init(context, payload) {
		payload.buildings.forEach(buildingName => context.commit('addBuilding', { buildingName }));
	}
}

const getters = {
	/**
	 * Retrieve properties of a specific building through it's name
	 * */
	BUILDING(state) {
		return (name) => {
			return state.buildings[name];
		}
	},
	ALL_BUILDINGS(state) {
		return state.buildings;
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
