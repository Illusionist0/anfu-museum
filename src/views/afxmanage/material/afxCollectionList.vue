// 藏品分类页面
<template xmlns="http://www.w3.org/1999/html">
<div class="app-container-category"  ref="categoryList">
    <!-- 导航栏 --><!--
        <div class="navigate_box" >
          <div class="navigate-inner">
              <div>
                      <img src="@/assets/test_images/logo.png" style="width: 90px;height: 80px;margin-top: 10px;">
              </div>
              <div class="naviBar">
                      <div>
                              <div style="display: flex;">
                                      <div v-for="(item, index) in naviBarList" :key="index"  class="naviBarItem" :class="{active: activeIndex === index}"  @click="activeIndex = index" >
                                              <img :src= iconList[index] class="icon" >
                                              <span class="icon-text">{{ item }}</span>
                                      </div>
                              </div>
                      </div>

              </div>
              <div >
                    <el-row style="color: aliceblue;margin-bottom:52px;margin-right: 27px;">
                      <span class="login" @click="goToUrl('https://ts.hcctm.com:25513/')" >登录</span>
&lt;!&ndash;                            <span > | </span>
                            <span class="login"> 注册 </span>&ndash;&gt;
                    </el-row>
              </div>
          </div>
        </div>-->
  <div class="navigate_box" v-if="loadAgain">
    <div class="navigate_box-1">
      <div>安福县博物馆</div>

      <!-- pc端 -->
      <div class="search_box" v-if="!Navigater">
        <div></div>
        <svg-icon v-if="isSearch" style="height: 2.25em;" class="navigate_svg" icon-class="search1" @click="handleControl" />
        <div v-if="!isSearch" class="navigate_searchbox">
          <svg-icon class="navigate_svg" style="height: 1.25em;" icon-class="search1" @click="searchName(queryParams.name)" />
          <!-- <span style="height: 20px;width: 1px;color: #ccc;">11</span> -->
          <el-input
            v-model="queryParams.name"
            @keyup.enter.native="searchName(queryParams.name)"
            placeholder="搜索关键词">
          </el-input>
        </div>
        <svg-icon v-if="!isSearch" style="height: 2.25em;" class="navigate_svg" icon-class="cancel" @click="handleControl" />
        <svg-icon class="navigate_svg" style="height: 2.25em;" icon-class="home" />
        <!-- <svg-icon class="navigate_svg" style="height: 2.25em;" icon-class="morelist" /> -->
        <svg-icon class="navigate_svg" title="3d展示" @click="handle3D" style="height: 2.25em;" icon-class="3d" />
        <svg-icon class="navigate_svg" title="VR展示" @click="handle3DVR" style="height: 2.25em;" icon-class="xnzt" />
      </div>

      <!-- 移动端 -->
      <div class="search_box" v-else>
        <div></div>
        <div v-if="!isSearch" class="navigate_searchbox-mobile">
          <el-input v-model="searchWord" placeholder="搜索关键词"></el-input>
        </div>
        <svg-icon v-if="isSearch" class="navigate_svg" icon-class="search1" @click="handleControl" />
        <svg-icon v-if="!isSearch" style="color: #e7c37d;" class="navigate_svg" icon-class="cancel" @click="handleControl" />
        <svg-icon class="navigate_svg" icon-class="home" />
        <svg-icon class="navigate_svg" icon-class="morelist" />
      </div>
    </div>
  </div>
        <!--  -->
        <div class="center-box">
                <div style="display: flex;flex-direction: column;">
