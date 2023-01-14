<template>
    <header class="header-box">
        <div class="title">
            <h1>田超</h1>
        </div>
        <i class="el-icon-menu" style="font-size:2rem;margin-right: 2rem;"  @click="drawer = true,open()" type="primary"></i>
    </header>
    <el-drawer v-model:visible="drawer" :with-header="false">
        <ul class="nav_box" style="padding-left:0">
            <li  v-for="item in navList" :key="item.id">
                <router-link :to="{path:item.url}">{{item.name}}</router-link>
            </li>
        </ul>
        <div class="hitokoto_box">
            <b class="hitokoto_title">每日一言</b>
            <p class="hitokoto_content">{{hitokoto}}</p>
        </div>
        <div class="copyright">
            <p>©2023 All Rights Reserved. V{{version}}</p>
            <p>沪ICP备19014130号-1</p>
        </div>
    </el-drawer>
    
</template>

<script lang="ts">
    import { onMounted, reactive, ref, toRefs } from 'vue'
    import {getHitokoto} from '../api/index'
    import config from '../../package.json'
    export default {
        setup() {
            let drawer = ref(false)
            const state = reactive({
                navList:{
                    index:{'id':1,'name':'首页','url':'/'},
                    talk:{'id':2,'name':'说说','url':'/talk'},
                    guestbook:{'id':3,'name':'留言板','url':'/guestbook'},
                    archive:{'id':4,'name':'归档','url':'/archive'},
                    about:{'id':5,'name':'关于我','url':'/about'}
                },
               hitokoto:'' ,
               version:''
            })

            state.version = config.version

            //获取一言
            const getHitokotoData=()=>{
                getHitokoto().then(res=>{
                    state.hitokoto = res.data.hitokoto
                })
            }

            const open=()=>{
                getHitokotoData()
            }

            onMounted(()=>{
                getHitokotoData()
            })
            return {
                drawer,
                open,
                ...toRefs(state)
            }
        }
    }
</script>

<style lang="scss" scope>
@media screen and (max-width:1024px) {
    .header-box{
        width: 100%;
    }
}
@media screen and (min-width:1025px) {
    .header-box{
        width: 960px;
        margin: auto;
    }
}
.header-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position:fixed;
    top:0;
    z-index: 2;
    background-color: #fff;
    .title {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        .time {
            display: flex;
            flex-direction: column;
            padding: 0 1rem;
            border-right: .2rem solid #eee;
            span {
                display:block;
                text-align: center;
                font-size: 1.5rem;
                &:nth-child(1) {
                    font-size: 2rem;
                    font-weight: bold;
                }
            }
        }
    }
} 
    .nav_box{border-bottom: 1px solid rgb(233, 230, 230);}
    .nav_box li {list-style-type:none;padding: 1em 0;}
    .nav_box li a{text-decoration: none;color:rgb(64, 158, 255)}
    .hitokoto_box{padding: 0 0 .5em ;border-bottom: 1px solid rgb(233, 230, 230);}
    .hitokoto_content{padding: 0 .5em;text-align: left;}
    .copyright{margin-top: 10rem;font-size: .5rem;}
</style>