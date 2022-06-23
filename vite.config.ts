import type {UserConfig} from 'vite';

const viteConfig:UserConfig = {
    open:true,
    hostname:'localhost',
    proxy:{
        '/api':{
            //target: 'http://tc.com/',//测试服务器
            target: 'http://tianchoy.com/api',
            changeOrigin: true,
            ws:true,
            rewrite:path => path.replace(/^\/api/,'')
        }
    }
}

export default viteConfig