<!--                    <el-row>
                            <el-col>
                                    <el-image style="width: 100%; margin-bottom: 20px;"
                                    :src="headurl"> </el-image>
                            </el-col>
                    </el-row>-->
                    <!-- 走马灯 -->
                    <div>
                      <img class="bcg_img" style="max-width: 100%;height: auto;display: block;object-fit: cover;" src="../../../assets/images/background2.png" />
                        </div>
                    <div class="carousel_box">
                      <!-- <el-carousel trigger="click" class="el-carousel" :height="screenheight">
                        <el-carousel-item v-for="item in 1" :key="item">
                          <div id="carousel_box-img" ref="carouselbox"> -->
                          <!-- <div class="carousel_box-img" @click = "detail(item.id)"> -->
                            <!-- <img class="bcg_img" style="max-width: 100%;height: auto;display: block;object-fit: cover;" src="../../../assets/images/background1.jpg" />
                          </div>
                        </el-carousel-item>
                      </el-carousel> -->
                    </div>

                    <!-- 藏品展示 -->
                    <div class="contentbox">
                      <!-- <div class="first_imgbox">
                        <u v-if="infoList[0].file3dObj!=null" class="is3D">3D</u>
                        <div class="img-box" @click = "detail(infoList[0].id)">
                          <el-image class="img" :src="baseURL+infoList[0].photoUrl"></el-image>
                        </div>
                      </div> -->
                      <div v-for="(item,index) in infoList" :key="index" class="img-box-border"  >

                        <!-- <u v-if="item.file3dObj!=null" class="is3D">3D</u> -->
                        <div class="img-box" @click = "detail(item.id,item.file3dObj, item.file3dMp3)">
                          <el-image class="img" style="height: 100px;width: 100px;" :src="baseURL+infoList[index].photoUrl"></el-image>
                        </div>
                        <div class="text">
                          <span @click="openqrcode(item.id,item.file3dObj, item.file3dMp3)" :title="infoList[index].name"> {{ infoList[index].name }} </span>
                        </div>
                        <el-dialog  :visible.sync="open" width="250px" append-to-body>
                          <img :src="myqrcode" style="width: 200px;height: 200px;"/>
                        </el-dialog>
                        <!-- <div class="img-text">
                          <span class="text"> {{ infoList[index].name }} </span>
                          <i ref="icon_off" class="el-icon-star-off" @click="change1(index)" style="display: block;"></i>
                          <i ref="icon_on" class="el-icon-star-on" @click="change2(index)" style="display: none;"></i>
                        </div> -->
                      </div>
                      <!-- <div v-for="(item,index) in infoList" :key="index"  class="img-box-border"  >
                        <u v-if="item.file3dObj!=null" class="is3D">3D</u>
                        <div class="img-box" @click = "detail(item.id)">
                          <el-image class="img" :src="baseURL+infoList[index].photoUrl"></el-image>
                        </div>
                        <div class="img-text">
                          <span class="text"> {{ infoList[index].name }} </span>
                          <i ref="icon_off" class="el-icon-star-off" @click="change1(index)" style="display: block;"></i>
                          <i ref="icon_on" class="el-icon-star-on" @click="change2(index)" style="display: none;"></i>
                        </div>
                      </div> -->
                    </div>


                    <!-- <el-row  class="textNavi">首页>>藏品>>文物藏品</el-row>
                    <div ref="selected_condition" class="selected-condition">
                    <div style="display: flex">
                        <span style="margin-right: 20px;font-weight: bold" >全部结果></span>
                        <div ref="el_tag" v-for="(tag,index) in dynamicTags" :key="index"  class="selected-condition-tag" >
                          <el-tag
                            :key="tag"
                            :value="tag"
                            closable
                            :disable-transitions="true"
                            @close="handleClose(tag,index)">
                            {{tag}}
                          </el-tag>
                        </div>
                    </div>
                    </div>
                    <div style="display: flex; margin-bottom: 20px;">
                      <span style="margin-right: 20px;margin-top: 5px; font-size: 15px;">关键字：</span>
                      <el-input
                        v-model="queryParams.name"
                        placeholder="请输入你需要搜索的内容"
                        @keyup.enter.native="searchName(queryParams.name)"
                        style="width: 30%;">
                      <button slot="suffix" class="el-icon-search" @click="searchName(queryParams.name)"></button>
                      </el-input>
                    </div>

                    <div>
                      <hr>
                      <div ref="content_material"  class="condition-box-material">
                        <span class="table-head">藏品材质</span>
                        <span   v-for="dict in dict.type.collection_material " :key="dict.value"
                        class="table-content material" @click = "searchByMaterial(dict)">{{dict.label}}</span>
                        <hr>
                      </div>
                      <div ref="content_year" class="condition-box-year" >
                        <span class="table-head">藏品年代</span>
                        <span  v-for="dict in  dict.type.collection_year " :key="dict.value"
                        class="table-content year" @click = "searchByYear(dict)"> {{dict.label}}</span>
                        <hr>
                      </div>
                    </div> -->
                </div>
        </div>

        <!-- 底部 -->
        <div class="info-page" ref="loadMore">
                <el-row style="display: flex;flex-direction: column;">
                        <el-col class="footer" style="margin-top: 0px;">
                                <el-row>友情链接  国家文物局  安福县博物馆</el-row>
                                <!-- <el-row>国家文物局</el-row>
                                <el-row>安福县博物馆</el-row> -->
                        </el-col>
                        <el-col class="footer">
                                <el-row>主办：安福县博物馆 </el-row>
                                <el-row>地址：吉安市安福县平都镇文庙路59号</el-row>
                                <el-row>Copyright © 2024 安福县博物馆版权所有</el-row>
                        </el-col>
                        <el-col class="footer">
                                <div >
                                        共有<span>{{totalWatch}}</span>次访问
                                </div>
                        </el-col>
                </el-row>
        </div>
        <div v-if="loading" class="loading">加载中...</div>

