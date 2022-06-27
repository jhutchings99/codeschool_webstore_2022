const API_URL = "https://fakestoreapi.com";

var app = new Vue({
    el: "#app",
    data: {
        products: [],
    },
    created: async function () {
        const response = await fetch(API_URL + "/products")
        const data = await response.json();
        this.products = data;
    }
});