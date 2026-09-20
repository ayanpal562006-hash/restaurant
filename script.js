
// ======================================
// SIGN UP
// ======================================

const signupForm =
    document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const name =
                document
                    .getElementById("signupName")
                    .value.trim();

            const email =
                document
                    .getElementById("signupEmail")
                    .value.trim()
                    .toLowerCase();

            const phone =
                document
                    .getElementById("signupPhone")
                    .value.trim();

            const password =
                document
                    .getElementById("signupPassword")
                    .value;

            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    .value;

            const message =
                document.getElementById(
                    "signupMessage"
                );


            if (password !== confirmPassword) {

                message.innerText =
                    "Passwords do not match.";

                message.style.color = "red";

                return;
            }


            if (password.length < 6) {

                message.innerText =
                    "Password must contain at least 6 characters.";

                message.style.color = "red";

                return;
            }


            const existingUser =
                JSON.parse(
                    localStorage.getItem(
                        "foodieUser"
                    )
                );


            if (
                existingUser &&
                existingUser.email === email
            ) {

                message.innerText =
                    "An account with this email already exists.";

                message.style.color = "red";

                return;
            }


            const user = {

                name: name,

                email: email,

                phone: phone,

                password: password

            };


            localStorage.setItem(
                "foodieUser",
                JSON.stringify(user)
            );


            message.innerText =
                "Account created successfully!";

            message.style.color = "green";


            setTimeout(() => {

                window.location.href =
                    "login.html";

            }, 1200);

        }
    );

}


// ======================================
// SIGN IN
// ======================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("loginEmail")
                    .value.trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            const message =
                document.getElementById(
                    "loginMessage"
                );


            const user =
                JSON.parse(
                    localStorage.getItem(
                        "foodieUser"
                    )
                );


            if (!user) {

                message.innerText =
                    "No account found. Please create an account.";

                message.style.color = "red";

                return;
            }


            if (
                user.email === email &&
                user.password === password
            ) {

                localStorage.setItem(
                    "isLoggedIn",
                    "true"
                );


                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(user)
                );


                message.innerText =
                    "Login successful!";

                message.style.color = "green";


                setTimeout(() => {

                    window.location.href =
                        "index.html";

                }, 800);

            } else {

                message.innerText =
                    "Invalid email or password.";

                message.style.color = "red";

            }

        }
    );

}


// ======================================
// DEMO GOOGLE LOGIN
// ======================================

function demoGoogleLogin() {

    const user = {

        name: "Google User",

        email: "googleuser@example.com",

        phone: "",

    };


    localStorage.setItem(
        "isLoggedIn",
        "true"
    );


    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
    );


    window.location.href =
        "index.html";
}


// ======================================
// LOGOUT
// ======================================

function logout() {

    localStorage.removeItem(
        "isLoggedIn"
    );

    localStorage.removeItem(
        "loggedInUser"
    );

    window.location.href =
        "login.html";
}

// ======================================
// FOOD DATA
// ======================================

const foods = [

    {
        id: 1,
        name: "Margherita Pizza",
        category: "pizza",
        price: 299,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
        description: "Classic cheese pizza with tomato and basil."
    },

    {
        id: 2,
        name: "Chicken Burger",
        category: "burger",
        price: 199,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        description: "Juicy chicken burger with fresh vegetables."
    },

    {
        id: 3,
        name: "Chicken Biryani",
        category: "biryani",
        price: 249,
        image: "https://images.unsplash.com/photo-1563379091339-03246963d51a",
        description: "Aromatic basmati rice with spicy chicken."
    },

    {
        id: 4,
        name: "Veg Chow Mein",
        category: "chinese",
        price: 179,
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
        description: "Stir-fried noodles with fresh vegetables."
    },

    {
        id: 5,
        name: "Chocolate Cake",
        category: "dessert",
        price: 149,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
        description: "Rich and delicious chocolate cake."
    },

    {
        id: 6,
        name: "Farmhouse Pizza",
        category: "pizza",
        price: 349,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
        description: "Loaded pizza with vegetables and cheese."
    },

    {
        id: 7,
        name: "Cheese Burger",
        category: "burger",
        price: 229,
        image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330",
        description: "Classic burger with melted cheese."
    },

    {
        id: 8,
        name: "Gulab Jamun",
        category: "dessert",
        price: 99,
        image: "https://images.unsplash.com/photo-1601303516534-3f2c3c3f9b9c",
        description: "Soft Indian sweet served warm."
    }

];


// ======================================
// CART
// ======================================

let cart = JSON.parse(
    localStorage.getItem("foodCart")
) || [];


// ======================================
// DISPLAY FOOD
// ======================================

function displayFood(foodList = foods) {

    const container =
        document.getElementById("foodContainer");

    container.innerHTML = "";

    if (foodList.length === 0) {

        container.innerHTML =
            "<p>No food items found.</p>";

        return;
    }

    foodList.forEach(food => {

        container.innerHTML += `

            <div class="food-card">

                <img
                    src="${food.image}"
                    alt="${food.name}"
                >

                <div class="food-content">

                    <h3>${food.name}</h3>

                    <p class="food-description">
                        ${food.description}
                    </p>

                    <div class="food-bottom">

                        <span class="price">
                            ₹${food.price}
                        </span>

                        <button
                            class="add-btn"
                            onclick="addToCart(${food.id})"
                        >
                            Add +
                        </button>

                    </div>

                </div>

            </div>

        `;
    });
}


// ======================================
// ADD TO CART
// ======================================

