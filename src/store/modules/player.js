const state = {
	money: 500,
}

const mutations = {
	addAmountToMoney(state, payload) {
		state.money += payload.amount;
	},
	setMoney(state, money) {
		state.money = money;
	}
}

const getters = {
	MONEY(state) {
		return state.money;
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	getters
}
