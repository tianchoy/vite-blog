<template>
    <el-header style="padding:0"><Header/></el-header>
    <div class="block">
        <el-timeline>
            <el-timeline-item 
            v-for="(activity, index) in talkList"
            :key="index"
            class="is-top"
            :timestamp="activity.time" 
            placement="top"
            >
            <el-card>
                <p v-html="activity.content"></p>
            </el-card>
            </el-timeline-item>
            <pagination @pageNo="handleCurrentChange" :total="total"></pagination>
        </el-timeline>
        <p v-if="total<0?true:false">暂无数据</p>
    </div>
</template>

<script lang="ts">
import {reactive, toRefs,onMounted,ref} from 'vue'
import { getTalkData } from '../api/Talk'
import Header from '../components/Header.vue'
import pagination from '../components/Pagination.vue'

export default {
    components:{
        Header,
        pagination
    },
    setup () {
        const pageNo = ref()
        const state = reactive({
            pageSize:1,
            talkList:[],
            total:0,
        })
        //获取默认数据
        const getTalkList = ()=>{
            getTalkData(state.pageSize).then(res=>{
                state.total = parseInt(res.data.total)
                state.talkList = res.data.data
            })
        }

        // 点击页数触发事件
        const handleCurrentChange = (page:any) => {
            getTalkData(page).then(res=>{
                state.total = parseInt(res.data.total)
                state.talkList = res.data.data
            })
        }
        
        onMounted(()=>{
            getTalkList(),
            document.title = '说说-田超的博客'
        })

        return {
            pageNo,
            handleCurrentChange,
            ...toRefs(state)
        }
    }
}
</script>

<style lang="scss" scoped>
    .is-top{text-align: left;}
    .el-card__body p{margin:0;padding: 0 !important;}
</style>