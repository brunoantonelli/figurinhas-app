import { createRouter, createWebHistory } from 'vue-router';
import CreateClient from '../views/CreateClient.vue';
import Login from '../views/Login.vue';
import ConfirmAccount from '../views/ConfirmAccount.vue';
import SucessAccount from '../views/SucessAccount.vue';
import CriticalError from '../views/CriticalError.vue';
import EmailActiveAccount from '../views/EmailActiveAccount.vue';
import LoginProblem from '../views/LoginProblem.vue';
import EmailChangePassword from '../views/EmailChangePassword.vue';
import ChangePassword from '../views/ChangePassword.vue';
import SucessChangePassword from '../views/SucessChangePassword.vue';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        redirect: '/create-account'
    },
    {
        path: '/create-account',
        name: 'create-account',
        component: CreateClient
    },
    {
        path: '/login-user',
        name: 'login',
        component: Login,
    },
    {
        path: '/confirm-account',
        name: 'confirm-account',
        component: ConfirmAccount,
    },
    {
        path: '/sucess-account',
        name: 'sucess-account',
        component: SucessAccount,
    },
    {
        path: '/critical-error',
        name: 'critical-error',
        component: CriticalError,
    },
    {
        path: '/email-active-account',
        name: 'email-active-account',
        component: EmailActiveAccount,
    },
    {
        path: '/login-problem',
        name: 'login-problem',
        component: LoginProblem,
    },
    {
        path: '/email-change-password',
        name: 'email-change-password',
        component: EmailChangePassword,
    },
    {
        path: '/change-password',
        name: 'change-password',
        component: ChangePassword,
    },
    {
        path: '/sucess-change-password',
        name: 'sucess-change-password',
        component: SucessChangePassword,
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
