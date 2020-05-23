<template>
	<div class="exit-container">
		<img src="/images/oval-scribble.png" class="circles" alt="">
		<span>{{ $store.state.visitors.goneVisitors }}</span>
		<img src="/icons/visitor.png" class="visitor" alt="">
		<img src="/images/exit.png" class="exit" alt="">
	</div>
</template>

<script>
export default {
	name: 'gone'
}
</script>

<style lang="less">
.exit-container {
	position: absolute;
	width: 200px;
	height: 100px;
	rotate: 3deg;
	right: 64px;
	top: 41%;

	span {
		position: absolute;
		font-weight: bold;
		font-size: 1.5em;
		top: 35%;
		left: 48%;
	}

	.exit {
		position: absolute;
		width: 81px;
		top: -38px;
		rotate: 11deg;
		left: 43%;
	}

	.visitor {
		position: absolute;
		width: 66px;
		top: 22px;
		left: 21px;
		rotate: -12deg;
	}

	.circles {
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		opacity: 0.6;
	}
}
</style>
