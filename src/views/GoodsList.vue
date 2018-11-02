<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span slot="bread">Goods</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
        <div class="container">
            <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" v-bind:class="{'sort-up': sortFlag}" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
            </div>
            <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show': filterBy}">
                <dl class="filter-price">
                <dt>Price:</dt>
                <dd>
                    <a href="javascript:void(0)" v-bind:class="{cur: 'all'==priceChecked}" @click="priceChecked='all';getGoodsList()">All</a>
                </dd>
                <dd v-for="(item,index) in priceFilter" @click="setPriceFilter(index)">
                    <a href="javascript:void(0)" v-bind:class="{cur: index==priceChecked}">{{item.startPrice}} - {{item.endPrice}}</a>
                </dd>
                </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
                <div class="accessory-list col-4">
                    <ul>
                        <li v-for="(item, index) in goodsList">
                            <div class="pic">
                                <!--<a href="#"><img v-bind:src="item.prodcutImage" alt=""></a>-->
                                <a href="#"><img v-lazy="STATIC_FILE_URL_PREFIX + '/'+item.productImage" alt=""></a>
                            </div>
                            <div class="main">
                                <div class="name">{{item.productName}}</div>
                                <div class="price">{{item.salePrice}}</div>
                                <div class="btn-area">
                                <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                                </div>
                            </div>
                        </li>
                    </ul>             
                </div>
                <div class="view-more-normal"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="busy"
                    infinite-scroll-distance="20">
                    <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
                </div>                
            </div>
            </div>
        </div>
        </div>  
        <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
        <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
            <p slot="message">
                {{notice}}
            </p>
            <div slot="btnGroup">
                <a class="btn btn--m" href="javascript:void();" @click="mdShow=false">关闭</a>
            </div>
        </modal>
        <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
            <p slot="message">
                <svg class="icon-status-ok">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
                </svg>
                <span>{{notice}}</span>
            </p>
            <div slot="btnGroup">
                <a class="btn btn--m" href="javascript:void();" @click="mdShowCart = false">继续购物</a>
                <router-link class="btn btn--m btn--red" href="javascript:;" :to="{name: 'Cart'}">查看购物车</router-link>
            </div>
        </modal>        
        <nav-footer></nav-footer>
    </div>
</template>

<style scope>

</style>

<script>
    import NavHeader from '@/components/Header';
    import NavFooter from '@/components/Footer';
    import NavBread from '@/components/Bread';
    import Modal from '@/components/Modal';
    import axios from '@/axios';
    import {STATIC_FILE_URL_PREFIX} from '@/config';
    export default {
        data(){
            return {
                STATIC_FILE_URL_PREFIX,
                msg: "商品列表页面",
                goodsList: [],
                priceFilter:[
                    {
                        startPrice: "0.00",
                        endPrice: "100.00",
                    },                    
                    {
                        startPrice: "100.00",
                        endPrice: "500.00",
                    },
                    {
                        startPrice: "500.00",
                        endPrice: "1000.00",
                    },             
                    {
                        startPrice: "1000.00",
                        endPrice: "2000.00",
                    },                                        
                ],
                priceChecked: "all",
                filterBy:false,
                overLayFlag: false,
                sortFlag: true,
                page: 1,
                pageSize: 8,
                busy: true,
                loading: false,
                mdShow: false,
                mdShowCart: false,
                notice: '',
            }
        },
        components: {
            NavHeader,
            NavFooter,
            NavBread,
            Modal,
        },
        mounted(){
            this.getGoodsList();
        },
        methods: {
            getGoodsList(isLoadMoreFlag){
                let params = {
                    page: this.page,
                    pageSize: this.pageSize,
                    sort: this.sortFlag?1:-1,
                    priceLevel: this.priceChecked,
                };
                this.loading = true;
                axios.get('/goods/list', {
                    params: params,
                }).then((response)=>{
                    let res = response.data;
                    this.loading = false;
                    if(0 == res.code){
                        if(isLoadMoreFlag){
                            this.goodsList = this.goodsList.concat(res.data);
                            if(0 == res.count){
                                this.busy = true;
                            }else{
                                this.busy = false;
                            }
                        }else{
                            this.goodsList = res.data;
                            this.busy = false;
                        }
                    }
                });
            },
            showFilterPop(){
                this.filterBy = true;
                this.overLayFlag = true;
            },
            closePop(){
                this.filterBy = false;
                this.overLayFlag = false;
            },
            setPriceFilter(index){
                this.priceChecked = index;
                this.page = 1;
                this.getGoodsList();
                this.closePop();
            },
            sortGoods(){
                this.sortFlag = !this.sortFlag;
                this.page = 1;
                this.getGoodsList();
            },
            loadMore(){
                this.busy = true;
                setTimeout(() => {
                    this.page++;
                    this.getGoodsList(true);                    
                }, 500);                
            },
            addCart(productId){
                axios.post("/goods/addCart",{
                    productId
                }).then((response)=>{
                    let res = response.data;
                    if(0 == res.code){
                        this.mdShowCart = true;
                        this.notice = res.msg;             
                        this.$store.commit("updateCartCount", 1);           
                    }else{
                        this.mdShow = true;
                        this.notice = res.msg;
                    }
                });
            },
            closeModal(){
                this.mdShow = false;
                this.mdShowCart = false;
            }
        }
    }
</script>