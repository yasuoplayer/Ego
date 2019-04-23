<template>
    <div class="detail">
        <div class="base">
            <vue-photo-zoom-pro class="img" :scale='1.5'   :url="img"></vue-photo-zoom-pro >
            <commodityOption :id="id"/>
        </div>
        <phoneParameter/>
        
    </div>
</template>
<script>
import vue from 'vue'
import VuePhotoZoomPro from 'vue-photo-zoom-pro'
import commodityOption from './components/commodity-option'
import phoneParameter from './components/phone-parameter'
vue.use(VuePhotoZoomPro)
var img = require('./imgs/phone1.png')
export default {
    name:"detail",
    data()
    {
        return {
            img,
            id:''
        }
    },
    components:{
        commodityOption,
        phoneParameter
    },
    mounted()
    {
        this.id = this.$route.params.id
    }
    
}
</script>
<style lang="scss" scoped>
.base{
    display: flex;
}
.detail{
    padding: 10px 10%
}
.img{
    width: 500px;
    height: 500px;
}
</style>


