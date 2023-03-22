import 'bootstrap/dist/css/bootstrap.css'
import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'
import DashBoard from "./components/DashBoard.vue";
import LoginPage from "./components/LoginPage.vue";
import RegistrationPage from "./components/RegistrationPage.vue";
import ConfirmRegistration from "./components/ConfirmRegistration.vue";
import { setAuthHeader } from "./setAuthHeader.js"
import { createPinia } from 'pinia'
import { useListStore } from "../src/stores/listStore";



//vue router initialised.
const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/dashboard',
        name: 'DashBoard',
        component: DashBoard,
        meta: { auth: true }
    },
    {
        path: "/",
        name: "Login",
        component: LoginPage,
        meta: { auth: false }
    }, {
        path: "/register",
        name: "Registration",
        component: RegistrationPage,
        meta: { auth: false }
    }, {
        path: "/confirmed",
        name: "ConfirmRegistration",
        component: ConfirmRegistration,
        meta: { auth: false }
    }]
})

//Navigation guard
router.beforeEach((to, from, next) => {
    if (to.meta.auth && !ListData.isAuthenticated) {
        next('/')
    } else if (!to.meta.auth && ListData.isAuthenticated) {
        next('/dashboard')
    } else {
        next()
    }
})

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')



const ListData = useListStore();
if (ListData.isAuthenticated) {
    setAuthHeader(localStorage.token);
} else {
    setAuthHeader();
}
// import "bootstrap/dist/js/bootstrap.js"