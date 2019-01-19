import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuccess from '@/views/OrderSuccess'
import {ROUTER_PREFIX} from '@/config';

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: ROUTER_PREFIX + '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: ROUTER_PREFIX + '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: ROUTER_PREFIX + '/address',
      name: 'Address',
      component: Address,
    },
    {
      path: ROUTER_PREFIX + '/orderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: ROUTER_PREFIX + '/orderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    },    
  ]
})