<template>
    <div
        v-if="loading"
        class="loading-screen"
    >
        <v-progress-circular
            indeterminate
            :color="color"
            :size="size"
        ></v-progress-circular>
        <h3>{{ message }}</h3>
    </div>
</template>

<script setup lang="ts">
defineProps({
    loading: {
        type: Boolean,
        required: true
    },
    message: {
        type: String,
        default: 'Loading...'
    },
    color: {
        type: String,
        default: 'primary'
    },
    size: {
        type: [String, Number],
        default: 80
    }
});
</script>

<style scoped>
	.loading-screen {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		z-index: 999;
	}

	.loading-screen h3 {
		margin-top: 15px;
		font-weight: bold;
	}
</style>
