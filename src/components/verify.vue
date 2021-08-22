<template>
 <div class="img-verify">
 <canvas ref="verify" :width="width" :height="height" @click="handleDraw"></canvas>
 </div>
</template>
 
<script type="text/ecmascript-6" lang="ts">
import { reactive, onMounted, ref, toRefs } from 'vue'
export default {
 setup() {
 const verify = ref()
 const state = reactive({
  pool: 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', // 字符串
  width: 120,
  height: 40,
  imgCode: ''
 })
 onMounted(() => {
  // 初始化绘制图片验证码
  state.imgCode = draw()
 })
  
 // 点击图片重新绘制
 const handleDraw = () => {
  state.imgCode = draw()
 }
 
 // 随机数
 const randomNum = (min:any, max:any) => {
  return parseInt(Math.random() * (max - min) + min)
 }
 // 随机颜色
 const randomColor = (min:any, max:any) => {
  const r = randomNum(min, max)
  const g = randomNum(min, max)
  const b = randomNum(min, max)
  return `rgb(${r},${g},${b})`
 }
 
 // 绘制图片
 const draw = () => {
  // 3.填充背景颜色，背景颜色要浅一点
  const ctx = verify.value.getContext('2d')
  // 填充颜色
  ctx.fillStyle = randomColor(255, 255)
  // 填充的位置
  ctx.fillRect(0, 0, state.width, state.height)
  // 定义paramText
  let imgCode = ''
  // 4.随机产生字符串，并且随机旋转
  for (let i = 0; i < 4; i++) {
  // 随机的四个字
  const text = state.pool[randomNum(0, state.pool.length)]
  imgCode += text
  
  // 随机的字体大小
  const fontSize = randomNum(20, 20)
  // 字体随机的旋转角度
  const deg = randomNum(-10, 10)
  ctx.font = fontSize + 'px Simhei'
  ctx.fillStyle = randomColor(80, 150)

  ctx.save()
  ctx.translate(30 * i + 15, 15)
  ctx.rotate((deg * Math.PI) / 180)
  // fillText() 方法在画布上绘制填色的文本。文本的默认颜色是黑色。
  // context.fillText(text,x,y,maxWidth);
  ctx.fillText(text, -15 + 5, 13)
  ctx.restore()
  }
  return imgCode
 }
 
 return {
  ...toRefs(state),
  verify,
  handleDraw
 }
 }
}
</script>
<style type="text/css">
.img-verify canvas {
 cursor: pointer;
}
</style>