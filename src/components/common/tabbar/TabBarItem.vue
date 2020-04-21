<template>
 <div class='tab-bar-item' @click="itemClick">
   <!-- 2、通过插槽可以动态的让数据传入 -->
   <div v-if="!isActive">
     <slot name="item-icon"></slot>
   </div>
   <div v-else>
      <slot  name="item-icon-active"></slot>
   </div>
   <!-- 3、插槽会被替换掉,所以一般都在slot最外层包装一下，用来定义这个插槽-->
   <div :style="activeStyle">
     <slot name="item-text"></slot>
   </div>
   
   <!-- 1、所有的item都展示同一个图片与文字 -->
   <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
   <div>首页</div> -->
 </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
},
  data () {
    return {
      // isActive:false
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} :{}
    }
  },
  methods:{
    itemClick(){
      this.$router.replace(this.path);
    }
  }
}

</script>
<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img{
    margin-top: 3px;
    width: 24px;
    height: 24px;
    /* img自身会带margin-3px */
    vertical-align: middle;
    margin-bottom: 2px;
  }

  /* .active{
    color:red
  } */

</style>
