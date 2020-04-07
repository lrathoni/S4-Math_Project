import Vue from 'vue';
import Vuex from 'vuex';
import buildings from './modules/buildings';
import player from './modules/player';
//import network from './modules/network';
//import neuron from './modules/neuron';

Vue.use(Vuex);

const state = {
	board: {
		width: 12,
		height: 8
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
			y: Number,
			building: {}
		}*/
	]
}

const mutations = {
	addSquare(state, payload) {
		const { width, height, x, y, building } = payload;
		state.squares.push({
			id: state.selIndex,
			width,
			height,
			x,
			y,
			building
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
	addSquareSel(context, payload) {
		//debugger
		let { x, y } = payload;
		//name = name ? name : context.state.selName + toString(context.state.selIndex);
		const building = context.getters['buildings/SELECTED'];
		context.commit('addSquare', { width: context.state.selWidth, height: context.state.selHeight, x, y, building });
		context.commit('incrementIndex');
	}
}

function isOverlaping(squares, element) {
	const squareOverlap = squares.some(square => {

		/* INFO start of A must be located before end of B and end of A after start of B 
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
			element.x + element.dimensions.width - 1 >= square.x && element.x <= square.x + square.width - 1
				&& 
			element.y + element.dimensions.height - 1 >= square.y && element.y <= square.y + square.height - 1 
		)	return true;
		else return false;
	});
	if (squareOverlap) return true;
	else return false;
}

const getters = {
	IS_CONSTRUCTIBLE(state, getters) {
		const dimensions = getters['buildings/DIMENSIONS'];
		return (x, y) => {
			if ((x + dimensions.width - 1) > state.board.width)
				return false;
			else if ((y + dimensions.height - 1) > state.board.height)
				return false;
			else {
				if (isOverlaping(state.squares, { dimensions, x, y }))
					return false;
				else return true;
			}
		} 
	}
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
	modules: {
		buildings,
		player
	}
})