function addToCart(id) {

    const food = foods.find(
        item => item.id === id
    );

    const existing = cart.find(
        item => item.id === id
    );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...food,
            quantity: 1
        });

    }

    saveCart();

    updateCart();

    openCart();
}


// ======================================
// SAVE CART
// ======================================

function saveCart() {

    localStorage.setItem(
        "foodCart",
        JSON.stringify(cart)
    );
}


// ======================================
// UPDATE CART
// ======================================

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    cartItems.innerHTML = "";

    let subtotal = 0;

    let count = 0;


    cart.forEach(item => {

        subtotal +=
            item.price * item.quantity;

        count += item.quantity;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-info">

                    <strong>${item.name}</strong>

                    <p>₹${item.price}</p>

                </div>

                <div class="quantity">

                    <button
                        onclick="changeQuantity(
                            ${item.id}, -1
                        )"
                    >
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(
                            ${item.id}, 1
                        )"
                    >
                        +
                    </button>

                </div>

            </div>

        `;

    });


    const delivery =
        cart.length > 0 ? 40 : 0;

    const gst =
        Math.round(subtotal * 0.05);

    const total =
        subtotal + delivery + gst;


    document.getElementById("cartCount")
        .innerText = count;

    document.getElementById("subtotal")
        .innerText = subtotal;

    document.getElementById("delivery")
        .innerText = delivery;

    document.getElementById("gst")
        .innerText = gst;

    document.getElementById("total")
        .innerText = total;
}


// ======================================
// CHANGE QUANTITY
// ======================================

function changeQuantity(id, change) {

    const item = cart.find(
        item => item.id === id
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        cart = cart.filter(
            item => item.id !== id
        );

    }

    saveCart();

    updateCart();
}


// ======================================
// OPEN CART
// ======================================

function openCart() {

    document
        .getElementById("cartPanel")
        .classList.add("active");

}


// ======================================
// CLOSE CART
// ======================================

function closeCart() {

    document
        .getElementById("cartPanel")
        .classList.remove("active");

}


// ======================================
// SEARCH FOOD
// ======================================

function searchFood() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const filtered =
        foods.filter(food =>
            food.name
                .toLowerCase()
                .includes(search)
        );

    displayFood(filtered);
}


// ======================================
// FILTER FOOD
// ======================================

function filterFood(category) {

    if (category === "all") {

        displayFood(foods);

        return;
    }

    const filtered =
        foods.filter(
            food => food.category === category
        );

    displayFood(filtered);
}


// ======================================
// PAYMENT METHOD
// ======================================

function showPayment(method) {

    document
        .getElementById("upiPayment")
        .classList.add("hidden");

    document
        .getElementById("cardPayment")
        .classList.add("hidden");

    document
        .getElementById("cashPayment")
        .classList.add("hidden");


    if (method === "upi") {

        document
            .getElementById("upiPayment")
            .classList.remove("hidden");

    }


    if (method === "card") {

        document
            .getElementById("cardPayment")
            .classList.remove("hidden");

    }


    if (method === "cash") {

        document
            .getElementById("cashPayment")
            .classList.remove("hidden");

    }
}


// ======================================
// BOOKING TYPE
// ======================================

document
    .getElementById("bookingType")
    .addEventListener("change", function () {

        const tableBox =
            document.getElementById("tableBox");

        if (this.value === "dinein") {

            tableBox.classList.remove("hidden");

        } else {

            tableBox.classList.add("hidden");

        }

    });


// ======================================
// CHECKOUT
// ======================================

function goToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    closeCart();

    document
        .getElementById("booking")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ======================================
// PLACE ORDER
// ======================================

function placeOrder() {

    if (cart.length === 0) {

        alert("Please add food to your cart.");

        return;
    }


    const name =
        document
            .getElementById("customerName")
            .value.trim();

    const phone =
        document
            .getElementById("phone")
            .value.trim();

    const address =
        document
            .getElementById("address")
            .value.trim();


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    if (!name || !phone) {

        alert(
            "Please enter your name and phone number."
        );

        return;
    }


    if (!address) {

        alert(
            "Please enter your delivery address."
        );

        return;
    }


    if (!payment) {

        alert(
            "Please select a payment method."
        );

        return;
    }


    if (payment.value === "upi") {

        const upi =
            document
                .getElementById("upiId")
                .value.trim();

        if (!upi) {

            alert("Please enter your UPI ID.");

            return;
        }
    }


    if (payment.value === "card") {

        const card =
            document
                .getElementById("cardNumber")
                .value.trim();

        if (card.length !== 16) {

            alert(
                "Please enter a valid card number."
            );

            return;
        }
    }


    const orderId =
        "FH" +
        Math.floor(
            100000 + Math.random() * 900000
        );


    document.getElementById("orderMessage")
        .innerHTML = `
            Thank you, <strong>${name}</strong>!<br><br>

            Your order ID is
            <strong>#${orderId}</strong>.<br>

            Payment Method:
            <strong>${payment.value.toUpperCase()}</strong>
        `;


    document
        .getElementById("successModal")
        .classList.add("active");


    cart = [];

    saveCart();

    updateCart();

}


// ======================================
// CLOSE SUCCESS
// ======================================

function closeSuccess() {

    document
        .getElementById("successModal")
        .classList.remove("active");

    window.location.reload();
}


// ======================================
// SCROLL TO MENU
// ======================================

function scrollToMenu() {

    document
        .getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ======================================
// INITIAL LOAD
// ======================================

displayFood();

updateCart();
