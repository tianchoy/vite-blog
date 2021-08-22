<template>
    <el-header style="padding:0"><Header/></el-header>
    <div class="detailBox">
        <h1>{{artDetailData.title}}</h1>
        <div class="con" v-html="artDetailData.content"></div>
        <div class="tips">
            <span class="post_time">
                <i class="el-icon-time"></i>
                {{artDetailData.time}}
            </span>
            <span class="hits">
                <i class="el-icon-view"></i>
                {{artDetailData.hits}}
            </span>
            <span class="art_like">
                <i class="el-icon-star-on" @click="btnArtLike"></i>
                {{artDetailData.art_love}}
            </span>
        </div>
        <div class="post_reply">
            <el-form :label-position="labelPosition" label-width="80px" :model="formData">
                <el-form-item label="姓名:">
                    <el-input v-model="formData.username"></el-input>
                </el-form-item>
                <el-form-item label="想法:">
                    <el-input
                    v-model="formData.comContent"
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
                    <el-button type="primary" @click="postDataSubmit">发布吧</el-button>
                </el-form-item>
                
            </el-form>
            
        </div>
        <div class="reply_content">
            <el-row>
                <el-col
                :span="24"
                v-for="(item,o) in replyData"
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
                            <i class="el-icon-time">{{ item.pl_time }}</i>
                        </span>
                    </div>
                    <div class="ecard_content">{{item.pl_content}}</div>
                    <div class="autor_reply" v-if="item.repl_content==null?false:true">
                        <div class="userInfo">
                            <i class="el-icon-user user_name">田超：</i>
                            <i class="el-icon-time user_reply_time">{{ item.repl_time }}</i>
                        </div>
                        <div class="user_reply_content">{{item.repl_content}}</div>
                    </div>
                </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script lang="ts">
    import {reactive,toRefs,watch,ref} from 'vue'
    import {getNewsDetail,getNewsReply,postComment,postLikeArt} from '../api/Detail'
    import Header from '../components/Header.vue'
    import vueImgVerify from '../components/verify.vue'
    import moment from 'moment'
    import qs from 'qs'
    import { Message } from 'element3'
    import router from '../router/index'

    export default {
        components: {
            vueImgVerify,
            Header
        },
        setup(){
            const verifyRef = ref()
            let id = ref()
            let labelPosition = ref('right')
            const state = reactive({
                //文章详情
                artDetailData:{
                    name:'',
                    content:'',
                    hits:'',
                    time:'',
                    art_love:''
                },
                //获取评论列表
                replyData:[],
                //提交回复数据
                formData:{
                    id:'',
                    username:'',
                    comContent:'',
                    city:'',
                    time:''
                },
                //验证码
                verify: "",
                
            })
            watch(id,async()=>{
                const res = await getNewsDetail(id.value)
                if(!res.data){
                    const { href } = router.resolve({
                    path: '/404',
                    });
                    window.open(href, "_self");
                }
                state.artDetailData = res.data
                const replyRes = await getNewsReply(id.value)
                state.replyData = replyRes.data.data
                document.title = res.data.title + '-田超的博客'
            })

            //发布评论事件
            const postDataSubmit = () =>{
                const now = new Date
                const nowTime = moment(now).format('YYYY-MM-DD HH:mm:ss')
                let postData = qs.stringify({
                    id:id.value,
                    name:state.formData.username,
                    content:state.formData.comContent,
                    city: returnCitySN["cname"],
                    time: nowTime
                })
                // 请求接口文件
                
                const Code = JSON.parse(JSON.stringify(verifyRef.value.imgCode))
                if (Code == state.verify){
                    postComment(postData).then(res=>{
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
                            getNewsReply(id.value).then(res=>{
                                state.replyData = res.data.data
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
            //文章点赞事件
            const btnArtLike =()=>{
                
                let postD=qs.stringify({
                    id:id.value
                })
                postLikeArt(postD).then(res=>{
                    
                    if(res.status == 200)[
                        getNewsDetail(id.value).then(res=>{
                            
                            state.artDetailData.art_love = res.data.art_love
                        })
                    ]
                })
            }
            return{
                ...toRefs(state),
                id,
                verifyRef,
                labelPosition,
                postDataSubmit,
                btnArtLike
                
            }

        },
        beforeMount() {
            let {id} = this.$route.params
            this.id = id
            
        }   
    }
</script>

<style lang="scss" scoped>
    h1{color: #409eff;font-size: 1.8em;}
    .detailBox{margin: 0 1rem;}
    .con{text-align: left;line-height: 2rem;}
    .tips{
        margin: 2em auto 3em;
        text-align: left;
        font-size: 1em;
        overflow: hidden;
        span{
            display: inline-block;
            vertical-align: middle;
            height: 1em;
            line-height: 1em;
            i{
                vertical-align: -.1em;
            }
            
        }
        .post_time,.hits{
            margin-right: 3em;
        } 
    }
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
        span{display: block;width: 100%;line-height: 2em;}
        .ecard_name{float: left;font-weight: 500;font-size: 16px;}
    }
    .ecard_content{text-align: left;padding: .5em 0;}
    .img-verify{text-align: left;}
    .autor_reply{border-top: 1px dashed #ebecec;padding:1em;text-align: left;}
    .userInfo i{display: block;padding-bottom: .5rem;font-size: .2em;}
    .userInfo .user_name{font-weight: 500;}
</style>