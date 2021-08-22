<template>
    <div class="newsList">
        <div v-for="item in newsData" :key="item.id">
            <router-link :to="{path:`/detail/${item.id}`}" class="newsItem" style="text-decoration: none;">
                <h4>{{item.title}}</h4>
            </router-link>
            <div class="con" v-html="item.content"></div>
        </div>
    </div>
</template>

<script lang="ts">
    export default{
        props:{
            newsData:{
                type:Array,
                default:[]
            }
        }
    }
</script>

<style lang="scss" scoped>
.newsList{padding: 0 1.2rem;}
.con{text-align: left;line-height: 2rem;}
h4{color:#409eff;font-size: 1.4rem;font-weight: 400;}
</style>