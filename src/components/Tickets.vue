<template>
	<div class="ticket-container">
		  <div class="next-wave">
			  <div class="visitor" v-for="(visitor, id) in $store.state.visitors.nextWaveVisitors" :key="id"></div>
		  </div>
		  <img src="/images/tickets.png" class="tickets" alt="">
	</div>
</template>

<script>
export default {
	name: 'Tickets'
}
</script>

<style lang="less">
.ticket-container {
	position: absolute;
	left: 10px;
	width: 220px;
	height: 100px;
	top: 60px;
	rotate: -10deg;

	.next-wave {
		padding: 30px;

		.visitor {
			display: inline-block;
			width: 20px;
			height: 20px;
			background-image: url(/icons/visitor.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;
		}
	}

	.tickets {
		position: absolute;
		width: 190px;
		left: 40%;
		top: 73%;
		transform: translate(-50%, -50%);
		opacity: 0.5;
		rotate: 13deg;
	}
}
</style>
