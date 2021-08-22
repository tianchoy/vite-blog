<template>
    <div>
        <el-table :data="artData" border style="width: 100%">
            <el-table-column label="日期">
                <template v-slot="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="标题" width="250"> 
                <template v-slot="scope">
                    <i class="el-icon-document"></i>
                    <span style="margin-left: 10px">{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column label="访问量"> 
                <template v-slot="scope">
                    <i class="el-icon-view"></i>
                    <span style="margin-left: 10px">{{ scope.row.hits }}</span>
                </template>
            </el-table-column>
            <el-table-column label="点赞"> 
                <template v-slot="scope">
                    <i class="el-icon-star-on"></i>
                    <span style="margin-left: 10px">{{ scope.row.art_love }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button @click="viewArtClick(scope.row.id)" type="text" size="small">查看</el-button>
                    <el-button @click="editArtClick(scope.row.id)" type="text" size="small">
                        <a type="text" @click="dialogVisible = true">编辑</a>
                    </el-button>
                    <el-button  @click="delArtClick(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
        title="提示"
        width="70%"
        v-model:visible="dialogVisible"
        >
        <template v-slot:default>
            <div class="title">
                <el-input v-model="title" placeholder="请输入标题"></el-input>
            </div>
            <div class="cotnent">
                <quill-editor
                v-model:value="content"
                :options="editorOption"
                style="height:300px;"
                />
            </div>
        </template>
        <template v-slot:footer>
            <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEditArtFun(id),dialogVisible = false">确 定</el-button>
            </span>
        </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import { ref,reactive,toRefs } from 'vue'
    import { quillEditor } from 'vue3-quill'
    import　{editArt,saveEditArt} from '../api/admin/Index'
    import qs from 'qs'
    import { Message } from 'element3' 
    export default {
        props:{
            artData:Array
        },
        components: {
            quillEditor
        },
        setup(props:any,{emit}:any){

            let dialogVisible = ref(false)
            const state = reactive({
                editorOption: {
                    placeholder: '输入文章内容',
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            ['link', 'image', 'video']
                        ],
                    },
                },
                content:'',
                title:'',
                id:''
            })

            const viewArtClick=(val:any)=>{
                emit('viewArtClick',val)
            }

            const delArtClick=(val:any)=>{
                emit('delArtClick',val)
            }

            const editArtClick=(val:any)=>{
                state.id = val
                editArt(val).then(res=>{
                    state.title = res.data.data.title
                    state.content = res.data.data.content
                })
            }
            
            const saveEditArtFun=(id:any)=>{
                let postData = qs.stringify({
                    id:state.id,
                    title:state.title,
                    content:state.content
                })
                saveEditArt(postData).then(res=>{
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


            return{
                dialogVisible,
                viewArtClick,
                delArtClick,
                editArtClick,
                saveEditArtFun,
                ...toRefs(state)
            }
        }
    }
</script>

<style lang="scss" scoped>
.ql-snow{text-align: left;}
.title{margin-bottom: 10px;}
</style>