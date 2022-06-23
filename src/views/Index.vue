<template>
    <div class="Home">
        <el-container>
            <el-header style="padding:0"><Header/></el-header>
            <el-main><NewsList :newsData="newsData" /></el-main>
            <el-footer ><Footer /></el-footer>
        </el-container>
    </div>
</template>

<script lang="ts">
    import Header from '../components/Header.vue'
    import NewsList from '../components/NewsList.vue'
    import Footer from '../components/Footer.vue'
    import {reactive,computed,toRefs,onMounted} from 'vue'
    import {getNewsList} from '../api/index'
    import utils from '../utils'
    export default {
        components:{
            Header,
            NewsList,
            Footer
        },
        setup(){

            const state = reactive({
                date: new Date,
                newsData:[]
            })
            let day = computed(()=>utils.formatTime(state.date)[2])
            let month = computed(()=>utils.formatTime(state.date)[1])

            
             //  获取新闻列表数据
             const getNewsData = async()=>{
                 const res = await getNewsList()
                 state.newsData = res.data.data
                
             }
             

            onMounted(()=>{
                getNewsData(),
                document.title = '首页-田超的博客'
            })

            return {
                ...toRefs(state),
                day,
                month
            }

        }
    }
</script>

<style lang="scss" scoped>
.Home{width: 100%;height: 100%;}
</style>