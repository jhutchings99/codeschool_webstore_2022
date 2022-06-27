const API_URL = "https://fakestoreapi.com";

var app = new Vue({
    el: "#app",
    data: {
        products: [],
        currentPage: 1,
    },
    created: async function () {
        const response = await fetch(API_URL + "/products")
        const data = await response.json();
        this.products = data;
    }
});