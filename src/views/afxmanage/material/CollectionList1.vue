<!-- 藏品详情页面-->
<template>
        <div class="app-container material-info" >
                <div class="container" >
                        <div>
                                <el-image
                                    style="width: 100%;border-radius: 0px;"
                                    :src="headurl"
                                >
                                </el-image>
                        </div>
                        <el-row style="margin: 2% 2% 2% 2%">
                                <span id="span" v-text="item.name" style="font-size: 35px;font-weight: bold;margin-right:20px;"></span>
                                <i class="el-icon-star-off" style="font-size: 25px; color: #ffba00">
                                        <span style="font-family: Weibei SC;">收藏({{2}})</span></i>
                                <!--item.quantity-->
                        </el-row>
                        <el-row>
                                <div style="display:flex;justify-content: center;background: linear-gradient(45deg, #767475, #797778);">
                                        <div class="collection-img" @click = "threeDimensional()">
                                                <el-image class="img"
                                                style="border-radius: 0px;"
                                                    :src="baseURL+item.photoUrl"
                                                >
                                                </el-image>
                                                <div class="collection-text">
                                                        <p class="collection-text-first"> {{selectDictLabel(dict.type.collection_material,item.material)}} {{item.name}}</p>
                                                        <p>「 年代·{{selectDictLabel(dict.type.collection_year,item.years)}} 」</p>
                                                </div>
                                        </div >

                                </div>
                        </el-row>
                        <el-row>
                                <div class="collection-info">
                                        <div id="collection-info-id">
                                                <p v-if="item.file3dObj!=null"   class="collection-info-title"  @click = "handle">3D展示</p>
                                                <!-- <p class="collection-info-title" >基本信息</p>
                                                <p class="collection-info-text" >类别：{{selectDictLabel(dict.type.collection_material,item.material)}}</p>
                                                <p class="collection-info-text" >年代：{{selectDictLabel(dict.type.collection_year,item.years)}}</p> -->
                                                <audio controls ref="audio" class="aud">
                                                        <source :src="file3dMp3" />
                                                        <!-- <source src="./ziteng.mp3" /> -->
                                                </audio>
                                                <p class="collection-info-title" >藏品介绍</p>
                                                <p class="collection-info-text" >{{item.description}} （来源：{{selectDictLabel(dict.type.collection_source,item.source)}}）</p>
                                                <!-- <p class="collection-info-text" >来源：{{selectDictLabel(dict.type.collection_source,item.source)}}</p> -->
                                        </div>
                                </div>
                        </el-row>
                        <el-row style="margin: 2% 2% 2% 2%">
                                <span id="span" style="font-size: 35px;font-weight: bold;margin-right:20px;">相关藏品</span>

                        </el-row>
                        <el-row gutter="20" style="margin: 1% 1% 1% 1%">
                                <el-col :span="6" v-for="(item,index) in this.relateList" :key="item.name" style="display: block" >
                                        <div class="img-box" style="border-radius: 0px" @click = "detail(item)">
                                                <el-image class="img_mini"
                                                    style="border-radius: 0px;"
                                                    :src="baseURL+relateList[index].photoUrl"
                                                >
                                                </el-image>
                                        </div>
                                        <span class="demonstration">{{ item.name }}</span>
                                </el-col>
                        </el-row>
                </div>
        </div>
</template>
<script>
import {listAfxCollectionByYearsAnd, getInfo, getInfoById, getInfoapi} from "@/api/afxmanage/material"
import {selectDictLabel} from "../../../utils/ruoyi";

const baseURL = process.env.VUE_APP_BASE_API;

