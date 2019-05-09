<template>
  <div class="commodity-option" v-loading='loading'>
    <div class="phone-title"><span class="phone-name">{{form.brand}}</span>{{form.name}}</div>
    <el-form label-position="left" label-width="70px" :model="form">
      <el-form-item label="会员价">
        <div class="price">
          ￥
          <span class="price-number">{{form.price}}</span>.00
          <el-popover placement="top" trigger="hover">
            <span>在本站注册后即可成为会员哦</span>
            <el-button slot="reference" type="text" size="mini">如何成为会员？</el-button>
          </el-popover>
        </div>
      </el-form-item>
      <el-form-item label="颜色" v-if='data.colors'>
        <el-radio-group v-model="form.color" size="small" @change='changeColor'>
          <el-radio  v-for='(item,index) in data.colors' :label="item" border :key='index' >{{item}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内存" v-if='data.memorys'>
        <el-radio-group v-model="form.memory" size="small" @change='changeMemory'>
          <el-radio v-for='(item,index) in data.memorys'  border :label='item' :key='index' :disabled="memorys.indexOf(item)==-1">{{item}}g</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="数量">
        <el-input-number v-model="form.number" :min="0" :max="number" :step="1" :precision="0"></el-input-number><span class="surplus">剩余： {{number}}台</span>
      </el-form-item>

      <el-form-item label="总价格">
                <div class="price">
          ￥
          <span class="price-number">{{form.price*form.number}}</span>.00
                </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="addCart">加入购物车</el-button>
        <el-button type="primary" @click="buy">购物车结算</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { debug } from 'util';
export default {
  name: "commodityOption",
  data() {
    return {
      form: {
        name:'',
        price: 0,
        memory: "",
        number: 0,
        color: "",
        brand:''
      },
      memorys:[],
      colors:[],
      number:0,
      data:{},
      loading:false
    };
  },
  methods: {
    changeColor(color)
    {
        var memorys = []
        var config = this.data.config
        for(var n=0;n<config.length;n++)
        {
            if(config[n].color == this.form.color)
            {
              memorys.push(config[n].memory)
            }
        }
        this.memorys = memorys
        if(this.colors.indexOf(color)>-1)
        {
          this.form.memory = ''
        }       
    },
    changeMemory(memory)
    {
      var config = this.data.config
        for(var n=0;n<config.length;n++)
        {
            if(config[n].color == this.form.color && config[n].memory == memory)
            {
              this.number = config[n].number
              this.form.number=1
              this.form.price = config[n].price
              break
            }
        }      
    },    
    setData(data)
    {
      this.data = data
      this.number = data.number
      if(this.data.defaultOption)
      {
        this.setDefaultOption(this.data.defaultOption)
      }
      if(data.price)
      {
        this.form = data
        this.form.number = 0
      }
      
    },
    setDefaultOption(data)
    {
      if(data.number)
      {
      this.form.price = data.price
      this.number = data.number
      this.form.memory = data.memory
      this.form.color = data.color
      this.form.name = this.data.name 
      this.form.brand = this.data.brand
      this.form.number = 0
      this.colors = this.data.colors
      this.memorys = this.data.memorys
      this.changeColor('')
      }
      
    },
    addCart(flg) {
      if(!this.$store.state.userMsg.user)
      {
        this.$message({
          message: `请先登录哦`,
          type: "warning"
      })
      this.$router.push({ path: '/account', query: { back: 1 }});
      return
      }
      var msg;
      for (var i in this.form) {
        if (!this.form[i]) {
          if (i == "memory") {
            msg = "内存";
          } else if (i == "color") {
            msg = "颜色";
          }else if (i == "number") {
            msg = "数量";
          }
        }
      }
      if (msg) {
        this.$message({
          message: `请先选择${msg}哦`,
          type: "warning"
        });
      }

      if (!msg) {
        if (flg != "buy") {
          if(this.$store.state.userMsg.root){
            this.$message({
              message: `管理员不能购买哦`,
              type: "warning"
          })
          return            
          }
          this.loading=true
          this.$axios({   //添加到购物车
            url:'/ego/record/add',
            method:'post',
            data:{
              name: this.form.name,
              brand: this.form.brand,
              color: this.form.color,
              comment: '',
              rate: '',
              price: this.form.price,
              number: this.form.number,
              money:this.form.price*this.form.number,
              memory:this.form.memory,
              user:this.$store.state.userMsg.user,
              isArrive:false,
              time:0,
              inCart:true,
              commentTime:'',
              isSend:false,
              goodId:this.data._id
            }
          }).then(res=>{
            this.loading=false
            this.$message({
              message: res.data.msg,
              type: res.data.code==1?"success":'error'
            })
          })
        }
      }
    },
    buy() {
            if(!this.$store.state.userMsg.user)
      {
        this.$message({
          message: `请先登录哦`,
          type: "warning"
      })
      this.$router.push({ path: '/account', query: { back: 1 }});
      return
      }
      if(this.$store.state.userMsg.root)
      {
        this.$message({
          message: `管理员不能购买哦`,
          type: "warning"
      })   
      return     
      }
        this.$router.push("/personal/cart");
    }
  }
};
</script>
<style lang="scss" scoped>
.commodity-option {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.phone-title {
  font: 700 16px/1.5 \5fae\8f6f\96c5\9ed1;
  color: #222;
  word-break: break-all;
  min-height: 24px;
  margin-bottom: 10px;
}
.price-number {
  font: 700 30px Tahoma;
}
.price {
  height: 40px;
  line-height: 40px;
  font: 700 20px Tahoma;
  color: #e00;
}
.phone-title .phone-name
{
  color: #fff;
  background: #409EFF;
  padding: 2px 8px;
  font-weight: normal;
  margin-right:4px;
}
.surplus{
  padding-left: 4px;
  color: rgb(124, 121, 121)
}
</style>


