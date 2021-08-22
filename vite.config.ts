import type {UserConfig} from 'vite';

const viteConfig:UserConfig = {
    open:true,
    hostname:'localhost',
    proxy:{
        '/api':{
            //target:'http://tianchoy.com/apis/',//正式服务器
            target:'http://localhost/apis/',//测试服务器
            changeOrigin: true,
            ws:true,
            rewrite:path => path.replace(/^\/api/,'')
        }
    }
}

export default viteConfig