</div>
</template>

<script>
import {listAfxCollectionCategory,getQrcode} from "@/api/afxmanage/material"
import axios from "axios";
import { handleTree } from "../../../utils/ruoyi";


const baseURL = process.env.VUE_APP_BASE_API;
//相关藏品信息
const Navigater =  /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(navigator.userAgent);
//判断是否是移动端

export default {
        dicts: ['collection_category', 'collection_level', 'collection_material', 'collection_source', 'collection_year', 'collection_characteristics', 'is_in_stock', 'collection_status'],

        data() {
                return {
                        totalWatch:12345,
                        searchContent: '',
                        activeIndex: 3,
                        screenheight: document.documentElement.clientHeight - 500 + 'px',
                        // screenheight: document.getElementById("carousel_box-img").offsetHeight+ 'px',
                        isSearch: true,
                        loadAgain: true,
                        noMoreData: true,
                        searchWord: '',
                        naviBarList:["首页", "博物馆", "展览", "藏品",  "虚拟展厅", "活动", "历史安福", "联系我们"],
                        iconList:[
                                require('@/assets/test_images/home.png'),
                                require("@/assets/test_images/museum.png"),
                                require("@/assets/test_images/show.png"),
                                require("@/assets/test_images/item.png"),
                                require("@/assets/test_images/room.png"),
                                require("@/assets/test_images/activity.png"),
                                require("@/assets/test_images/an.png"),
                                require("@/assets/test_images/contact.png"),
                        ],
                        visibleItems:[],// 用于显示的数组元素
                        infoList: [],//所有数据列表数据列表
                        page: 1,    // 当前页码
                        pageSize: 10, // 每页加载的数据条数
                        loading: false,  // 加载状态
                        total: 0,// 假设总数据条数
                        baseURL:baseURL,
                        Navigater:Navigater,
                        dynamicTags: ["材质:","年代:","名称:"],
                        inputVisible: false,
                        inputValue: '',
                        headurl:'https://www.jlsdmu.com/sf202312/back/picture/d71c91e2570a412ab13c8a29b2ec337b.PNG',

      // 查询参数
      queryParams: {
        pageNum:1,
        pageSize: 10,
        number: null,
        name: null,
        source: null,
        years:null,
        material:null,
        description:null,
        photoUrl:null,
      },
      open:false,
      myqrcode:"data:image/PNG;base64,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"
    }
  },
  mounted() {},
  created() {
    // 初始加载数据
    // this.loadMoreData();
    this.getList();
    this.page += 1;

          window.addEventListener('resize', () => {
          //   return (()=>{
              let element = document.getElementById("carousel_box-img")
              this.screenheight = element.offsetHeight + 'px'
              console.log("screenheight", this.screenheight);
            })
          // }
          // 监听滚动事件
          window.addEventListener('scroll', this.handleScroll);
        },
        beforeDestroy() {
          // 在组件销毁时移除滚动监听
          window.removeEventListener('scroll', this.handleScroll);
        },
        computed:{
          currentIcon(index) {
            return this.isActive ? 'el-icon-star-off' : 'el-icon-star-on';
          }
        },

        methods: {
          openqrcode(id,file3dObj,file3dMp3){
            let myurl;
            if(file3dObj==null) {
              myurl=window.location.protocol+"//"+window.location.host+"/index/CollectionList?id="+id
            }
            if(file3dObj!=null) {
              myurl=window.location.protocol+"//"+window.location.host+"/index/afxmanage?id="+id+"&file3dObj="+file3dObj+"&file3dMp3="+file3dMp3
            }
            getQrcode({url:myurl}).then(response => {

              console.log(response.qrcode)
              this.myqrcode=response.qrcode
              this.open=true
            });
          },
          goToUrl(url) {
            window.location.href = url;
          },
          handleControl() {
            this.isSearch = !this.isSearch
            console.log("log");

            this.loadAgain = false
            this.$nextTick(() => {
              this.loadAgain = true
            })
          },
          async loadMoreData() {
            if (this.loading || this.noMoreData || this.infoList.length >= this.total) return;
            console.log("加载更多", this.loading , this.noMoreData);

            this.loading = true;

            try {
              this.queryParams.pageNum = this.page;
              this.queryParams.pageSize = this.pageSize;
              // 发送请求获取数据
              const newData = await  listAfxCollectionCategory(this.queryParams).then(response => {
                this.total = response.total
                return response.rows;
              });

              // 判断是否还有更多数据
              if (this.infoList.length >= this.total) {
                this.noMoreData = true;
              }

              this.infoList = [...this.infoList, ...newData];


              this.page += 1;
            } catch (error) {
              console.error('加载数据时发生错误:', error);
            } finally {
              this.loading = false;
            }
          },
          handleScroll() {
            // 获取页面滚动高度
            const scrollTop = window.pageYOffset || this.$refs.categoryList.scrollTop || document.body.scrollTop;
            const clientHeight = document.documentElement.clientHeight || this.$refs.categoryList.clientHeight;
            const scrollHeight = document.documentElement.scrollHeight || this.$refs.categoryList.scrollHeight;

            // 判断是否滚动到底部
            if (scrollTop + clientHeight >= scrollHeight) {
              this.loadMoreData();
              console.log("滚动");

              this.$refs.categoryList.scrollTop -= 40;
            }
          },
          /** 查询藏品分类信息 */
          getList() {
                 this.loading = true;
                 this.queryParams.pageNum = 1;
                 this.queryParams.pageSize = 10;
                 listAfxCollectionCategory(this.queryParams).then(response => {
                          this.infoList = response.rows;
                          this.total = response.total;
                          console.log(this.infoList);

                          // this.page += 1;
                           // 判断是否还有更多数据
                          if (this.infoList.length >= this.total) {
                            this.noMoreData = true;
                          } else {
                            this.noMoreData = false;
                          }
                          this.loading = false;
                  });
          },
          //关闭搜索条件标签
          handleClose(tag,index) {
            this.$refs.el_tag[index].style.display = "none";
            if (index === 0){
              if (this.queryParams.years == null && this.queryParams.name == null){
                this.$refs.selected_condition.style.display = "none";
              }
              this.$refs.content_material.style.display = "block";
              this.queryParams.material = null;

            }else if(index === 1){
              if (this.queryParams.material == null && this.queryParams.name == null){
                this.$refs.selected_condition.style.display = "none";
              }
              this.$refs.content_year.style.display = "block";
              this.queryParams.years = null;

            }else{
              if (this.queryParams.material == null && this.queryParams.years == null){
                this.$refs.selected_condition.style.display = "none";
              }

              this.queryParams.name = null;

            }
            this.getList();
          },
          //材质搜索
          searchByMaterial(dict) {
                  this.$refs.content_material.style.display = "none";
                  this.$refs.selected_condition.style.display = "block";
                  this.dynamicTags[0]="材质: "+dict.label;
                  this.$refs.el_tag[0].style.display = "block";
                  this.queryParams.material = dict.value;
                  this.getList(this.queryParams);
          },
          //年代搜索
          searchByYear(dict) {
                  this.$refs.content_year.style.display = "none";
                  this.$refs.selected_condition.style.display = "block";
                  this.dynamicTags[1]="年代: "+dict.label;
                  this.$refs.el_tag[1].style.display = "block";
                  this.queryParams.years = dict.value;
                  this.getList(this.queryParams);
          },
          //名称搜索
          searchName(name){
            // if (this.queryParams.name) {
              // this.$refs.selected_condition.style.display = "block";
              // this.$refs.el_tag[2].style.display = "block";
              this.dynamicTags[2] = "名称: " + name;
              this.getList(this.queryParams);
            // }else{
            //   this.$message.error('藏品名称不能为空');
            // }
          },
          detail(id,file3dObj,file3dMp3){
            if(file3dObj==null) {
                this.$router.push({ name: '/index/afxmanage', query: {id:id}});
            }
            if(file3dObj!=null) {
              window.open(this.$router.resolve({ name: '/index/CollectionList', query: {  id: id, file3dMp3: file3dMp3 } }).href, '_blank');
            }
          },
          handle3D() {
            window.open(this.$router.resolve({
              name: '/index/Collection3d',
              // query: {  id: id, file3dMp3: file3dMp3 }
            }).href, '_blank');
          },
          handle3DVR() {
            window.open(this.$router.resolve({
              name: '/index/VR',
              // query: {  id: id, file3dMp3: file3dMp3 }
            }).href, '_blank');
          },
          change1(index) {
                this.$refs.icon_off[index].style.display="none";
                this.$refs.icon_on[index].style.display="block";
          },
          change2(index) {
                  this.$refs.icon_on[index].style.display = 'none';
                  this.$refs.icon_off[index].style.display = 'block';
          }
        }
}
</script>

