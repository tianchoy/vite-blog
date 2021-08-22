<template>
    <div class="content">
        <el-dialog
            width="70%"
            v-model:visible="dialogflag"   
            :close-on-click-modal="false"
            :before-close="logdialogclose"  关闭前的回调
            :destroy-on-close="true"
            >
            <template v-slot:default>
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
                <el-button @click="logdialogclose()">取 消</el-button>
                <el-button type="primary" @click="submit(),logdialogclose()">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import { reactive, toRefs } from 'vue'
    import { quillEditor } from 'vue3-quill'
    export default {
        props:{
            dialogflag: Boolean,
        },
        components: {
            quillEditor
        },
        setup(props:any,{emit}:any){
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
                
            })

            const submit=()=>{
                emit('passData',state.content)
            }

           const logdialogclose=() =>{
                emit('closedia')
            }

            return {
                submit,
                logdialogclose,
                ...toRefs(state)
            }
        }
    }
</script>

<style lang="scss" scoped>
.ql-snow{text-align: left;}
.title{margin-bottom: 10px;}
</style>