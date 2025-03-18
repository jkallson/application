<template>
    <div
        class="status-item"
        :class="customClass"
    >
        <v-icon
            :color="color"
            size="24"
        >
            {{ icon }}
        </v-icon>
        <span class="status-value">{{ value }}</span>
        <span class="status-label">{{ label }}</span>
    </div>
</template>
<script setup lang="ts">
defineProps({
    color: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    customClass: {
        type: String,
        required: false,
        default: ''
    },
})

</script>

<style scoped>
	.status-item {
		text-align: center;
	}

	.status-value {
		display: block;
		font-size: 1.8rem;
		font-weight: bold;
	}

	.status-label {
		display: block;
		opacity: 0.8;
	}

	.status-item.danger .status-value {
		color: #F44336;
		text-shadow: 0 0 12px rgba(255, 0, 0, 0.8);
	}
</style>
