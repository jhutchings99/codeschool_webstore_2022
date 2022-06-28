const API_URL = "https://fakestoreapi.com";

Vue.component("product", {
    props: ["item", "cart", "loginstatus"],
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
            if (this.loginstatus) {
                this.cart.push(this.item);
                alert(`Successfully added ${this.item.title} to cart`)
            } else {
                alert("Not logged in")
            }
        }
    }
})

Vue.component("cart-product", {
    props: ["item", "cart"],
    template:`
    <div class="item">
    <img :src="item.image">
        <div class="item-info">
            <h1> {{ item.title }} </h1>
            <p> {{ item.description }} </p>
            <i> \${{ item.price }} </i>
            <button @click="removeFromCart()" class="add-cart">Remove from cart</button>
        </div>
    </div>
    `,
    methods: {
        removeFromCart: function () {
            console.log(this.item.price)
            this.cart.splice(this.cart.indexOf(this.item), 1)
        }
    }
})

var app = new Vue({
    el: "#app",
    data: {
        products: [],
        cart: [],
        currentPage: 1,
        searchInput: "",
        loggedIn: false,
        usernameInput: "",
        passwordInput: "",
    },
    methods: {
        login: function () {
            if (this.loggedIn){
                alert("Already logged in")
                this.currentPage = 2;
            } 
            else if (this.usernameInput && this.passwordInput) {
                this.loggedIn = true;
                alert("Successfully logged in");
                this.currentPage = 2;
            } else {
                alert("Error logging in: Must enter a username and password");
            }
        },
        logout: function () {
            if (!this.loggedIn) {
                alert("Already logged out")
            } else {
                loggedIn = false;
                alert("Logged out")
            }
        },
    },
    computed: {
        filteredItems: function () {
            var productsCopy = [...this.products];
            var searchString = this.searchInput;

            searchString = searchString.trim().toLowerCase();
            productsCopy = productsCopy.filter((product) => {
                // filter by title
                if (product.title.toLowerCase().indexOf(searchString) != -1) {
                    return product
                }
                // filter by description
                // if (product.description.toLowerCase().indexOf(searchString) != -1) {
                //     return product
                // }
            })
            return productsCopy;
        }
    },
    created: async function () {
        const response = await fetch(API_URL + "/products")
        const data = await response.json();
        this.products = data;
    },
});