<style>
.app-container-category{
  background-image: url('../../../assets/images/cp_bg.png');
  /* font-family: STKaiti; */
  font-family: Weibei SC;
  /* min-width: 1500px; */
}
.navigate_box{
    position: fixed;
    display: flex;
    justify-content: center;
    height: 10%;
    width: 100%;
    background-color: #00000061;
    margin-left: auto;
    margin-right: auto;
    background-size: cover;
    z-index: 999;
}
.navigate_box-1 {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 calc( 100vw * 20 / 500);
  width: 100%;
  font-size: clamp(16px, calc( 100vw * 20 / 500), 26px);
  font-weight: bold;
  color: #fff;
}
.search_box {
  display: flex;
}
.navigate_svg {
  color: #e5e5e5;
  margin: 0 13px;
  font-size: clamp(24px, calc( 100vw * 20 / 500), 26px);
}
.navigate_svg:hover {
  color: #e7c37d;
}
.navigate_svg:active {
  color: #e7c37d;
}
.navigate_searchbox {
  display: inline-block;
  display: flex;
  margin-right: 30px;
  margin-top: 10px;

  animation-name: slideOutRight;
  animation-duration: 0.5s;
  animation-delay: 0s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}

.navigate_searchbox-mobile {
  position: absolute;
  top: 70px;
  right: 5%;
}

