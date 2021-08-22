import instance from './axios'

//getNewsDetailData

export const getNewsDetail = (id:any)=>{
    return instance.post('getArtDetail.php?id='+id)
}
//get article list data
export const getNewsReply = (id:any) =>{
    return instance.post('getArtReply.php?id='+id)
}
//post reply data
export const postComment = (postContent:string) =>{
    return instance.post('postComment.php',postContent)
}

//post like artcle data

export const postLikeArt = (id:any)=>{
    return instance.post('art_like.php',id)
}

export default{
    getNewsDetail,
    getNewsReply,
    postComment,
    postLikeArt
}