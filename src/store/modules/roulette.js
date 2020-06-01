import {findEventBinom} from "@/math/VariablesAleatoires"



const state = {
	entries: [
		{
			message: "Due to engineering improvements, building costs rise +25%",
			callback: {
				type: "commit",
				method: "buildings/changeBuildingCosts",
				param: 0.25
			},
			position: 1,
			type: "malus",
		},
		{
			message: "Due to a banking error, you lose 50 credits",
			callback: {
				type: "commit",
				method: "player/reduceMoney",
				param: 50
			},
			position: 3,
			type: "malus"
		},
		{
			message: "The weather forecast announce rain today, don't forget your umbrella",
			callback: {
				type: "dispatch",
				method: "board/manualWeather",
				param: {
					weather: "rain",
				}
			},
			position: 2,
			type: "malus"
		},
		{
			message: "Cloudy for a period of 180 seconds",
			callback: {
				type: "dispatch",
				method: "board/manualWeather",
				param: {
					weather: "clouds",
					duration: 180 * 1000
				}
			},
			position: 9,
			type: "malus"
		},
		{
			message: "Sorry, try your luck next time",
			callback: null,
			position: 5,
			type: "none"
		},
		{
			message: "You didn't won or lost anything",
			callback: null,
			position: 8,
			type: "none"
		},
		{
			message: "Beautiful weather for 50 seconds",
			callback: {
				type: "dispatch",
				method: "board/manualWeather",
				param: {
					weather: "sun",
					duration: 50 * 1000
				}
			},
			position: 6,
			type: "bonus"
		},
		{
			message: "Your aunt is giving you 50 credits",
			callback: {
				type: "commit",
				method: "player/addAmountToMoney",
				param: 50
			},
			position: 0,
			type: "bonus"
		},
		{
			message: "Happy birthday my friend, here is 1500 credits",
			callback: {
				type: "commit",
				method: "player/addAmountToMoney",
				param: 1500
			},
			position: 7,
			type: "bonus"
		},
		{
			message: "Big discount, building costs reduced by 30%!",
			callback: {
				type: "commit",
				method: "buildings/changeBuildingCosts",
				param: -0.30
			},
			position: 4,
			type: "bonus"
		},
	]
}

const mutations = {
	add_entry(state, entry) {
		state.entries.push(entry)
	}
}

const actions = {
	/*
	initRoulette(context, payload) {
		payload.forEach(entry => {
			switch
		});
	}
*/
}

const getters = {
	RESULT(state)  {
		return p => {
			return state.entries[findEventBinom(state.entries.length - 1, p)]
		}
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}
