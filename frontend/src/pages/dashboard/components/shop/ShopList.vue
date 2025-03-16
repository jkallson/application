<template>
    <v-list
        density="compact"
        class="py-0"
    >
        <v-list-item
            v-for="item in items"
            :key="item.id"
            :value="item.id"
            class="py-3"
        >
            <v-list-item-title>{{ item.title }}</v-list-item-title>

            <v-list-item-subtitle class="mb-1 text-high-emphasis opacity-100">
                120 coins
            </v-list-item-subtitle>

            <template v-slot:append>
                <v-list-item-action class="flex-column align-end">
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        size="small"
                    >
                        Buy
                    </v-btn>
                </v-list-item-action>
            </template>
        </v-list-item>
    </v-list>
</template>

<script setup>
import { shallowRef } from 'vue'

const items = [
    { id: 1, action: '15 min', headline: 'Brunch this weekend?', subtitle: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?', title: 'Ali Connors' },
    { id: 2, action: '2 hr', headline: 'Summer BBQ', subtitle: 'Wish I could come, but I\'m out of town this weekend.', title: 'me, Scrott, Jennifer' },
    { id: 3, action: '6 hr', headline: 'Oui oui', subtitle: 'Do you have Paris recommendations? Have you ever been?', title: 'Sandra Adams' },
    { id: 4, action: '12 hr', headline: 'Birthday gift', subtitle: 'Have any ideas about what we should get Heidi for her birthday?', title: 'Trevor Hansen' },
    { id: 5, action: '18hr', headline: 'Recipe to try', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.', title: 'Britta Holt' },
]

const selected = shallowRef([2])
</script>

<style scoped>

</style>
