<template>
    <div class="nav-breadcrumb-wrap">
        <div class="container">
            <nav class="nav-breadcrumb">
            <router-link :to="{name: 'GoodsList'}">
                Home
            </router-link>
            <slot name="bread"></slot>
            </nav>
        </div>
    </div>    
</template>

<style scope>
  .bread{
      height: 45px;
      line-height: 45px;
      background-color: #f0f0f0;
  }
  .bread-wrap{
      padding: 0 10px;
      font-size: 14px;
      color: #a1a1a1;
  }
  .bread-wrap a{
    position: relative;
      margin-right: 20px;
  }
  .bread-wrap a:after{
      position: absolute;
      top: 0px;
      content:'/';
      height:20px;
      line-height: 20px;
  }
  .bread-wrap span{
      color:#d1434a;
  }    
</style>

<script>
    export default {
        data(){
            return {
                msg: "面包屑组件"
            }
        }
    }
</script>