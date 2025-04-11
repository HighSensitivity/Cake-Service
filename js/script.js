// Sample cake data (in a real application, this would come from a backend)
const cakes = [
    {
        id: 1,
        title: "Classic Chocolate Cake",
        price: 40.00,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800",
        category: "birthday"
    },
    {
        id: 2,
        title: "Vanilla Wedding Cake",
        price: 40.00,
        image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800",
        category: "wedding"
    },
    {
        id: 3,
        title: "Red Velvet Delight",
        price: 40.00,
        image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800",
        category: "birthday"
    },
    {
        id: 4,
        title: "Custom Rainbow Cake",
        price: 40.00,
        image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=800",
        category: "custom"
    }
];

// Shopping cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const categoryFilter = document.getElementById('category-filter');
const searchInput = document.getElementById('search');
const cartCount = document.querySelector('.cart-count');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(cakes);
    updateCartCount();
});

// Display products
function displayProducts(products) {
    productsContainer.innerHTML = '';
    
    products.forEach(cake => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${cake.image}" alt="${cake.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${cake.title}</h3>
                <p class="product-price">$${cake.price}</p>
                <div class="quantity-controls">
                    <button onclick="decreaseQuantity(${cake.id})">-</button>
                    <span id="quantity-${cake.id}">1</span>
                    <button onclick="increaseQuantity(${cake.id})">+</button>
                </div>
                <button class="add-to-cart" onclick="addToCart(${cake.id}, '${cake.title}', ${cake.price}, '${cake.image}')">
                    Add to Cart
                </button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
}

// Filter products
categoryFilter?.addEventListener('change', () => {
    const selectedCategory = categoryFilter.value;
    const filteredProducts = selectedCategory === 'all' 
        ? cakes 
        : cakes.filter(cake => cake.category === selectedCategory);
    displayProducts(filteredProducts);
});

// Search products
searchInput?.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = cakes.filter(cake => 
        cake.title.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
});

// Cart functions
function addToCart(productId, title, price, image) {
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).textContent);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            title: title,
            price: price,
            image: image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show success message
    alert(`Added ${quantity} ${title}(s) to cart!`);
    // Reset quantity to 1
    document.getElementById(`quantity-${productId}`).textContent = '1';
}

function increaseQuantity(productId) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    let quantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = quantity + 1;
}

function decreaseQuantity(productId) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
        quantityElement.textContent = quantity - 1;
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}
