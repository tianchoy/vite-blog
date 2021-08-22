<template>
    <div>
    <el-table :data="guestBookData" border style="width: 100%">
        <el-table-column label="日期">
            <template v-slot="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.time }}</span>
            </template>
        </el-table-column>
        <el-table-column label="留言者"> 
            <template v-slot="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
        </el-table-column>
        <el-table-column label="留言内容"> 
            <template v-slot="scope">
                <span style="margin-left: 10px" v-html="scope.row.content "></span>
            </template>
        </el-table-column>
        <el-table-column label="回复内容"> 
            <template v-slot="scope">
                <span style="margin-left: 10px" v-html="scope.row.huifu_content"></span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template v-slot="scope">
            <el-button @click="showGbReplyEditor(scope.row.id)" type="text" size="small">
                <a type="text" @click="dialogVisible = true">回复</a>
            </el-button>
            <el-button @click="delgbClick(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <ReplyBox :dialogflag="gbLogvisible"  @passData = "passData" @closedia = "gbClosedia" />
    </div>
</template>

<script lang="ts">
    import { reactive, toRefs,ref } from 'vue'
    import {replyGuestBook} from '../api/admin/Index'
    import ReplyBox from '../components/reply.vue'
    import qs from 'qs'
    import { Message } from 'element3' 
    export default {
        props:{
            guestBookData:Array,
        },
        components:{
           ReplyBox
        },
        setup(props:any,{emit}:any){
            let dialogVisible = ref(false)
            const state = reactive({
                gbLogvisible:false,
                id:''
            })
            const delgbClick=(val:any)=>{
                emit('delgbClick',val)
            }

            const passData=(val:any)=>{
                let postData = qs.stringify({
                    id:state.id,
                    content:val
                })
                replyGuestBook(postData).then(res=>{
                    console.log(res)
                    tips(res)
                })

            }

            const tips = (res:any)=>{
                const msgcode = res.data.code
                const msg = res.data.message
                if(msgcode == 202){
                    Message({
                        message: msg,
                        type: 'error'
                    });
                }
                else if(msgcode == 201){
                    Message({
                        message: msg,
                        type: 'warning'
                    });
                    
                }else{
                    Message({
                        message: msg,
                        type: 'success',
                    });
                }
            }

            const showGbReplyEditor=(val:any)=>{
                state.id = val
                state.gbLogvisible = true
            }

            const gbClosedia=()=>{  //控制发布框隐藏
                state.gbLogvisible = false
           }

            return{
                dialogVisible,
                passData,
                delgbClick,
                showGbReplyEditor,
                gbClosedia,
                ...toRefs(state)
            }
        }
    }
</script>

<style scoped>

</style>