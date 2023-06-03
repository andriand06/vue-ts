import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized
} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      //only trigerred if coming from different route
      //changing query, param or hash will not trigger
      beforeEnter: [removeQueryParams, removeHash]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/user',
      name: 'user',
      // meta: { requiresAuth: true },
      component: () => import('../views/UserView.vue')
    }
  ]
})

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void => {
    if (to.meta.requiresAuth) next({ name: 'home' })
    else next()
  }
)

function removeQueryParams(to: RouteLocationNormalized): any {
  //todo: need to set the appropriate return type (not any)
  if (Object.keys(to.query).length) return { path: to.path, query: '' }
}
function removeHash(to: RouteLocationNormalized): any {
  if (to.hash) return { path: to.path, query: to.query, hash: '' }
}

export default router
export {}
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}
