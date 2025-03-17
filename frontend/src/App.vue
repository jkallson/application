<template>
    <v-app>
        <v-main>
            <div class="app-background">
                <Notifications
                    position="bottom right"
                    classes="app-notification"
                ></Notifications>
                <router-view></router-view>
            </div>
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>

import { Notifications } from '@kyvg/vue3-notification';
</script>
<style lang="scss">
.container {
    width: 100%;
    max-width: 1054px;
    margin: 0 auto;
    padding-left: 15px;
    padding-right: 15px;
}

.app-background {
    position: relative;
    background: url('/bg.jpg') no-repeat center center fixed;
    background-size: cover;
    height: 100%;
    display: flex;
    overflow-x: hidden;
    flex-direction: column;
    justify-content: center;
}

.app-background::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
}

.v-main > * {
    position: relative;
    z-index: 1;
}

.app-notification {
    margin: 0 5px 5px;
    padding: 10px;
    font-size: 12px;
    color: #ffffff;

    &.info {
        background: #1d75bb;
        border-left: 5px solid #003465;
    }

    &.success {
        background: #1ca223;
        border-left-color: #02330e;
    }

    &.warn {
        background: #ffb648;
        border-left-color: #f48a06;
    }

    &.error {
        background: #b2281d;
        border-left-color: #500800;
    }
}
</style>
