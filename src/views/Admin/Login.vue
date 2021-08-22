<template>
    <el-card class="box-card">
        <template v-slot:header>
            <div class="clearfix">
                <span>管理员登录</span>
            </div>
        </template>
        <el-form
            :label-position="labelPosition"
            :model="formLabelAlign"
            >
            <el-form-item props="name" :rules="{required:true, message:'请输入账号', trigger:'change'}">
                <el-input v-model="formLabelAlign.name" placeholder="请输入账户名称"></el-input>
            </el-form-item>
            <el-form-item props="psw" :rules="{required:true, message:'请输入密码', trigger:'change'}">
                <el-input type="password" v-model="formLabelAlign.psw" placeholder="请输入账户密码"></el-input>
            </el-form-item>
            
            <el-form-item style="float:left;margin-left:0">
                <el-button type="primary" @click="onSubmit">立即登录</el-button>
            </el-form-item>
            <el-form-item style="float:right;margin-left:0">
                <el-button type="text" @click="toIndex">去首页>></el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script lang="ts">
    import { reactive, toRefs, ref, onMounted } from 'vue'
    import {postLogin} from '../../api/admin/Index'
    import vueImgVerify from '../../components/verify.vue'
    import qs from 'qs'
    import router from '../../router/index'
    import { Message } from 'element3' 
    export default {
        components:{
            vueImgVerify
        },
        setup() {
            const verifyRef = ref()
            const labelPosition = ref('right')
            const state = reactive({
                formLabelAlign: {
                    name: '',
                    psw: ''
                },
                verify: ''
            })
            // 请求接口文件
            //const Code = JSON.parse(JSON.stringify(verifyRef.value.imgCode))
            console.log(verifyRef)
            const onSubmit=()=>{
                //if (Code == state.verify){
                    let postData = qs.stringify({
                        name:state.formLabelAlign.name,
                        password:state.formLabelAlign.psw
                    })
                    postLogin(postData).then(res=>{
                        //console.log(res)
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
                            const set = window.sessionStorage
                            const tc = JSON.stringify(res.data.data)
                            set.setItem('data',tc)
                            router.push('/admin/admin')
                        
                        }
                        
                    })
                //}
                // else{
                //     Message({
                //         message: '验证码错误',
                //         type: 'error'
                //     });
                // }
            }

            

            const isLogin=()=>{
                const storage = window.sessionStorage
                const getdata = storage.getItem("data")
                console.log(getdata)
                if (getdata != ""){
                    router.push('/admin/admin')
                }else{
                    router.push('/admin/login')
                }
            }
            const toIndex=()=>{
                router.push('/')
            }
            onMounted(()=>{
                isLogin()
            })
            return {
                onSubmit,
                verifyRef,
                labelPosition,
                toIndex,
                ...toRefs(state)
            }
        }
    }
</script>

<style lang="scss" scoped>
.box-card {
    width: 30rem;
    margin: 10rem auto 0;
}
</style>