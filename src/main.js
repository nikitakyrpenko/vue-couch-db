import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'

import auth from './auth'
import db from './db'

import Register from './components/Register.vue'
import SignIn from './components/SignIn.vue'
import Student from './components/student/Student.vue'
import Teacher from './components/teacher/Teacher.vue'
import Admin from './components/admin/Admin.vue'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(db);


function requireAuth (to, from, next) {
    if (!auth.loggedIn()) {
        next({
            path: '/',
        })
    } else {
        next()
    }
}

const router = new VueRouter({
    routes: [
        { path: '/student',  component: Student, beforeEnter: requireAuth },
        { path: '/admin',  component: Admin, beforeEnter: requireAuth },
        { path: '/register', component: Register },
        { path: '/teacher', component: Teacher, beforeEnter: requireAuth },
        { path: '/', component: SignIn },
        { path: '/logout', beforeEnter (to, from, next) {
            auth.logout();
            next('/');
        }}
    ]
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
