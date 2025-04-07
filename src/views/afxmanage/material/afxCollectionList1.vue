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
  <div class="navigate_box" >
  </div>

        <!--  -->
        <div class="center-box">
                <div>
<!--                    <el-row>
                            <el-col>
                                    <el-image style="width: 100%; margin-bottom: 20px;"
                                    :src="headurl"> </el-image>
                            </el-col>
                    </el-row>-->
                    <div style="padding-left: 25px; padding-right: 25px; ">
                        <el-row  class="textNavi">首页>>藏品>>文物藏品</el-row>
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

                        </div>
                          <div style="display: flex; flex-wrap: wrap;justify-content: flex-start">
                                  <div v-for="(item,index) in infoList" :key="index"  class="img-box-border"  >
                                    <u v-if="item.file3dObj!=null" class="is3D">3D</u>
                                    <div class="img-box" @click = "detail(item.id)">
                                      <el-image class="img" :src="baseURL+infoList[index].photoUrl"></el-image>
                                    </div>
                                    <div class="img-text">
                                        <span class="text"> {{ infoList[index].name }} </span>
                                      <i ref="icon_off" class="el-icon-star-off" @click="change1(index)" style="display: block;"></i>
                                      <i ref="icon_on" class="el-icon-star-on" @click="change2(index)" style="display: none;"></i>
                                    </div>
                                  </div>
                          </div>
                    </div>
                </div>
        </div>

        <!-- 底部 -->
        <div class="info-page" ref="loadMore">
                <el-row>
                        <el-col :span="8" class="footer">
                                <el-row>友情链接</el-row>
                                <el-row>国家文物局</el-row>
                                <el-row>安福县博物馆</el-row>
                        </el-col>
                        <el-col :span="8" class="footer">
                                <el-row>主办：安福县博物馆 </el-row>
                                <el-row>地址：吉安市安福县平都镇文庙路59号</el-row>
                                <el-row>Copyright © 2024 安福县博物馆版权所有</el-row>
                        </el-col>
                        <el-col :span="8" class="footer">
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
import {listAfxCollectionCategory,} from "@/api/afxmanage/material"
import axios from "axios";


const baseURL = process.env.VUE_APP_BASE_API;
//相关藏品信息

export default {
        dicts: ['collection_category', 'collection_level', 'collection_material', 'collection_source', 'collection_year', 'collection_characteristics', 'is_in_stock', 'collection_status'],

        data() {
                return {
                        totalWatch:12345,
                        searchContent: '',
                        activeIndex: 3,
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
                }
        },
        mounted() {
        },
        created() {
          // 初始加载数据
          this.loadMoreData();
          this.getList();
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
          goToUrl(url) {
            window.location.href = url;
          },
          async loadMoreData() {
            if (this.loading || this.noMoreData) return;

            this.loading = true;

            try {
              this.queryParams.pageNum = this.page;
              this.queryParams.pageSize = this.pageSize;
              // 发送请求获取数据
              const newData = await  listAfxCollectionCategory(this.queryParams).then(response => {
                return response.rows;
              });

              // 判断是否还有更多数据
              if (newData.length < this.pageSize) {
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
            if (this.queryParams.name) {
              this.$refs.selected_condition.style.display = "block";
              this.dynamicTags[2] = "名称: " + name;
              this.$refs.el_tag[2].style.display = "block";
              this.getList(this.queryParams);
            }else{
              this.$message.error('藏品名称不能为空');
            }
          },
          detail(id){
                  this.$router.push({ name: '/index/afxmanage', query: {id:id}});
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
  background-color: #eeeeee;
  font-family: Weibei SC;
}
.navigate_box{
    position: relative;
    display: flex;
    justify-content: center;
    height: 150px;
    background: url('/img/navi_background.png')  center no-repeat;
    margin-left: auto;
    margin-right: auto;
    background-size: cover;
}
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
  width: 1300px;
  background: #fdfdfd;
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

.img-box-border{
  position: relative;
  margin: 6px;
}
.img-box:hover .img{
  transform:scale(1.3)
}
.is3D {
  z-index: 1;
  display: flex;
  width: 40px;
  height: 40px;
  //background: #d34450;
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
  z-index: -1;
  display: flex;
  //justify-content: center;
  //align-items: center;
  overflow: hidden;
  border-radius: 2% 2% 0 0 ;
  background-color: #e4e4e4;
}
.img{
  width: 300px;
  height: 200px;
  transition:all .4s;
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
  color:rgb(22, 16, 16);
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
.footer{
        color: rgb(255, 255, 255);
        text-align: center;
        margin-top: 50px;
}
.info-page{
  background-color: rgb(63, 64, 65);
  height: 200px;
  width: 100%;
}
.load-more {
  text-align: center;
  padding: 20px;
}
</style>
