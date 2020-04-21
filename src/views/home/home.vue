<template>
 <div id="home">
    <!-- 替换插槽 -->
   <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
   <!-- 轮播部分 -->
   <home-swiper :banners="banners" />
   <!-- 展示推荐的信息 -->
   <recommend-view :recommends="recommends" />
  <!-- 本周流行部分 -->
  <feature />
  <!-- 控制栏组件（tab组件） -->
  <tab-control class="tab-control" 
               :titles="['流行','新款','经典']" 
               @tabClick="tabClick" />
  <!-- 展示商品数据(1、请求数据，变量存储下来、2、创造新组件、3、应用组件（图片复用不想重复）) -->
 <!-- 1、原始写法 -->
 <!-- <goods-list :goods="goods[currentType].list" /> -->
 <!-- 2、computed写法 -->
  <goods-list :goods="showGoods" />
 </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import Feature from './childComps/Feature';

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'


import {getHomeMultidata,getHomeGoods} from "network/home";


export default {
  name:'Home',
  components:{//只有注册了才可以用
    NavBar,
    HomeSwiper,
    RecommendView,
    Feature,
    TabControl,
    GoodsList
  },
  created(){ //发送网络请求,要在生命周期函数，刚创建出来就要请求了
  // 1、请求多个数据
    this.getHomeMultidata();
  // 2.请求商品数据
   this.getHomeGoods('pop');
   this.getHomeGoods('new');
   this.getHomeGoods('sell');
  },
  data () {
    return {
      ///3、存储请求回来的数据
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list: []},
        'new':{page:0,list: []},
        'sell':{page:0,list: []}
      },
      currentType:'pop'
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods:{
  /**
   * 事件监听相关的方法
   * */  
    tabClick(index){
      switch(index){
        case 0: 
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
    },
    /**
    * 网络请求相关的方法
    */
    getHomeMultidata(){
      getHomeMultidata().then(res => {  //2、拿到数据，这是一个局部变量，需要保存下来
      this.banners = res.data.banner.list;   //4、箭头函数里的this,指向的是组件
      this.recommends = res.data.recommend.list; 
    })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
       getHomeGoods(type,page).then(res => {
        //  push函数可以用...形式
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1;
    })
    }
  }
}

</script>
<style scoped>
#home{
  padding-top: 44px;
}
.home-nav{
  background-color: var(--color-tint);
  color:#ffffff;
  position: fixed;
  top:0;
  left:0;
  right: 0;
  z-index: 9;
}
.tab-control{
  position:sticky;
  top:44px;
  z-index:9;
}
</style>
