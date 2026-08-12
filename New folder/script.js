/* ================= PRODUCTS ================= */

const products = [

    {
        id: 1,
        name: "Premium Almonds",
        category: "dry-fruits",
        price: 800,
        image: "almond.webp"
    },

    {
        id: 2,
        name: "Kaju / Cashews",
        category: "dry-fruits",
        price: 950,
        image: "WhatsApp Image 2026-08-12 at 6.03.03 PM.jpeg"
    },

    {
        id: 3,
        name: "Premium Pistachios",
        category: "dry-fruits",
        price: 1200,
        image: "WhatsApp Image 2026-08-12 at 6.06.32 PM.jpeg"
    },

    {
        id: 4,
        name: "Golden Raisins",
        category: "dry-fruits",
        price: 500,
        image: "WhatsApp Image 2026-08-12 at 6.11.24 PM.jpeg"
    },

    {
        id: 5,
        name: "Mixed Dry Fruits",
        category: "dry-fruits",
        price: 1000,
        image: "https://images.unsplash.com/photo-1606914469633-b2a6b5b4c3d3?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 6,
        name: "Plastic Storage Box",
        category: "plastic",
        price: 250,
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 7,
        name: "Kitchen Container",
        category: "plastic",
        price: 180,
        image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 8,
        name: "Household Basket",
        category: "plastic",
        price: 220,
        image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80"
    }

];


/* ================= CART ================= */

let cart = [];


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(productList) {

    const container =
        document.getElementById("productsContainer");

    container.innerHTML = "";

    if (productList.length === 0) {

        container.innerHTML = `
            <p style="
                grid-column:1/-1;
                text-align:center;
                padding:50px;
                color:#888;
            ">
                No products found.
            </p>
        `;

        return;
    }


    productList.forEach(product => {

        container.innerHTML += `

            <div class="product-card">

                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="product-details">

                    <span class="product-category">
                        ${product.category === "dry-fruits"
                            ? "Dry Fruits"
                            : "Plastic Products"}
                    </span>

                    <h3>
                        ${product.name}
                    </h3>

                    <div class="product-price">
                        ₹${product.price}
                    </div>

                    <button
                        class="add-button"
                        onclick="addToCart(${product.id})"
                    >
                        🛒 Add to Cart
                    </button>

                </div>

            </div>

        `;

    });

}


/* ================= ADD TO CART ================= */

function addToCart(id) {

    const product =
        products.find(item => item.id === id);

    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    updateCart();

    openCart();

}


/* ================= UPDATE CART ================= */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    } else {

        cartItems.innerHTML = "";

        cart.forEach(item => {

            cartItems.innerHTML += `

                <div class="cart-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div class="cart-item-info">

                        <h4>
                            ${item.name}
                        </h4>

                        <p>
                            ₹${item.price}
                        </p>

                        <div class="quantity">

                            <button
                                onclick="changeQuantity(
                                    ${item.id},
                                    -1
                                )"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                onclick="changeQuantity(
                                    ${item.id},
                                    1
                                )"
                            >
                                +
                            </button>

                            <button
                                class="remove"
                                onclick="removeFromCart(
                                    ${item.id}
                                )"
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                </div>

            `;

        });

    }


    let total = 0;

    let count = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;

        count += item.quantity;

    });


    cartCount.innerText = count;

    cartTotal.innerText = total;

}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(id, amount) {

    const item =
        cart.find(product => product.id === id);


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(product => product.id !== id);

    }


    updateCart();

}


/* ================= REMOVE ================= */

function removeFromCart(id) {

    cart =
        cart.filter(product => product.id !== id);

    updateCart();

}


/* ================= OPEN CART ================= */

function openCart() {

    document
        .getElementById("cartSidebar")
        .classList.add("active");

    document
        .getElementById("cartOverlay")
        .classList.add("active");

}


/* ================= CLOSE CART ================= */

function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("active");

    document
        .getElementById("cartOverlay")
        .classList.remove("active");

}


/* ================= FILTER ================= */

function filterProducts(category) {

    if (category === "all") {

        displayProducts(products);

        return;

    }


    const filtered =
        products.filter(
            product => product.category === category
        );


    displayProducts(filtered);

}


/* ================= SEARCH ================= */

function searchProducts() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    const filtered =
        products.filter(product =>
            product.name
                .toLowerCase()
                .includes(search)
        );


    displayProducts(filtered);

}


/* ================= WHATSAPP CHECKOUT ================= */

function checkoutWhatsApp() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    let message =
        "Hello Madinah Dry Fruits & Plastic House!%0A%0A";

    message += "I want to order:%0A";


    let total = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        message +=
            `${item.name} x ${item.quantity} = ₹${itemTotal}%0A`;

    });


    message +=
        `%0ATotal: ₹${total}`;

    message +=
        "%0A%0APlease confirm my order.";


    
    //    CHANGE THIS NUMBER
    //    TO YOUR WHATSAPP NUMBER.

    //    Example:
    //    919876543210
    

    const phone =
        "918604311201";


    window.open(
        `https://wa.me/${phone}?text=${message}`,
        "_blank"
    );

}


/* ================= INITIAL LOAD ================= */

displayProducts(products);

updateCart();