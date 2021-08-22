import { createApp } from 'vue'
import App from './App.vue'
import './assets/Css/index.css'
import router from './router/index'
import vuex from './store/index'
import 'element3/lib/theme-chalk/index.css'
import Element3 from 'element3'
import { quillEditor, Quill } from 'vue3-quill'


router.beforeEach((to,from,next)=>{
    if(to.meta.isLogin){
        if(window.sessionStorage.data){
            next()
        }else{
            next('/admin/login')
        }
    }else{
        next()
    }
})


const app = createApp(App)
app.use(router)
app.use(vuex)
app.use(Element3)
app.use(quillEditor)
app.mount('#app')
