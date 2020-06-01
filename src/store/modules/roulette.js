import {findEventBinom} from "@/math/VariablesAleatoires"



const state = {
	entries: [
		{
			message: "C'est la crise, les prix des installations augmentent de 25%",
			callback: {
				type: "commit",
				method: "board/changeBuildingCosts",
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
				param: "rain"
			},
			position: 2,
			type: "malus"
		},
		{
			message: "Cloudy for a period of 180 seconds",
			callback: {
				type: "dispatch",
				method: "board/manualWeather",
				param: ["sun", 180 * 1000]
			},
			position: 9,
			type: "malus"
		},
		{
			message: "On ne peut pas toujours gagner quelque-chose",
			callback: null,
			position: 5,
			type: "none"
		},
		{
			message: "T'as rien gagné, mais t'as rien perdu",
			callback: null,
			position: 8,
			type: "none"
		},
		{
			message: "Beautiful weather for 50 seconds",
			callback: {
				type: "dispatch",
				method: "board/manualWeather",
				param: ["sun", 50 * 1000]
			},
			position: 6,
			type: "bonus"
		},
		{
			message: "Tata Monique est passé te voir ce WE, tu commences avec 100 pièces de plus !",
			callback: {
				type: "commit",
				method: "player/addAmountToMoney",
				param: 100
			},
			position: 0,
			type: "bonus"
		},
		{
			message: "Bon anniversaire vous gagnez 1000",
			callback: {
				type: "commit",
				method: "player/addAmountToMoney",
				param: 1000
			},
			position: 7,
			type: "bonus"
		},
		{
			message: "Big discount, building costs reduced by 30%!",
			callback: {
				type: "commit",
				method: "board/changeBuildingCosts",
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
			return state.entries[findEventBinom(state.entries.length, p)]
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
