import * as VueRouter from 'vue-router'
import Home from '../view/Home.vue'
import Stake from '../view/Stake.vue'
import Rewares from '../view/Rewares.vue'
import History from '../view/History.vue'
import Redeem from '../view/Redeem.vue'
import Withdraw from '../view/Withdraw.vue'
import Team from '../view/Team.vue'
const routes = [
    { path: '/', component: Home },
    { path: '/Stake', component: Stake },
    { path: '/Rewares', component: Rewares },
    { path: '/History', component: History },
    { path: '/Redeem', component: Redeem },
    { path: '/Withdraw', component: Withdraw },
    { path: '/Team', component: Team },
  ]
  const router = VueRouter.createRouter({
      // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
      history: VueRouter.createWebHashHistory(),
      routes, // `routes: routes` 的缩写
  })
export {
    router
}