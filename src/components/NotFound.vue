<template>
    <div>
        <h2>404 NotFound!</h2>
        <div>
            <p style="font-size:1.4rem;color:#409eff;font-weight: 400;margin:2rem auto 3rem;text-align:center">{{hitokoto}}</p>
            <p style="overflow:hidden">
                <el-button style="float:left" type="text" @click="nextone">下一句</el-button>
                <el-button style="float:right" type="text" @click="toIndex">去首页>></el-button>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
    import { onMounted, reactive, toRefs } from 'vue'
    import {getHitokoto} from '../api/index'
    import router from '../router/index'
    export default {
        setup(){
            const state = reactive({
                hitokoto:'' ,
            })
            //获取一言
            const getHitokotoData=()=>{
                getHitokoto().then(res=>{
                    console.log(res)
                    state.hitokoto = res.data.hitokoto
                })
            }

            const nextone=()=>{
                getHitokotoData()
            }

            onMounted(()=>{
                getHitokotoData()
            })

            const toIndex=()=>{
                router.push('/')
            }


            return {
                nextone,
                toIndex,
                ...toRefs(state)
            }

        }
    }
</script>

<style scoped>

</style>