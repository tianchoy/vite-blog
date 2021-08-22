import instance from "../axios";
/*
 * api by tianchao
 * 2021-07-31
 */
//登录api
export const postLogin =(postcontent:string)=>{
    return instance.post('postLogin.php',postcontent)
}

//发布文章api
export const postArt = (postArt:any)=>{
    return instance.post('addArt.php',postArt)
}

//读取文章列表api
export const getArtList = (pageSize:any)=>{
    return instance.get('getArtList.php?page='+ pageSize)
}

//编辑文章api
export const editArt=(id:any)=>{
    return instance.get('editArt.php?id='+id)
}

export const saveEditArt=(postcontent:any)=>{
    return instance.post('artEdit.php',postcontent)
}
//删除说说,留言和文章api
export const delData=(id:any,type:any)=>{
    return instance.get('delArt.php?id='+id+'&type='+type)
}

//获取文章评论
export const getArtReplyData=(pageSize:any)=>{
    return instance.get('replyList.php?page='+pageSize)
}

//回复文章评论
export const artReply=(postData:any)=>{
    return instance.post('artComm.php',postData)
}

//说说 列表api
export const getTalkList=(pageSize:any)=>{
    return instance.get('getSay.php?page='+pageSize)
}

//talk post api

export const postTalk=(postData:any)=>{
    return instance.post('sayAdd.php',postData)
}

//留言板api
export const getGuestBookData=(pageSize:any)=>{
    return instance.get('getGuestBook.php?page='+pageSize)
}

//回复留言

export const replyGuestBook=(postData:any)=>{
    return instance.post('guestBookReply.php',postData)
}

export default{
    postLogin,
    getArtList,
    postArt,
    editArt,
    getTalkList,
    postTalk,
    delData,
    saveEditArt,
    getArtReplyData,
    getGuestBookData,
    artReply,
    replyGuestBook
}