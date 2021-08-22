function formatTime(time:any){
    let arr:any[] = []
    time = time.toLocaleDateString() //进行日期的格式转换
     
    time.replace(/\d+/g,(val:any) =>{
        val = val <2 ? '0${val}': val;
        arr.push(val)
    })
    return arr
}

export default {
    formatTime
}