import Vue from 'vue'
import Router from 'vue-router'
import Table from './screens/DataTable'
import Data from './screens/DataInfo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'table',
      component: Table
    },
    {
      path: '/data/:id',
      name: 'data',
      component: Data,
      props: true,
    }
  ]
})
