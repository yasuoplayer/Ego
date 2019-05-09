<template>
    <el-dialog
  title="修改订单"
  :visible.sync="dialogVisible"
  v-loading='loading'
  >
    <el-form label-position="left" label-width="70px" :model="formData">
        <el-form-item label="商品名称">
            <el-input v-model="formData.name" disabled></el-input>
        </el-form-item>        
      <el-form-item label="会员价">
        <div class="price">
          ￥
          <span class="price-number">{{formData.price*formData.number}}</span>.00
        </div>
      </el-form-item>
      <el-form-item label="颜色" v-if="data.colors&&data.colors.length">
        <el-radio-group v-model="formData.color" size="small" @change='changeColor'>
          <el-radio  v-for='(item,index) in data.colors' :key='index' :label="item" border >{{item}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内存" v-if="data.memorys&&data.memorys.length">
        <el-radio-group v-model="formData.memory" size="small" @change='changeMemory'>
          <el-radio v-for='(item,index) in data.memorys' :key='index'   :label="item" border :disabled="memorys.indexOf(item)==-1">{{item}}g</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="数量">
        <el-input-number v-model="formData.number" :min="0" :max="number" :step="1" :precision="0"></el-input-number><span class="surplus">剩余： {{number}}台</span>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="comfirmForm">确 定</el-button>
  </span>
</el-dialog>
</template>
<script>
export default {
    name:'modifyDialog',
    data()
    {
        return {
            dialogVisible:false,
            formData:{},
            number:1,
            data:{},
            memorys:[],
            loading:false
        }
    },
    methods:{
    changeColor(color)
    {
        var memorys = []
        var config = this.data.config
        if(!config) return
        for(var n=0;n<config.length;n++)
        {
            if(config[n].color == this.formData.color)
            {
              memorys.push(config[n].memory)
            }
        }
        this.memorys = memorys
        if(this.data.colors.indexOf(color)!=-1)
        {
          this.formData.memory = '' 
          this.formData.number=0
        }
    },
    changeMemory(memory)
    {
      var config = this.data.config
      if(!config) return
        for(var n=0;n<config.length;n++)
        {
            if(config[n].color == this.formData.color && config[n].memory == memory)
            {
              this.number = config[n].number
              this.formData.number=0
              this.formData.price=config[n].price
              break
            }
        }      
    },
    getData(_id,isPhone)
    {
      this.loading=true
        this.$axios({
          url:'/ego/good/findById',
          method:'get',
          params:{
            _id,
            isPhone
          }
        }).then(res=>{
            this.data = res.data.data
            if(!this.data.config)
            {
              this.number = res.data.data.number
            }
            else{
              for (let i = 0; i < this.data.config.length; i++) {
                const item = this.data.config[i];
                if(item.color==this.formData.color&&this.formData.memory==item.memory)
                {
                  this.number=item.number
                  break
                }
              }
            }
            this.handleData(this.data)
            this.changeColor('')
            this.loading=false
        })
    },
    handleData(data)
    {
            var colors =[]
            var memorys =[]
            var config = data.config
            if(config)
            {
              for(var n=0;n<config.length;n++)
              {
                  if(colors.indexOf(config[n].color)==-1)
                  {
                      colors.push(config[n].color)
                  }
                  if(memorys.indexOf(config[n].memory)==-1)
                  {
                      memorys.push(config[n].memory)
                  }           
              }
            }
            data.memorys = memorys
            data.colors = colors
    },
        controlDialog(obj)
        {
            this.dialogVisible = obj.flag
            this.formData = {...obj.data}
            if(obj.data.color)
            {
              this.getData(obj.data.goodId,1)
            }
            else{
                this.getData(obj.data.goodId,0)
            }    
        },
                cancel(){
            this.dialogVisible = false
            this.formData = {}
        },
        comfirmForm()
        {
          this.formData.money = this.formData.number * this.formData.price
          this.loading=true
          // console.log(this.formData)
          this.$axios({
            url:'/ego/record/changeCart',
            method:'post',
            data:this.formData
          }).then(res=>{
            if(res.data.code)
            {
              this.loading=false
              this.$message({
                  message:'修改成功',
                  type:'success'
              })
              this.$emit('update')
              this.dialogVisible = false
            }
          })
        }
    }
}
</script>
<style lang="scss" scoped>
.surplus{
  padding-left: 4px;
}
</style>



