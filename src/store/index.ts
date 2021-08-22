import {createStore} from 'vuex'

interface State {
    state:{
        userName:string
    }
}

export default createStore({
    state:{
        userName:'田超'
    }
})