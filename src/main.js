import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

//import 'primevue/resources/themes/nova-vue/theme.css';
import 'primevue/resources/themes/nova-accent/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

Vue.config.productionTip = false
Vue.component('DataTable',DataTable);
Vue.component('ColumnA',Column);
Vue.component('PanelA',Panel);
Vue.component('MenubarA',Menubar);
Vue.component('DialogA',Dialog);
Vue.component('ButtonA',Button);
Vue.component('InputTextA',InputText);
Vue.component('CalendarA',Calendar);
Vue.component('DropdownA',Dropdown);
Vue.use(ToastService);
Vue.component('ToastA',Toast);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