export default {
  dicts: ['collection_category', 'collection_level', 'collection_material', 'collection_source', 'collection_year', 'collection_characteristics', 'is_in_stock', 'collection_status'],

  computed: {
                https() {
                        return https
                }
        },
        data() {
                return {
                        baseURL:baseURL,
                        id:null,
                        file3dMp3: '',
                        item :{
                          id:null,
                          name: null,
                          quantity:null,
                          material:null,
                          years:null,
                          source:null,
                          description:null,
                          photoUrl: null,
                          file3dObj:null,
                          file3dJpg:null
                        },
                        // 查询参数
                        queryParams: {
                          pageNum: 1,
                          pageSize: 10,
                          number: null,
                          name: null,
                          source: null,
                          years:null,
                          material:null,
                          description:null,
                          photoUrl:null,
                        },
                        relateList:[],
                        headurl:'https://www.jlsdmu.com/sf202312/back/picture/d71c91e2570a412ab13c8a29b2ec337b.PNG',
                        fit:"none",
                }
        },
        mounted() {
          this.$refs.audio.play();
        },
        created(){
          this.id=this.$route.query.id;
          this.getInfoById(this.id);
          this.getList();
        },
        methods:{
          selectDictLabel,
          getInfoById(id){
            getInfoapi({id:id}).then(response=>{
              this.item = response.data;
              this.file3dMp3 = 'http://localhost:25512' + response.data.file3dMp3 || ''
        //       this.file3dMp3 = baseURL + response.data.file3dMp3 || ''
            });
          },
          //查询相关藏品信息
          getList(){
            this.loading = true;
            this.queryParams.number = this.item.number;
            this.queryParams.material = this.item.material;
            this.queryParams.years = this.years;
            listAfxCollectionByYearsAnd(this.queryParams).then(response => {
              this.relateList = response.rows;
              this.loading = false
            });
          },
          handle(e) {
            console.log(e)
            window.open(this.$router.resolve({ name: '/index/CollectionList', query: {  id: this.item.id } }).href, '_blank');
            //this.$router.push('/home');
          },
          detail(item){
              console.log("调用了跳转方法");
              this.item = item;
              this.getList()
              window.scrollTo({
                top: 0,
                behavior: "instant"
              });
          },
          threeDimensional(){
            console.log("----");
            window.open(this.$router.resolve({ name: '/index/CollectionList' , query: {  id: this.item.id }}).href, '_blank');
          }

        }
}
</script>

<style>
.material-info{
        background:url("/img/category_background.jpg");
        background-size: 100% 100%;
        overflow: auto;
        font-family: Weibei SC;
}
.container{
        /* width: 1610px; */
        height: 100%;
        margin:0 auto;
        /*margin-left: 15%;
        //margin-right: 15%;*/
        /* background-color: #ffffff; */ 

}
el-row {
        margin: 2%;
}
.collection-img:hover .img{
  transform:scale(1.3)
}
.collection-img{
        position: relative;
        overflow: hidden;
        margin-left: 2%;
        margin-right: 1%;

}
.collection-text{
        position: absolute;
        top: 30px;
        text-orientation: upright;
        writing-mode: vertical-rl;
        color: #fff;
        font-size: 24px;
        text-shadow: 2px 2px 3px #fff;
}
.collection-text-first {
        margin-top: 52px;
}
.collection-info{
        width: 100%;
        background-color: #f6f1f1;
}
.collection-info-title{
        font-size: 25px;
        font-weight: bold;
}
.collection-info-text{
        font-size: 20px;
}
#collection-info-id{
        /* margin: 2%; */
        padding: 15px;
        background-image: url('../../../assets/images/cp_bg.png');
}
.img-box:hover .img{
  transform:scale(1.3)
}
.img-box{
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        background-color: #e4e4e4;
}
.img{
        width: 800px;
        height: 500px;
        transition:all .6s;
}
.img_mini{
        width: 800px;
        height: 400px;
        transition:all .6s;
}
.demonstration{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 5%;
        margin-bottom: 5%;
        font-size: 20px;
        font-weight: bold;
}
/* 默认样式，适用于手机端 */
/* .element {
        width: 800px;height: 540px
} */
 
/* 当屏幕宽度大于或等于768px时，适用于PC端 */
@media (max-width:480px) {
  .img {
        width: 100%;
        height: 240px;
  }
  .collection-text{
        position: absolute;
        top: 20px;
        left: 10px;
        height: 20px;
        line-height: 13px;
        text-orientation: inherit;
        writing-mode: rl;
        color: #fff;
        font-size: 0.8em;
        text-shadow: 2px 2px 3px #fff;
}
        .collection-text-first {
                margin-top: 0px;
        }
        #span {
                font-size: 1.5em !important;
        }
        .el-icon-star-off {
                font-size: 1.5em !important;
        }
        .collection-info-title {
                margin: 5px;
                font-size: 1.2em !important;
        }
        .collection-info-text{
                margin: 0px;
                font-size: 0.8em;
        }
        .img_mini{
                height: 66px;
        }
        .demonstration {
                font-size: 0.8em;
        }
}
</style>
