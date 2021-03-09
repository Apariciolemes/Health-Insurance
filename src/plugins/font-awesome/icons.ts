import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserNinja } from '@fortawesome/free-solid-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faFileMedical } from '@fortawesome/free-solid-svg-icons';


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


library.add(faUserNinja);
library.add(faLink);
library.add(faFileMedical);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;