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
          <a @click="sortGoods" href="javascript:void(0)" class="price">
            Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}"
                     @click="priceChecked=all">All</a></dd>
              <dd v-for="(price,index) in priceFilter">
                <a href="javascript:void(0)" @click="setPriceFilter(index)"
                   v-bind:class="{'cur':priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.prodcutPrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                加载中...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <nav-footer></nav-footer>

  </div>
</template>
<script>
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import './../assets/css/login.css'
  import './../assets/css/checkout.css'
  import NavHeader from '@/components/Header.vue'
  import NavFooter from '@/components/Footer.vue'
  import NavBread from '@/components/NavBread.vue'
  import axios from 'axios'

  export default{
    data(){
      return {
        goodsList: [],
        sortFlag: true,
        page: 1,
        pageSize: 8,

        busy: true,

        priceFilter: [
          {
            startPrice: '0.00',
            endPrice: '500.00'
          },
          {
            startPrice: '500.00',
            endPrice: '1000.00'
          },
          {
            startPrice: '1000.00',
            endPrice: '2000.00'
          }
        ],
        priceChecked: 'all',
        filterBy: false,
        overLayFlag: false
      }
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread
    },
    mounted: function () {
      this.getGoodsList()
    },
    methods: {
      getGoodsList(flag){
        let param = {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sortFlag ? 1 : -1
        }
        axios.get("http://localhost:3000/goods", {params: param}).then((resp) => {
          let res = resp.data;
          if (res.status == '0') {
            if (flag) {
              this.goodsList = this.goodsList.concat(res.result.list)

              if(res.result.count==0){
                  this.busy = true;
              }else{
                  this.busy = false;
              }
            }else{
              this.goodsList = res.result.list;
              this.busy = false;
            }
          } else {
            this.goodsList = []
          }

        })
      },

      sortGoods(){
        this.sortFlag = !this.sortFlag
        this.page = 1;
        this.getGoodsList();
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
        this.closePop()
      },

      loadMore(){
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.getGoodsList(true)
        }, 500)

      },
    }
  }
</script>
<style>
  .load-more{
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
</style>