@keyframes slideOutRight {
  from {
    transform: translateX(50%);
  }
  to {
    transform: translateX(0%);
  }
}

/* .el-input--medium .el-input__inner{
  background-color: #00000000;
  border: 1px solid #00000000;
  border-left: 1px solid #ccc;
  border-radius: 0;
} */
.navigate-inner{
  width: 1500px;
  display: flex;
  flex-wrap: nowrap;
  -webkit-box-pack: justify;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: absolute;
}
.carousel_box {
  flex: 1;
  width: 100%;
}

.carousel_box-img {
  width: 100%;
}
.bcg_img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}
.el-carousel /deep/ .el-carousel__item--card {
    width: auto !important;
}
.el-carousel /deep/ .el-carousel__item {
    width: auto !important;
}
.el-carousel /deep/ .el-carousel__item--card.is-active {
    z-index: 2;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0px) !important;
}
.el-carousel{
    width: 100%
}

*,*:before,*:after{
  box-sizing: inherit;
}
.naviBar{

  margin-top: 24px;
}
.naviBarItem{
    color: aliceblue;
    padding: 20px;
    display: flex;
  flex-wrap: nowrap;
   -webkit-box-pack: center;
   -webkit-box-align: center;
    justify-content: center;
    align-content: center;
    align-items: center;

}
.naviBarItem:hover {
        cursor: pointer;
        color: black;
        background-color: rgb(248, 243, 116);
}
.active{
        color: black;
        background-color: rgb(248, 243, 116);
}
.icon{
        width: 28px;
        height: 28px;
        margin-right: 5px;
        vertical-align: middle;
}
.icon:hover {
        cursor: pointer;
}
.login:hover{
        cursor: pointer;
        color: rgb(248, 243, 116);
}
.icon-text{
  justify-content: center;
  align-content: center;
  align-items: center;
  font-weight:bold ;
  font-size: 20px;
}

.el-icon-search{
  margin: 10px;
}

