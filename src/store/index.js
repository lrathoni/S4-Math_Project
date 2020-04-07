import Vue from 'vue';
import Vuex from 'vuex';
import buildings from './modules/buildings';
//import network from './modules/network';
//import neuron from './modules/neuron';

Vue.use(Vuex);

const state = {
	board: {
		width: 10,
		height: 15
	},
	selWidth: 1,
	selHeight: 1,
	selName: 'noName',
	selIndex: 0,
	squares: [
		/* NOTE: SCHEMA
		 {
			id: Number,
			name: String,
			width: Number,
			height: Number,
			x: Number,
			y: Number
		}*/
	]
}

const mutations = {
	addSquare(state, payload) {
		const { name, width, height, x, y } = payload;
		state.squares.push({
			id: state.selIndex,
			name,
			width,
			height,
			x,
			y
		})
	},
	incrementIndex(state) {
		state.selIndex++;
	},
	updateSize(state, payload) {
		switch (payload.type) {
			case 'width':
				state.selWidth += payload.amount;
				state.selWidth = (state.selWidth < 0) ? 0 : state.selWidth;
				break;
			case 'height':
				state.selHeight += payload.amount;
				state.selHeight = (state.selHeight < 0) ? 0 : state.selHeight;
				break;
		}
	}
}

const actions = {
	addSquareSel({ state, commit }, payload) {
		//debugger
		let { name, x, y } = payload;
		name = name ? name : state.selName + toString(state.selIndex);
		commit('addSquare', { name, width: state.selWidth, height: state.selHeight, x, y });
		commit('incrementIndex');
	}
}

function isOverlaping(squares, element) {
	const squareOverlap = squares.some(square => {

		/* IDEA: start of A must be located before end of B and end of A after start of B 
		 *    start
		 *        +---------+
		 *        |         |
		 *        |    A +---------+
		 *        |      |         |
		 *        +------|    B    |
		 *               |         |
		 *               +---------+
		 */

		if (
			element.x + element.width - 1 >= square.x && element.x <= square.x + square.width - 1
				&& 
			element.y + element.height - 1 >= square.y && element.y <= square.y + square.height - 1 
		)	return true;
		else return false;
	});
	if (squareOverlap) return true;
	else return false;
}

const getters = {
	IS_CONSTRUCTIBLE: (state) => (x, y) => {
		if ((x + state.selWidth - 1) > state.board.width)
			return false;
		else if ((y + state.selHeight - 1) > state.board.height)
			return false;
		else {
			if (isOverlaping(state.squares, { width: state.selWidth, height: state.selHeight, x, y }))
				return false;
			else return true;
		}
	}
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
	modules: {
		buildings
	}
})

