<template>
    <div>
      <nav-header></nav-header>
      <div class="container">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>Confirm</span> address</li>
            <li class="cur"><span>View your</span> order</li>
            <li class="cur"><span>Make</span> payment</li>
            <li class="cur"><span>Order</span> confirmation</li>
          </ul>
        </div>

        <div class="order-create">
          <div class="order-create-pic"><img :src="STATIC_FILE_URL_PREFIX + '/ok-2.png'" alt=""></div>
          <div class="order-create-main">
            <h3>Congratulations! <br>Your order is under processing!</h3>
            <p>
              <span>Order ID：{{orderId}}</span>
              <span>Order total：{{orderTotal|currency('$')}}</span>
            </p>
            <div class="order-create-btn-wrap">
              <div class="btn-l-wrap">
                <router-link class="btn btn--m" :to="{name: 'Cart'}">Cart List</router-link>
              </div>
              <div class="btn-r-wrap">
                <router-link class="btn btn--m" :to="{name: 'GoodsList'}">Goods List</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav-footer></nav-footer>
    </div>
</template>
<script>
    import NavHeader from '@/components/Header';
    import NavFooter from '@/components/Footer';
    import NavBread from '@/components/Bread';
    import axios from '@/axios';
    import {STATIC_FILE_URL_PREFIX} from '@/config';
    export default{
        data(){
            return{
                STATIC_FILE_URL_PREFIX,
                orderId:'',
                orderTotal:0
            }
        },
        components:{
          NavHeader,
          NavFooter,
          NavBread
        },
        mounted() {
            let orderId = this.$route.query.orderId;
            if(!orderId){
                return;
            }
            axios.get("/users/orderDetail", {
                params: {
                    orderId
                }
            }).then((response)=>{
                let res = response.data;
                if(0 == res.code){
                    this.orderId = orderId;
                    this.orderTotal = res.data.orderTotal;
                }
            });
        },        
    }
</script>
