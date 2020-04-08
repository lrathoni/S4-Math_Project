const state = {
	money: 500,
	selected: undefined
}

const mutations = {
	addAmountToMoney(state, payload) {
		state.money += payload.amount;
	},

	setMoney(state, money) {
		state.money = money;
	},

	setSelected(state, selected) {
		state.selected = selected;
	}
}

const getters = {
	MONEY(state) {
		return state.money;
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	getters
}
