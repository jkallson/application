/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import router from '../router'
import { createPinia } from 'pinia';

// Types
import type { App } from 'vue'
import { Notifications } from '@kyvg/vue3-notification';

export function registerPlugins (app: App) {
    app
        .use(vuetify)
        .use(router)
        .use(Notifications)
        .use(createPinia())
}
