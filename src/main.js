import { createApp } from 'vue'
import AppOopartsCal from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fab, far, fas)

import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(AppOopartsCal)
  .use(Quasar, quasarUserOptions)
  .use(VueAxios, axios)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')