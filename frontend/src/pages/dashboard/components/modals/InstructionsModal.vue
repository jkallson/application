<template>
	<v-dialog
		:model-value="show"
		max-width="600"
		persistent
	>
		<v-card class="instructions-card">
			<v-card-title class="text-h5 text-center">
				🐉 How to Play Dragons of Mugloar
			</v-card-title>

			<v-card-text class="py-0">
				<v-divider class="my-3"></v-divider>
				<v-row dense>
					<v-col cols="12" class="mb-3">
						<v-icon color="primary" class="mr-2">mdi-trophy</v-icon>
						<strong>Objective:</strong>
						<p class="mt-1">
							Gain the highest score possible by solving tasks, upgrading your dragon, and managing your resources.
						</p>
					</v-col>
					<v-col cols="12" class="mb-3">
						<v-icon color="primary" class="mr-2">mdi-calendar-clock</v-icon>
						<strong>Game Flow:</strong>
						<ul class="ml-4 mt-1">
							<li>Solve tasks to earn <strong>gold</strong> and <strong>score</strong>.</li>
							<li>Purchase upgrades to improve success rates.</li>
							<li>The game ends if you run out of lives!</li>
						</ul>
					</v-col>
					<v-col cols="12" class="mb-3">
						<v-icon color="primary" class="mr-2">mdi-alert-circle</v-icon>
						<strong>Tips:</strong>
						<ul class="ml-4 mt-1">
							<li>Start with low-risk tasks. The tasks are color coded - green is the easiest, followed by blue, orange and red</li>
							<li>Save gold to purchase <strong>powerful upgrades</strong> later.</li>
							<li>Monitor your <strong>lives</strong> carefully — when you reach 1 life, consider using a <strong>Healing Potion</strong>.</li>
						</ul>
					</v-col>
				</v-row>

				<v-divider class="my-3"></v-divider>

				<div class="text-center">
					<v-btn
						color="primary"
						@click="closeModal"
					>
						Got it!
					</v-btn>
				</div>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
	show: {
		type: Boolean,
		required: true
	}
});

const emit = defineEmits(['close']);

const closeModal = () => {
	emit('close');
}
</script>

<style scoped>
.instructions-card {
	background: rgba(0, 0, 0);
	border-radius: 12px;
	border: 2px solid rgba(76, 175, 80, 0.6);
	padding: 20px;
}

ul {
	padding-left: 18px;
}

li {
	margin-bottom: 6px;
}
</style>
