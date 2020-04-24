<template>
	<div class="ticket-container">
		<img src="/images/tickets.png" class="tickets" alt="">
		<div class="visitor-count">
		  <img src="/icons/visitor.png" class="visitor-icon" alt="">
			<span>{{ $store.state.visitors.thisWave }} new visitors</span>
		</div>
		  <div class="next-wave">
			  <div class="visitor" v-for="(visitor, id) in $store.state.visitors.nextWaveVisitors" :key="id"></div>
		  </div>
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

	.visitor-count {
		display: grid;
		grid-template-columns: 1fr 4fr;

		img {
			width: 55px;
		}
		span {
			font-size: 23px;
			font-weight: bold;
			color: #c40000;
			align-self: center;
		}
	}

	.next-wave {
		padding: 5px 30px;

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
