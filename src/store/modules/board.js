const state = {
	width: 12,
	height: 8,
	currentID: 0,
	squares: [
		/* NOTE: SCHEMA
		 {
			id: Number,
			x: Number,
			y: Number,
			building: {}
		}*/
	],
	rain: false
}

const mutations = {
	addSquare(state, payload) {
		const { x, y, building } = payload;
		state.squares.push({
			id: state.currentID,
			x,
			y,
			building
		})
	},

	/* TODO check if having an ID is still necessary */
	incrementIndex(state) {
		state.currentID++;
	},
}

const actions = {
	addSquareSel(context, payload) {
		let { x, y } = payload;

		const building = context.rootState.player.selected;

		context.commit('addSquare', { x, y, building });

		/* INFO update the internal index system */
		context.commit('incrementIndex');
	}
}

function isOverlaping(squares, element) {
	/* INFO boolean */
	const squareOverlap = squares.some(square => {

		/* INFO start of A must be located before end of B and end of A after start of B 
		 *    start
		 *
		 *        +---------+
		 *        |         |
		 *        |    A +---------+
		 *        |      |         |
		 *        +------|    B    |
		 *               |         |
		 *               +---------+
		 */
		if (
			element.x + element.width - 1 >= square.x &&
			element.x <= square.x + square.building.width - 1 && 
			element.y + element.height - 1 >= square.y &&
			element.y <= square.y + square.building.height - 1
		) return true;
		else return false;
	});

	/* INFO do the check */
	if (squareOverlap)
		return true;
	else
		return false;
}

const getters = {
	/**
	 * Verifies that for a pair of x and y coordinate, the user can place a building at this position
	 * The size of the building is determined by the currently selected building
	 * @param x coordinate in board space
	 * @param y coordinate in board space
	 */
	IS_CONSTRUCTIBLE(state) {
		//const dimensions = getters['buildings/DIMENSIONS'];
		return (x, y, width, height) => {
			if ((x + width - 1) > state.width)
				return false;
			else if ((y + height - 1) > state.height)
				return false;
			else {
				if (isOverlaping(state.squares, { width, height, x, y }))
					return false;
				else return true;
			}
		} 
	}
}

export default {
	namespaced: true,
	state,
	mutations, 
	getters,
	actions
}