.center-box{
  width: 100%;
      /* height: 85vh; */
  /* background: #fdfdfd; */
  background-image: url('../../../assets/images/cp_bg.png') 0 0 / cover no-repeat;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.textNavi {
        color: rgb(188, 105, 105);
        margin-bottom: 40px;
}
.textNavi:hover {
        cursor: pointer;
}
.selected-condition{
  display: none ;
}
.selected-condition-tag{
  display: none;
  margin-right: 10px;
  margin-bottom: 10px;
}
.table-head{
        font-size: 15px;
        font-weight: bold;
        color: rgb(133, 131, 131);
        margin-left: 10px;
}

.table-content{
        margin: 10px;
        color: rgb(188, 105, 105);
}
.table-content:hover{

        color:rgb(6, 45, 136);
}
.table-content.material{
  cursor:pointer;
}
.table-content.year{
  cursor:pointer;
}
.el-tag + .el-tag {
  margin-left: 10px;
}

.img-box-border {
  width: 12vw;
  height: 12vw;
  margin: 1.6vw;
  font-size: 1em;
  border: 1px solid #9d9d9d;
  border-radius: 13vw;
  padding: 1.5vh;
  margin-bottom: 40px;
}

/* @media (min-width:700px) and (max-width:900px) {
    .img-box-border {
      width: 11vw;
      height: 12vw;
      margin: 2.2vw;
      font-size: 1.5em;
      margin-bottom: 40px;
    }
  } */
.first_imgbox {
  width: 100%;
  padding: 20px;
}
.img-box:hover .img{
  transform:scale(1.3)
}
.is3D {
  z-index: 1;
  display: flex;
  width: 40px;
  height: 40px;
  /* background: #d34450; */
  background: linear-gradient(135deg, #d34450 50%, transparent 50%);
  position: absolute;
  text-decoration-line: none;
  font-weight: bold;
  color: #efebeb;
  text-align:unset;
  border-radius: 5px 0 0 0;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);

}
.img-box{
  height: 100%;
  border-radius: 13vw;
  /* z-index: -1; */
  z-index: 99;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(to top, #706e6f, #aca7a8);
}
.img-box:hover .img{
    transform:scale(1.3)
  }
.img{
  /* width: 300px;
  height: 200px; */
  border-radius: 13vh;
  transition:all .4s;
  object-fit: cover;
}

.img-text{
  display: flex;
  border-style: solid;
  border-width:0 1px 1px 1px;
  border-color: #d4d6d8;
  padding: 10px;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
}
.text{
  flex-grow: 1;
  text-align: center;
  font-size: 1.5em;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 32px;
  color:rgb(22, 16, 16);
}

.contentbox {
  /* height: 58vh; */
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  padding: 20px;
  margin: 6rch;
  /* overflow: auto; */
}

.footer{
        color: rgb(255, 255, 255);
        text-align: center;
        margin-top: 8px;
}
.info-page{
  background-color: rgb(63, 64, 65);
  height: 150px;
  width: 100%;
  padding-top: 1vh;
  font-size: 1em;
}


@media (max-width:480px) {
  .img-box-border{
    width: 25vw;
    height: 25vw;
    margin: 5vw 2.2vw;
    border: 1px solid #9d9d9d;
    border-radius: 13vw;
    padding: 1vh;
    margin-bottom: 24px;
  }
  .el-carousel__container {
    height: 180px !important;
  }
  .text {
    width: 21vw;
    margin: 20px 0;
    font-size: 0.5em;
  }
  .text:hover {
    color: #e7c37d;
  }
  .center-box {
    /* height: 85vh; */
  }
  .contentbox {
    /* height: 58vh; */
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    padding: 20px;
    margin: 0rlh;
    overflow: auto;
  }
  .navigate_box {
    height: 54px;
  }
  .info-page {
    padding-top: 3vh;
  }
  .footer {
    font-size: 0.5em;
  }
}


.el-icon-star-off,.el-icon-star-on{
        font-size: 20px;
        color: rgb(241, 235, 56);
        float: right;
        margin-right: 10px;

}
.el-icon-star-off:hover{
        cursor: pointer;
}

.text:hover{
        color:rgb(56, 47, 231);
        cursor: pointer;
}
.load-more {
  text-align: center;
  padding: 20px;
}
</style>

