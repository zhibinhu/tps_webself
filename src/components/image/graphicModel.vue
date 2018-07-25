<template>
  <div>
    <div id="r" :style="{ backgroundColor: 'rgb(0, 0, 0)', width: styleW + 'px', height: styleH + 'px', margin: '0 auto' }"></div>
  </div>
</template>
<script type="text/javascript">
  import {mapState} from 'vuex'
  import {http,isDev} from '../../resources'
  export default {
    props:['styleW','styleH'],
    data () {
      return {
        renderer: ''
      }
    },
    mounted(){
      this.runContainer();
    },
    watch: {
//      storeOrganType(val) {
//        console.log('valvalval',val)
//        this.runContainer();
//      }
    },
    methods:{
      runContainer() {
        let type = this.storeOrganType
        let renderer = this.renderer
        renderer && renderer.destroy()
        $('#r').html('')
        renderer = new X.renderer3D();
        renderer.container = 'r';
        renderer.init();
        var organNames = new X.object();
        var elementNames = new X.mesh();
//        elementNames.file =  'static/js/threeJS/vtk/triangle.vtk';
        let vtkID = this.$route.params.id
        http.get('/download/vtk?id=' + vtkID + '&type=' + type).then((res)=>{
          if(res.data.code == '200') {
            try{
              let url = res.data.filePath.replace(/\/tps-server/,'')
              if(isDev) url ='/v.api'+ url
              elementNames.file = url;
//        elementNames.file =  'http://x.babymri.org/?avf.vtk';
//              elementNames.opacity = 0.9;
//              organNames.color = [0.8, 0.8, 0.8];
              organNames.children.push(elementNames);
              renderer.add(elementNames);
              renderer.camera.up = [0, 0, 1];
              renderer.camera.position = [300, 0, 0];
              renderer.render();

            } catch (e) {
              console.log('eeeee',e)
              alert('网络发生错误，请稍后再试！')
            }

          } else{
            alert('vtk文件未生成！')
            return false
          }
        })
      }
    },
    computed: {
      ...mapState(['storeOrganType']),

    }
  }
</script>
<style>

</style>
