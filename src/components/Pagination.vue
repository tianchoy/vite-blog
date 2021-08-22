<template>
    <div>
        <el-pagination
            background
            layout="prev, pager, next" 
            :total="total" 
            :page-size="10"
            @current-change="handleCurrentChange"
            :hide-on-single-page="total>10?false:true"
            ref="pageNo"
            > 
        </el-pagination>
    </div>
</template>

<script lang="ts">
    import {ref} from 'vue'
    export default {
        props:{
            total:{
                type:Number,
                default:0
            }
        },
        setup(props:any,{emit}:any) {
            const pageNo = ref(null)
            const handleCurrentChange=(page:any)=>{
                emit('pageNo',page)
                
            }

            return{
                pageNo,
                handleCurrentChange
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>