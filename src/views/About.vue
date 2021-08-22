<template>
    <div class="about-box">
        <el-header style="padding:0"><Header/></el-header>
        <el-card class="box-card">
            <template v-slot:header>
            <div class="clearfix">
                <span>我的想法</span>
            </div>
            </template>
            <div class="text item">我觉得会写程序是件很酷的事情，所以，我尝试着学习一些编程语言，</div>
            <div class="text item">在这个博客已经接近衰败的时代，再做一个博客是件很愚蠢的事情，</div>
            <div class="text item">但是，人生总应该去坚持做一些事情，是那种不在乎结果的坚持，</div>
            <div class="text item">就像我对博客的喜欢，对音乐的热爱，</div>
            <div class="text item">我不敢奢望未来能出本书，也不妄想去发唱片，</div>
            <div class="text item">在心里存着这样一个想法吧，就像网络上很流行的一句话：</div>
            <div class="text item"><b>“梦想还是要有的，万一实现了呢？”</b></div>
        </el-card>
        <el-card class="box-card">
            <template v-slot:header>
            <div class="clearfix">
                <span>关于我</span>
            </div>
            </template>
            <div class="text item">web前端爱好者，从2015年开始一直在从事web前端的工作</div>
            <div class="text item">学习一点PHP之后，用PHP+bootstrap写了第一个版本</div>
            <div class="text item">关注到Vue的时候，已经是2019年了，用Vue2写了第二个版本</div>
            <div class="text item">也是这一年,在百度云注册了这个域名买了虚拟主机</div>
            <div class="text item">从这一年开始我就没做前端了，转去了别的行业</div>
            <div class="text item">直到2021年春节，还是觉得写前端更适合我，</div>
            <div class="text item">所以，用了Vue3+TS+PHP，写了这个版本</div>
            <div class="text item"><b>我想我会一直更新下去的。。。</b></div>
        </el-card>
        <el-card class="box-card">
            <template v-slot:header>
            <div class="clearfix">
                <span>联系我</span>
            </div>
            </template>
            <div class="text item">不定期出没，随缘吧！</div>
        </el-card>
    </div>
</template>

<script lang="ts">
    import Header from '../components/Header.vue'
    export default {
        components:{
            Header
        }
    }
</script>

<style lang="scss" scoped>
@media screen and (max-width:1024px) {
    .box-card {
        width: 90%;
    }
}
@media screen and (min-width:1025px) {
    .box-card {
        width: 30rem;
    }
}
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    margin: 0 auto 2rem;
  }
</style>