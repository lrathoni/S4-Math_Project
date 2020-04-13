const state = {
	entries: [
		/* NOTE Schema
		 * callback: (),
		 * entry: { Entry JSON },
		 * value: Number
		 * */
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

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
