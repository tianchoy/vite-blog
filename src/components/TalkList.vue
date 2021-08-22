<template>
    <el-table :data="talkData" border style="width: 100%">
        <el-table-column label="日期">
            <template v-slot="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.time }}</span>
            </template>
        </el-table-column>
        <el-table-column label="说说内容" width="250"> 
            <template v-slot="scope">
                <span style="margin-left: 10px" v-html="scope.row.content"></span>
            </template>
        </el-table-column>
        <el-table-column label="点赞"> 
            <template v-slot="scope">
                <i class="el-icon-star-on"></i>
                <span style="margin-left: 10px">{{ scope.row.zan }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template v-slot="scope">
            <el-button @click="delTalkClick(scope.row.id)" type="text" size="small"
                >删除</el-button
            >
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts">
    export default {
        props:{
            talkData:Array
        },
        setup(props:any,{emit}:any){
            const delTalkClick=(val:any)=>{
                emit('delTalkClick',val)
            }


            return{
                delTalkClick
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>