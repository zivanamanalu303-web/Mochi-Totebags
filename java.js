// GET CART FROM LOCAL STORAGE
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// UPDATE CART COUNT
function updateCartCount() {
    let count = cart.reduce((total, item) => total + item.quantity, 0);

    document.querySelectorAll("#cartcount").forEach(element => {
        element.textContent = count;
    });
}

// ADD PRODUCT TO CART
function addToCart(name, price) {
    let existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    alert(name + " added to your cart! 🛒");
}

// DISPLAY CART ITEMS
function displayCart() {
    let cartItems = document.getElementById("cart-items");
    let totalElement = document.getElementById("cart-total");

    if (!cartItems || !totalElement) return;

    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty!</p>";
        totalElement.textContent = "Total: Rp 0";
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <h3>${item.name}</h3>
                    <p>Rp ${item.price.toLocaleString("id-ID")}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>

                <div>
                    <button onclick="changeQuantity(${index}, -1)">−</button>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                    <button onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
        `;
    });

    totalElement.textContent = "Total: Rp " + total.toLocaleString("id-ID");
}

// SAVE CART
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// CHANGE QUANTITY
function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
}

// REMOVE PRODUCT
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
}

// WHATSAPP CHECKOUT
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const phoneNumber = "6281290475611";

    let message = "Hello MOCHI TOTEBAGS! 💗\n";
    message += "I would like to order:\n\n";

    let total = 0;

    cart.forEach(item => {
        let subtotal = item.price * item.quantity;

        message += `${item.name} x${item.quantity} - Rp ${subtotal.toLocaleString("id-ID")}\n`;

        total += subtotal;
    });

    message += `\nTotal: Rp ${total.toLocaleString("id-ID")}`;
    message += "\n\nThank you!";

    const whatsappURL =
        "https://wa.me/" + phoneNumber +
        "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
}

// INITIALIZE
updateCartCount();
displayCart();