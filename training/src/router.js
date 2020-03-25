import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Users from './views/Users.vue';
import UsersPost from './views/UsersPost.vue';
import UsersProfile from './views/UsersProfile.vue';

Vue.use(Router)

const routes = [
    {path: '/', component: Home},
    {path: '/users/:id', component: Users, props: true,
     children: [
         {path: 'post', component: UsersPost},
         {path: 'profile', component: UsersProfile}
     ]
    },
    {path: '/users', redirect: '/users/1'},
    {path: '/*', component: Home}
]

const router = new Router({
    mode: 'history',
    routes // routes:routesは省略可能 ES6の記法
})

router.beforeEach((to, from, next) => {
    if(Number(to.params.id) < 1){
        next('/users/1')
    }
    next()
})

export default router;