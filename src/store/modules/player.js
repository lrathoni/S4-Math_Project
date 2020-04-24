const state = {
	money: 500,
	happiness: 0,
	maxHappiness: 100000,
	selected: undefined
}

const mutations = {
	addAmountToMoney(state, amount) {
		state.money += amount;
	},
	reduceMoney(state, amount) {
		state.money -= amount;
	},

	addHappiness(state, happiness) {
		state.happiness += happiness;
	},

	reduceHappiness(state, happiness) {
		if (state.happiness > 0)
			state.happiness -= happiness;
	},

	setMoney(state, money) {
		state.money = money;
	},

	setSelected(state, selected) {
		state.selected = selected;
	}
}

const getters = {
	HAS_ENOUGH_MONEY(state) {
		return (amount) => state.money >= amount
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
}
