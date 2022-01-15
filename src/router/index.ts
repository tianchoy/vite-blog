import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Index.vue'
import Detail from '../views/Detail.vue'
import Talk from '../views/Talk.vue'
import GuestBook from '../views/GuestBook.vue'
import Archive from '../views/Archive.vue'
import About from '../views/About.vue'
import Login from '../views/Admin/Login.vue'
import Admin from '../views/Admin/Admin.vue'
import NotFound from '../components/NotFound.vue'


const routers = [
    {
        path:'/',
        name:'Home',
        component:Home
    },
    {
        path:'/detail/:id',
        name:'Detail',
        component:Detail
    },
    {
        path:'/talk',
        name:'Talk',
        component:Talk
    },
    {
        path:'/guestbook',
        name:'GuestBook',
        component:GuestBook
    },
    {
        path:'/archive',
        name:'Archive',
        component:Archive
    },
    {
        path:'/about',
        name:'About',
        component:About
    },
    //用户中心 登录页面
    {
        path:'/Admin/Login',
        name:'Login',
        component:Login
    },
    {
        path:'/Admin/admin',
        name:'admin',
        meta:{
            isLogin:true,
        },
        component:Admin
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: NotFound
    },
    {
        path:'/404',
        name: '404',
        component: NotFound
    }
]

export default createRouter({
    history:createWebHashHistory(),
    routes:routers
})
