
<template>
  <div>
  <div class="collection-text">
    <p style="margin-top: 52px">{{selectDictLabel(dict.type.collection_material,material)}}·{{name}}</p>
    <p>「 年代·{{selectDictLabel(dict.type.collection_year,years)}} 」</p>
  </div>
  <div class="collection-music">
    <audio controls ref="audio" class="aud">
      <source :src="file3dMp3" />
      <!-- <source src="./ziteng.mp3" /> -->
    </audio>
  </div>
  <div id="three-canvas"></div>
  </div>

</template>
<script>
import {getInfo, getInfoapi, listAfxCollectionByYearsAnd} from "@/api/afxmanage/material"
import {AmbientLight, Color, PerspectiveCamera, Scene,MeshBasicMaterial, TextureLoader,Mesh,ImageUtils,MeshPhongMaterial,Vector3, WebGLRenderer} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader.js";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader.js";
import {selectDictLabel} from "../../../utils/ruoyi";
import  JSZip from 'jszip';
const baseURL = process.env.VUE_APP_BASE_API;
export default {
  dicts: ['collection_category', 'collection_level', 'collection_material', 'collection_source', 'collection_year', 'collection_characteristics', 'is_in_stock', 'collection_status'],
  name: "index",
  data() {
    return {
      baseURL:"https://szbwggl.liushaotou.ltd/prod-api/",
      camera: null,  //相机对象
      scene: null,  //场景对象
      renderer: null,  //渲染器对象
      mesh: null,  //网格模型对象Mesh
      file3dObj:null,//3d文件
      file3dJpg:null,//3D贴图
      file3dTion:null,//3D贴图
      name:"",
      years:"",
      material:"",
      file3dMp3:""
    }
  },

  mounted() {
    this.init()
    this.$nextTick(() => {
      this.createModel()
    })
    this.file3dMp3 = this.baseURL+this.$route.query.file3dMp3
    // let music1 = new Audio();
    //   music1 = require("./ziteng.mp3");
    //   this.$refs.audio.src = music1;
      this.$refs.audio.play();
  },
  methods: {
    selectDictLabel,
    createModel(){
      let tht = this

      const onProgress = function (xhr) {
        if(xhr.lengthComputable){
          const percentComplete = xhr.loaded / xhr.total * 100
          console.log( Math.round( percentComplete, 2 ) + '% downloaded' )
        }
      }
      let id =this.$route.query.id;
      getInfoapi({id:id}).then(async response => {
        tht.file3dObj = response.data.file3dObj;
        tht.file3dJpg = response.data.file3dJpg;
        tht.file3dTion = response.data.file3dTion;
        tht.name = response.data.name;
        tht.years = response.data.years;
        tht.material = response.data.material;
        console.log(tht.baseURL)
        console.log(tht.file3dJpg)
        console.log(tht.file3dObj)
        const zip = new JSZip();
        const responsezip = await fetch(tht.baseURL + tht.file3dObj.slice(0, -4) + ".zip");
        const arrayBuffer = await responsezip.arrayBuffer();
        await zip.loadAsync(arrayBuffer);
        const objEntry = zip.file(/.*\.obj$/i)[0];
        const objContent = await objEntry.async("text"); // 获取 OBJ 文件内容。
        let materials= new MTLLoader().parse(objContent);
          console.log("MTLLoader", materials)
          materials.preload()
        let obj= new OBJLoader().parse(objContent);
            obj.position.set(0, 0, 0)
            obj.scale.set(tht.file3dTion, tht.file3dTion, tht.file3dTion)
            const texture = new TextureLoader().load(tht.baseURL + tht.file3dJpg);

              obj.traverse(function (child) {
                if (child instanceof Mesh) {
                  //设置模型皮肤
                  child.material = new MeshBasicMaterial({
                    map: texture
                  });
                }
              });
            tht.scene.add(obj)
          }, onProgress)



    },
    init(){
            let container = document.getElementById('three-canvas')
            this.renderer = new WebGLRenderer({
              //开启抗锯齿
              antialias: true
            })
            //将渲染器挂载到dom
            container.appendChild(this.renderer.domElement)
            this.renderer.setSize(container.offsetWidth, container.offsetHeight, true)
            //实例化场景
            this.scene = new Scene()
            this.scene.background = new Color('#2f3031')
            //实例化相机
            this.camera = new PerspectiveCamera(45,container.offsetWidth / container.offsetHeight, 1, 1000)
            //设置相机位置
            this.camera.position.set(50,50,50)
            //设置相机看先中心点
            this.camera.lookAt(new Vector3(0,0,0))
            //设置相机自身方向
            this.camera.up = new Vector3(0,1,0)
            //初始化轨道控制器
            /*let orbitControls = new OrbitControls(this.camera,this.renderer.domElement)
            //设置鼠标功能键
            orbitControls.mouseButtons = {
                //左键无功能
                LEFT: null,
                //中键缩放
                MIDDLE: MOUSE.DOLLY,
                //右键旋转
                RIGHT: MOUSE.ROTATE
            }*/
            // 添加轨道控制器
            let orbitControls = new OrbitControls(this.camera,this.renderer.domElement);
            // 设置带阻尼的惯性
            orbitControls.enableDamping = true;
            // 设置阻尼的系数
            orbitControls.dampingFactor = 0.05;
            // 设置自动旋转
            orbitControls.autoRotate = true;

            //添加环境光
            const ambientLight = new AmbientLight('rgb(227,223,223)', 1)
            // //半球光
            // const hemisphereLight = new HemisphereLight(0xE3DFDFFF, 0xE3DFDFFF, 1); // 天空光的颜色、地面光的颜色和强度
            // hemisphereLight.position.set(0, 100, 0); // 设置光源位置
            // this.scene.add(hemisphereLight);

            this.scene.add(ambientLight)
            let animate = () => {
                //跟新渲染页面
                orbitControls.update();
                this.renderer.render(this.scene,this.camera)
                requestAnimationFrame(animate)
            }
            animate()
        }
    }
}
</script>

<style scoped>
#three-canvas {
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
.collection-text{
  position: absolute;
  top: 30px;
  text-orientation: upright;  writing-mode: vertical-rl;
  color: #000;
  font-size: 24px;
  text-shadow: 2px 2px 3px #fff;
}
.collection-music {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%);
}
@media (max-width:480px) {
  .collection-music {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translate(-50%);
  }
  .collection-text {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translate(-50%);
    font-size: 20px;
    text-align: center;
    writing-mode: lr;
  }
}

</style>

