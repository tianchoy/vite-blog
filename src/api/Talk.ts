import instance from "./axios";

export const getTalkData=(page:any)=>{
    return instance.post('getSay.php?page='+page)
}

export default{
    getTalkData
}