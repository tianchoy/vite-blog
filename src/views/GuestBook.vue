<template>
    <el-header style="padding:0"><Header/></el-header>
    <div class="gb_box">
        <el-form ref="formRef" :model="formData" :label-position="left" label-width="80px">
            <el-form-item label="姓名:">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="想法:">
                <el-input
                v-model="formData.content"
                type="textarea"
                placeholder="请输入想法"
                rows="3"
                maxlength="100"
                show-word-limit
                ></el-input>
            </el-form-item>
            <el-form-item label="验证码：">
                <el-input
                type="text"
                placeholder="验证码"
                v-model="verify"
                >
                </el-input>
                <vueImgVerify ref="verifyRef" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="postDataSubmit">发布</el-button>
            </el-form-item>
        </el-form>
        <div class="gb_list">
            <el-row>
                <el-col
                :span="24"
                v-for="(item,o) in guestBookData"
                :key="o"
                >
                <el-card  class="ecard"  shadow="hover">
                    <div class="ecard_title">
                        <span class="ecard_name">
                            <i class="el-icon-user-solid"></i>
                            {{item.name}}
                        </span>
                        <span class="time">
                            <i class="el-icon-location-information location" v-if="item.city==''?false:true">{{item.city}}</i>
                            <i class="el-icon-time">{{ item.time }}</i>
                        </span>
                    </div>
                    <div class="ecard_content">{{item.content}}</div>
                    <div class="autor_reply" v-if="item.huifu_content==null?false:true">
                        <div class="userInfo">
                            <i class="el-icon-user user_name">田超：</i>
                            <i class="el-icon-time user_reply_time">{{ item.huifu_time }}</i>
                        </div>
                        <div class="user_reply_content" v-html="item.huifu_content"></div>
                    </div>
                </el-card>
                </el-col>
            </el-row>
            <pagination @pageNo="handleCurrentChange" :total="total"></pagination>
        </div>
        <p v-if="total<0?true:false">暂无数据</p>
    </div>
</template>

<script lang="ts">
    import {reactive,toRefs,ref,onMounted} from 'vue'
    import vueImgVerify from '../components/verify.vue'
    import {getGuestBookList,postComment} from '../api/GuestBook'
    import Header from '../components/Header.vue'
    import pagination from '../components/Pagination.vue'
    import moment from 'moment'
    import qs from 'qs'
    import { Message } from 'element3'   
    
    export default{
        components: {
            vueImgVerify,
            Header,
            pagination
        },
        setup(){
            const verifyRef = ref()
            const pageNo = ref()
            const state=reactive({
                pageSize:1,
                guestBookData:[],
                //提交回复数据
                formData:{
                    name:'',
                    content:'',
                    city:'',
                    time:''
                },
                total:0,
                //验证码
                verify: "",
            })

            //获取默认数据
            const getGuestBookData=()=>{
                getGuestBookList(state.pageSize).then(res=>{
                    state.guestBookData = res.data.data
                })
            }

            // 提交留言内容
            const postDataSubmit = () =>{
                const now = new Date
                const nowTime = moment(now).format('YYYY-MM-DD HH:mm:ss')
                let postData = qs.stringify({
                    name:state.formData.name,
                    content:state.formData.content,
                    city: returnCitySN["cname"],
                    time: nowTime
                })
                // 请求接口文件
                const Code = JSON.parse(JSON.stringify(verifyRef.value.imgCode))
                
                if (Code == state.verify){
                    postComment(postData).then(res=>{
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
                            getGuestBookList(state.pageSize).then(res=>{
                                state.guestBookData = res.data.data
                            })
                        }
                    })
                } else{
                    Message({
                        message: '验证码错误',
                        type: 'error'
                    });
                }
            }

            const handleCurrentChange = (page:any) => {
                getGuestBookList(page).then(res=>{
                    state.total = parseInt(res.data.total)
                    state.guestBookData = res.data.data
                })
            }

            onMounted(()=>{
                getGuestBookData(),
                document.title = '留言板-田超的博客'
            })

            return{
                pageNo,
                handleCurrentChange,
                verifyRef,
                postDataSubmit,
                ...toRefs(state)
            }
        }
    }

</script>

<style lang="scss" scoped>
.location{margin-right: 10px;}
    .el-input{width: 45%;float: left;margin-right: 1em;}
    .el-input__inner{width: 100%;}
    button{float: left;}
.ecard{
        margin-bottom: 1.5em;
    }
    .ecard_title{
        padding-bottom: 2em;
        font-size: .2em;
        border-bottom: 1px dotted #ebecec;
        margin-bottom: 5em;
        text-align: left;
        overflow: hidden;
        span {display: block;width: 100%;line-height: 2em;}
        .ecard_name{float: left;font-weight: 500;font-size: 16px;}
    }
    .ecard_content{text-align: left;padding: .5em 0;}
    .img-verify{text-align: left;}
    .autor_reply{border-top: 1px dashed #ebecec;padding:1em 0 0 0;text-align: left;}
    .userInfo i{display: block;padding-bottom: .5rem;font-size: .2em;}
    .userInfo .user_name{font-weight: 500;}
    .user_reply_content p{margin: 1em 0 0 0;}
</style>