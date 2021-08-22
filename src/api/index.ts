import instance from './axios'
import axios from './axios'


// getNwesListData
export const getNewsList = ()=>{
    return instance({
        url:'getIndex.php'
    })
}

//获取归档页面的数据
export const getArchiveData = (page:any) =>{
    return instance.post('getArtList.php?page='+page)
}

//获取一言数据

export const getHitokoto = ()=>{
    return axios.get('https://v1.hitokoto.cn/?c=e')
}

export default {
    getNewsList,
    getArchiveData,
    getHitokoto
}