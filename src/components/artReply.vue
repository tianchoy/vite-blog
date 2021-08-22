<template>
    <div>
        <el-table :data="artCom" border style="width: 100%">
            <el-table-column label="日期">
                <template v-slot="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="标题" width="200"> 
                <template v-slot="scope">
                    <span style="margin-left: 10px" v-html="scope.row.title"></span>
                </template>
            </el-table-column>
            <el-table-column label="评论人"> 
                <template v-slot="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="评论内容"> 
                <template v-slot="scope">
                    <span style="margin-left: 10px">{{ scope.row.pl_content }}</span>
                </template>
            </el-table-column>
            <el-table-column label="回复内容"> 
                <template v-slot="scope">
                    <span style="margin-left: 10px" v-html="scope.row.repl_content"></span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                <el-button @click="replyArtClick(scope.row.r_id)" type="text" size="small">
                    <a type="text" @click="dialogVisible = true">回复</a>
                </el-button>
                </template>
            </el-table-column>
        </el-table>
        <ReplyBox :dialogflag="artReplyLogvisible"  @passData = "passData" @closedia = "arClosedia" />
    </div>
</template>

<script>
    import { reactive, toRefs,ref } from 'vue'
    import {artReply} from '../api/admin/Index'
    import ReplyBox from '../components/reply.vue'
    import qs from 'qs'
    import { Message } from 'element3' 
    export default {
        props:{
            artCom:Array,
        },
        components:{
           ReplyBox
        },
        setup(props,{emit}){
            let dialogVisible = ref(false)

            const state = reactive({
                artReplyLogvisible:false,
                id:''
            })
            const replyArtClick=(val)=>{
                state.artReplyLogvisible = true
                state.id= val
            }

            const passData=(val)=>{
                const postData = qs.stringify({
                    id:state.id,
                    content:val
                })
                artReply(postData).then(res=>{
                    tips(res)
                })
            }

            const arClosedia=()=>{  //控制发布框隐藏
                state.artReplyLogvisible = false
           }

            const tips = (res)=>{
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

            return{
                passData,
                replyArtClick,
                dialogVisible,
                arClosedia,
                ...toRefs(state)
            }
        }
    }
</script>

<style scoped>

</style>