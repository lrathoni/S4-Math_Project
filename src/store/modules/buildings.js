import Vue from 'vue'

const state = {
	buildings: {
		"cinema": {
			"id": "cinema",
			"name": "Cinecity",
			"price": 450,
			"ticket_cost": 6,
			"happiness": 8,
			"duration": 15,
			"capacity": 50,
			"build-time": 10,
			"durability": 0.992,
			"image": "cinema.png",
			"indoor": true,
			"width": 2,
			"height": 3
		},
		"drink": {
			"id": "drink",
			"name": "Drinks and beverages",
			"price": 150,
			"ticket_cost": 5,
			"happiness": 5,
			"duration": 5,
			"capacity": 15,
			"build-time": 4,
			"durability": 0.995,
			"image": "drink.png",
			"indoor": false,
			"width": 1,
			"height": 1
		},
		"food": {
			"id": "food",
			"name": "Snack",
			"price": 250,
			"ticket_cost": 4,
			"happiness": 6,
			"duration": 7,
			"capacity": 20,
			"build-time": 10,
			"durability": 0.993,
			"image": "food.png",
			"indoor": true,
			"width": 1,
			"height": 2
		},
		"roller-coaster": {
			"id": "roller-coaster",
			"name": "Roller Coaster",
			"price": 750,
			"happiness": 35,
			"ticket_cost": 15,
			"duration": 12,
			"capacity": 16,
			"build-time": 10,
			"durability": 0.960,
			"image": "roller-coaster.png",
			"indoor": false,
			"width": 3,
			"height": 3
		},
		"wheel": {
			"id": "wheel",
			"name": "Mega Wheel",
			"price": 600,
			"ticket_cost": 9,
			"happiness": 22,
			"duration": 18,
			"capacity": 25,
			"build-time": 4,
			"durability": 0.97,
			"image": "wheel.png",
			"indoor": false,
			"width": 2,
			"height": 3
		}
	},
}

const mutations = {
	/**
	* Load building properties from file and append to the array of available buildings in the state
	* */
	loadBuilding(state, payload) {
		state.buildings[payload.buildingName] = require(`../../assets/buildings/${payload.buildingName}.json`);
	},
	changeBuildingCosts(state, percentage) {
		Object.keys(state.buildings).forEach(function(key) {
			state.buildings[key].price += Math.floor(state.buildings[key].price * percentage)
		});
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
