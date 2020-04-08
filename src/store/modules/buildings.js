const state = {
	buildings: {},
}

const mutations = {
	/**
	* Load building properties from file and append to the array of available buildings in the state
	* */
	loadBuilding(state, payload) {
		state.buildings[payload.buildingName] = require(`../../assets/buildings/${payload.buildingName}.json`);
	},
}

const actions = {
}

const getters = {
	/**
	 * Retrieve properties of a specific building through it's name
	 * */
	BUILDING_BY_NAME(state) {
		return (name) => {
			return state.buildings[name];
		}
	},
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
