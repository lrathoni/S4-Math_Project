<template>
	<div class="money-container">
		<img src="/images/money.png" alt="">
		<span>{{ $store.state.player.money }}$</span>
	</div>
</template>

<script>
export default {
	name: 'gone'
}
</script>

<style lang="less">
.money-container {
	position: absolute;
	width: 200px;
	height: 100px;
	rotate: 3deg;
	right: 64px;
	top: 20px;

	span {
		position: absolute;
		font-weight: bold;
		font-size: 1.5em;
		top: 35%;
		right: 54%;
	}


	img {
		position: absolute;
		width: 50%;
		top: 0;
		right: 0px;
		opacity: 0.7;
	}
}
</style>
