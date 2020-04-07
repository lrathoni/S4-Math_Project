const state = {
	buildings: {},
	selected: undefined
}

const mutations = {
	/**
	* Load building properties from file and append to the array of available buildings in the state
	* */
	addBuilding(state, payload) {
		state.buildings[payload.buildingName] = require(`../../assets/buildings/${payload.buildingName}.json`);
	},
	setSelected(state, selected) {
		state.selected = selected;
	}
}

const actions = {
	/**
	 * Initialize state's available buildings using an array of building names to retrieve
	 * @param payload .buildings property should look like this ['nameOfABuilding', 'anotherBuilding']
	 * It must match a building's JSON filename
	 * */

	init(context, payload) {
		payload.buildings.forEach(buildingName => context.commit('addBuilding', { buildingName }));
		context.commit('setSelected', payload.buildings[0]);
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
	},
	SELECTED(state) {
		return state.buildings[state.selected]
	},
	DIMENSIONS(state) {
		return {
			width: state.buildings[state.selected].width,
			height: state.buildings[state.selected].height
		}
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
