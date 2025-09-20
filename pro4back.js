// Get elements
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close-btn');

// Open menu
hamburger.addEventListener('click', () => {
    hamburger.classList.add('active');
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close menu function
function closeMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Close menu events
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// Close menu when clicking on links
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
    }
});


let cart = [];
let cartTotal = 0;

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartCountBadge = document.getElementById('cartCountBadge');
    const emptyCart = document.getElementById('emptyCart');
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotalElement = document.getElementById('cartTotal');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCountBadge.textContent = totalItems;

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartItems.style.display = 'none';
        cartFooter.style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        cartItems.style.display = 'block';
        cartFooter.style.display = 'block';

        // Calculate total
        cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalElement.textContent = `৳${cartTotal.toFixed(2)}`;

        // Render cart items
        renderCartItems();
    }
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">৳${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="decreaseCartQuantity(${index})">-</button>
                        <input type="number" value="${item.quantity}" class="qty-input" readonly>
                        <button class="qty-btn" onclick="increaseCartQuantity(${index})">+</button>
                    </div>
                </div>
                <button class="cart-remove" onclick="removeFromCart(${index})">×</button>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItemHTML;
    });
}

function addToCart() {
    const newItem = {
        id: 1,
        name: 'ELARA Dress',
        price: 850,
        quantity: 1,
        image: 'pro4/pp1.webp'
    };

    const existingItem = cart.find(item => item.id === newItem.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(newItem);
    }

    updateCartUI();

    // Show success message
    alert('Product added to cart!');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function increaseCartQuantity(index) {
    cart[index].quantity += 1;
    updateCartUI();
}

function decreaseCartQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        removeFromCart(index);
    }
    updateCartUI();
}

function openCart() {
    document.getElementById('cartOverlay').classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeCart() {
    document.getElementById('cartOverlay').classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scroll
}

function closeCartOnOverlay(event) {
    if (event.target === event.currentTarget) {
        closeCart();
    }
}

function proceedToCheckout() {
    alert(`Proceeding to checkout with ${cart.length} items. Total: ৳${cartTotal.toFixed(2)}`);
}

// Initialize cart UI
updateCartUI();