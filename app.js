const API_URL = "https://fakestoreapi.com";

Vue.component("product", {
    props: ["item", "cart"],
    template:`
    <div class="item">
        <img :src="item.image">
        <div class="item-info">
            <h1> {{ item.title }} </h1>
            <p> {{ item.description }} </p>
            <i> \${{ item.price }} </i>
            <button @click="addToCart()" class="add-cart">Add to cart</button>
        </div>
    </div>
    `,
    methods: {
        addToCart: function () {
            this.cart.push(this.item);
        }
    }
})

var app = new Vue({
    el: "#app",
    data: {
        products: [],
        cart: [],
        currentPage: 1,
    },
    created: async function () {
        const response = await fetch(API_URL + "/products")
        const data = await response.json();
        this.products = data;
    }
});