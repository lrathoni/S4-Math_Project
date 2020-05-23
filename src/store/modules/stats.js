const state = {
	weatherTime: {
		clouds: 0,
		rain: 0,
		sun: 0,
	},
	moneySpent: 0,
	moneyGained: 0,
	gameDuration: 0,
	brockenBuildings: 0,
	builtBuildings: 0,
}

const mutations = {
	inc_moneyGained(state, amount) {
		state.moneyGained += amount
	},
	inc_moneySpent(state, amount) {
		state.moneySpent += amount
	},
	inc_builtBuildings(state) {
		state.inc_builtBuildings++
	},
	inc_brockenBuildings(state) {
		state.brockenBuildings++
	}
}

const actions = {
	incrementWeatherTime(context, payload) {
		context.state.weatherTime[payload.type] += payload.duration
	},
	computeDuration(context) {
		context.state.gameDuration = Date.now() - context.state.gameDuration
	}
}

export default {
	namespaced: true,
	state,
	mutations
}
