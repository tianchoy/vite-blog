<template>
    <el-header style="padding:0"><Header/></el-header>
    <div class="archive_box">
        <el-table
            :data="tableData"
            style="width: 100%;margin-bottom:20px"
            >
            <el-table-column label="日期" prop="time"> </el-table-column>
            <el-table-column label="标题" prop="title"> </el-table-column>
            <el-table-column align="right">
                <template v-slot="scope">
                <el-button size="mini" type="primary" @click="handleView(scope.row)"
                    >查看详情</el-button
                >
                </template>
            </el-table-column>
        </el-table>
        <pagination @pageNo="handleCurrentChange" :total="total"></pagination>
    </div>
</template>

<script lang="ts">
import {onMounted, reactive, toRefs,ref } from 'vue'
import {getArchiveData} from '../api/index'
import router from '../router/index'
import Header from '../components/Header.vue'
import pagination from '../components/Pagination.vue'

export default({
    components:{
        Header,
        pagination
    },
    setup () {
        const pageNo = ref()
        const state = reactive({
            tableData: [],
            search:'',
            pageSize:1,
            total:0
        })

        const getArchiveList = ()=>{
            getArchiveData(state.pageSize).then(res=>{
                state.tableData = res.data.data,
                state.total = parseInt(res.data.total)
            })
        }

        // 点击页数触发事件
        const handleCurrentChange = (page:any) => {
            getArchiveData(page).then(res=>{
                state.total = parseInt(res.data.total)
                state.tableData = res.data.data
            })
        }

        //查看详情按钮点击事件
        const handleView = (row:any)=> {
            const id = JSON.parse(JSON.stringify(row)).id
            const { href } = router.resolve({
                    path: '/detail/'+id,
            });
            window.open(href, "_blank");

        }

        onMounted(()=>{
            getArchiveList(),
                document.title = '归档-田超的博客'
        })
        
        return {
            pageNo,
            handleView,
            handleCurrentChange,
            ...toRefs(state)
        }
    }
})
</script>

<style scoped>
.el-pagination{margin-top: 2em;}
</style>