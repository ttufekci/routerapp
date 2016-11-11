var bus = new Vue();

var productlistdata = {
    message: 'Ürün Listesi',
    totalprice: 0,
    productlistarr : [
            {name: 'klavye', unitprice: 20, price: 0, quantity: 0},
            {name: 'mouse', unitprice: 10, price: 0, quantity: 0},
            {name: 'monitor', unitprice: 150, price: 0, quantity: 0}
    ]
};

var productlist = Vue.component('productlist', {
  props: ['productlist'],  
  template: '#productlisttemp',
  data: function () {
      return productlistdata; 
  },
  methods: {
    keyup: function (index, event) {
      var dataItem = this.productlistarr[index];
      var unitprice = dataItem.unitprice;
      var quantity = dataItem.quantity;
      dataItem.price = unitprice * quantity;
      console.log(dataItem.unitprice);

      var totalPriceCalc = 0;    

      for (i = 0; i < this.productlistarr.length; i++) { 
          totalPriceCalc += this.productlistarr[i].price;
      }
      console.log(totalPriceCalc);

      this.totalprice = totalPriceCalc;

      app.$emit('totalpricechanged',this.totalprice);

      console.log('emit called');
    },
    routetopayment: function () {
      router.push({name: 'payment'});
    },
    gettotalprice: function () {
      return this.totalprice;
    }
  }
});

var paymentData = {
    message: 'Ödeme',
    kredikartinfo: {
      no: '',
      gecerlilik: '',
      turu: ''
    }
};

var payment = Vue.component('payment', {
  props: ['price'],  
  template: '#paymenttemp',
  data: function () {
    return paymentData;
  },
  methods: {
    routetoprodlist: function () {
      router.push({name: 'prodlist'});
    },
    routetoshipment: function () {
      router.push({name: 'shipment'});
    }    
  }
});

var shipmentData = {
  message: 'Kargo',
  kargo: '',
  adres: ''
}

var shipment = Vue.component('shipment', {
  props: ['price'],
  template: '#shipmenttemp',
  data: function () {
    return shipmentData;
  },
  methods: {
    routetopayment: function () {
      router.push({name: 'payment'});
    },
    routetoapprovement: function () {
      router.push({name: 'approvement'});
    }    
  }
});

var approvementData = {
  message: 'Onaylama'
};

var approvement = Vue.component('approvement', {
  props: ['price'],
  template: '#approvementtemp',
  data: function () {
    return approvementData;
  },
  methods: {
    routetoshipment: function () {
      router.push({name: 'approvement'});
    }
  }
});

const routes = [
  { path: '/prodlist', name: 'prodlist', component: productlist },
  { path: '/payment', name: 'payment', component: payment},
  { path: '/shipment', name: 'shipment', component: shipment},
  { path: '/approvement', name: 'approvement', component: approvement}
];

const router = new VueRouter({
  routes // short for routes: routes
});

var app = new Vue({
    el: '#app',
    router,
    data: {
      totalprice:0
    },
    methods: {
      totalpricechanged: function (totalprice) {
        this.totalprice = totalprice;
      }
    }   
});

app.$on('totalpricechanged',function(totalprice) {
  app.totalpricechanged(totalprice);
});

router.push({name: 'prodlist'});

//console.log(productlist.gettotalprice());

