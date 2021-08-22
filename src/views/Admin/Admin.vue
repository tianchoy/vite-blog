<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="文章管理">
                <div class="post_box">
                    <el-button type="primary" class="new_art" @click="showArtEditor()">新增文章</el-button>
                    <Editor :dialogflag="artLogvisible" :showTitle="true"  @passData = "passData" @closedia = "artClosedia" />
                </div>
                <div class="list_box">
                    <ArtList :artData="artData" @viewArtClick="viewArtClick" @delArtClick="delArtClick" />
                </div>
                <div class="pagin">
                    <Pagination  @pageNo="handleGetArtChange" :total="artTotal" />
                </div>
            </el-tab-pane>
            <el-tab-pane label="文章评论">
                <div class="list_box">
                    <artReply :artCom="artCom" :isReplyArt="true" />
                </div>
                <div class="pagin">
                    <Pagination  @pageNo="handleGetArtReplyChange" :total="artComTotal" />
                </div>
            </el-tab-pane>
            <el-tab-pane label="说说管理">
                <div class="post_box">
                    <el-button type="primary" class="new_art" @click="showTalkEditor()">新增说说</el-button>
                    <Editor :dialogflag="talkLogvisible" :showTitle="false"  @passTalk = "passTalk" @closedia = "talkClosedia" />
                </div>
                <div class="list_box">
                    <TalkList :talkData="talkData" @delTalkClick="delTalkClick" />
                </div>
                <div class="pagin">
                    <Pagination  @pageNo="handleGetTalkChange" :total="talkTotal" />
                </div>
            </el-tab-pane>
            <el-tab-pane label="留言管理">
                <div class="list_box">
                    <GuestBook :guestBookData="guestBookData" @delgbClick="delgbClick" />
                </div>
                <div class="pagin">
                    <Pagination  @pageNo="handleGuestBookChange" :total="gbTotal" />
                </div>
            </el-tab-pane>
            <el-tab-pane label="退出系统">
                <el-button type="danger"  @click="logout">退出</el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
    import { reactive, onMounted, toRefs} from 'vue'
    import Editor from '../../components/Editor.vue'
    import ArtList from '../../components/artList.vue'
    import TalkList from '../../components/TalkList.vue'
    import artReply from '../../components/artReply.vue'
    import GuestBook from '../../components/guestBook.vue'
    import router from '../../router'
    import {getArtList,postArt,getTalkList,postTalk,getArtReplyData,getGuestBookData,delData} from '../../api/admin/Index'
    import Pagination from '../../components/Pagination.vue'
    import { Message } from 'element3'  
    export default {
        components:{
            Editor,
            ArtList,
            TalkList,
            artReply,
            GuestBook,
            Pagination
        },
        setup(){
            const state = reactive({
                pageSize:1,
                artData:[],
                talkData:[],
                artCom:[],
                guestBookData:[],
                artTotal:0,
                talkTotal:0,
                artComTotal:0,
                gbTotal:0,
                artLogvisible: false,
                talkLogvisible:false,
            })

            //文章列表
            const getArt =()=>{
                getArtList(state.pageSize).then(res=>{
                    state.artTotal = parseInt(res.data.total)
                    state.artData = res.data.data
                })
            }

            // 文章点击页数触发事件
            const handleGetArtChange = (page:any) => {
                getArtList(page).then(res=>{
                    state.artTotal = parseInt(res.data.total)
                    state.artData = res.data.data
                })
            }

            //发布文章接口
            const passData=(val:any)=>{
                postArt(val).then(res=>{
                    tips(res)
                    getArtList(state.pageSize).then(res=>{
                        state.artTotal = parseInt(res.data.total)
                        state.artData = res.data.data
                    })
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

            //控制显示文章发布框
            const showArtEditor =()=>{//点击按钮，显示文章发布框
                state.artLogvisible = true;
            }
            const artClosedia=()=>{  //控制发布框隐藏
                state.artLogvisible = false;
            }

            //查看文章
            const viewArtClick=(val:any)=>{
                
                const { href } = router.resolve({
                    path: '/detail/'+val,
                });
                window.open(href, "_blank");
            }
            //删除文章
            const delArtClick=(val:any)=>{
                delData(val,'arts').then(res=>{
                    tips(res)
                    getArtList(state.pageSize).then(res=>{
                        state.artTotal = parseInt(res.data.total)
                        state.artData = res.data.data
                    })
                })
            }

            //获取文章评论
            const getArtReply=()=>{
                getArtReplyData(state.pageSize).then(res=>{
                    state.artComTotal = parseInt(res.data.total)
                    state.artCom = res.data.data
                })
            }

            const handleGetArtReplyChange=(page:any)=>{
                getArtReplyData(page).then(res=>{
                    state.artComTotal = parseInt(res.data.total)
                    state.artCom = res.data.data
                })
            }


            //说说列表
            const getTalk=()=>{
                getTalkList(state.pageSize).then(res=>{
                    state.talkTotal = parseInt(res.data.total)
                    state.talkData = res.data.data
                })
            }

            // 说说点击页数触发事件
            const handleGetTalkChange=(page:any)=>{
                getTalkList(page).then(res=>{
                    state.talkTotal = parseInt(res.data.total)
                    state.talkData = res.data.data
                })
            }

            
            //发布说说
            const passTalk=(val:any)=>{
                
                postTalk(val).then(res=>{
                    
                    tips(res)
                    getTalkList(state.pageSize).then(res=>{
                        state.talkTotal = parseInt(res.data.total)
                        state.talkData = res.data.data
                    })
                })
            }

            //删除说说
            const delTalkClick=(val:any)=>{
                
                delData(val,'say').then(res=>{
                    
                    tips(res)
                    getTalkList(state.pageSize).then(res=>{
                        state.talkTotal = parseInt(res.data.total)
                        state.talkData = res.data.data
                    })
                })
            }

            //控制显示说说发布框
            const showTalkEditor=()=>{
                state.talkLogvisible = true;
            }
            const talkClosedia=()=>{  //控制发布框隐藏
                state.talkLogvisible = false;
           }

           //获取留言板
           const getGuestbook=()=>{
               getGuestBookData(state.pageSize).then(res=>{
                   state.gbTotal = parseInt(res.data.total)
                   state.guestBookData = res.data.data
               })
           }

           const handleGuestBookChange=(page:any)=>{
               getGuestBookData(page).then(res=>{
                    state.gbTotal = parseInt(res.data.total)
                    state.guestBookData = res.data.data
               })
           }
           // 删除留言
           const delgbClick=(val:any)=>{
               delData(val,'liuyan').then(res=>{
                    tips(res)
                    getGuestBookData(state.pageSize).then(res=>{
                        state.gbTotal = parseInt(res.data.total)
                        state.guestBookData = res.data.data
                    })
                })
           }

           const logout=()=>{
               window.sessionStorage.removeItem('data');
                window.location.reload()
           }

            onMounted(()=>{
                getArt(),
                getTalk(),
                getArtReply(),
                getGuestbook()
            })

            return{
                passData,
                passTalk,
                handleGetArtChange,
                showArtEditor,
                showTalkEditor,
                artClosedia,
                talkClosedia,
                viewArtClick,
                delArtClick,
                delTalkClick,
                delgbClick,
                handleGetTalkChange,
                handleGetArtReplyChange,
                handleGuestBookChange,
                logout,
                ...toRefs(state)
            }
        }
    }
</script>

<style lang="scss" scoped>
.pagin{margin-top: 10px;}
.new_art{float: left;margin-bottom: 20px;}
</style>