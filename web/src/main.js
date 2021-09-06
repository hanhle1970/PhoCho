import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import './assets/styles.css'

import store from './services/Store'
import AxiosEx from './services/AxiosEx'
import Authen from './services/Authen'
import Utilities from './services/Utils'
import DashBoard from './pages/DashBoard.vue'
import GroupsPage from './pages/GroupsPage.vue'
import CategoriesPage from './pages/CategoriesPage.vue'
import UsersPage from './pages/UsersPage.vue'
import WaitingListPage from './pages/WaitingListPage.vue'
import ApprovedListPage from './pages/ApprovedListPage.vue'
import PreviewItemDlg from './pages/PreviewItemDlg.vue'

Vue.use(VueRouter);
Vue.use(require('vue-moment'));
Vue.config.productionTip = false;

Vue.prototype.$authen = Authen;
Vue.prototype.$http = new AxiosEx(Authen);
Vue.prototype.$util = Utilities;

const routes = [
  { path: "/", component: DashBoard },
  { path: "/system/groups", component: GroupsPage },
  { path: "/system/categories", component: CategoriesPage },
  { path: "/system/users", component: UsersPage },
  { path: "/waitinglist", component: WaitingListPage },
  { path: "/approvedlist", component: ApprovedListPage },
  { path: "/previewitem", component: PreviewItemDlg },
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')

