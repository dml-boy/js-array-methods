const products = [
    { id: 1, name: "iPhone 13", category: "Smartphone", price: 999, rating: 4.5 },
    { id: 2, name: "Galaxy Buds", category: "Earbuds", price: 149, rating: 4.2 },
    { id: 3, name: "Apple Watch", category: "Smartwatch", price: 399, rating: 4.7 },
    { id: 4, name: "USB-C Cable", category: "Accessories", price: 19, rating: 4.0 },
    { id: 5, name: "Pixel 7", category: "Smartphone", price: 899, rating: 4.4 }
  ];
  
  let filteredProducts = [...products];
  let cart = [];
  
  const productList = document.getElementById("product-list");
  const cartList = document.getElementById("cart-list");
  const totalDisplay = document.getElementById("total");
  const searchInput = document.getElementById("search");
  const sortSelect = document.getElementById("sort");
  
  function renderProducts(arr) {
    productList.innerHTML = arr.map(product => `
      <div class="product">
        <h3>${product.name}</h3>
        <p>Category: ${product.category}</p>
        <p>Price: $${product.price}</p>
        <p>Rating: ⭐ ${product.rating}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `).join('');
  }
  
  function renderCart() {
    cartList.innerHTML = "";
    cart.forEach((item, index) => {
      cartList.innerHTML += `
        <div class="cart-item">
          <p>${item.name} - $${item.price}</p>
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;
    });
  
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalDisplay.textContent = total.toFixed(2);
  
    // Example: some(), every()
    if (cart.some(p => p.price > 500)) {
      console.log("Cart has expensive items.");
    }
    if (cart.every(p => p.price > 10)) {
      console.log("All cart items are reasonably priced.");
    }
  }
  
  function addToCart(id) {
    const product = products.find(p => p.id === id); // find()
    if (product) cart.push(product); // push()
    renderCart();
  }
  
  function removeFromCart(index) {
    cart.splice(index, 1); // splice()
    renderCart();
  }
  
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    filteredProducts = products.filter(p => p.name.toLowerCase().includes(query)); // filter() + includes()
    renderProducts(filteredProducts);
  });
  
  sortSelect.addEventListener("change", () => {
    if (sortSelect.value === "priceAsc") {
      filteredProducts.sort((a, b) => a.price - b.price); // sort()
    } else if (sortSelect.value === "priceDesc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }
    renderProducts(filteredProducts);
  });
  
  renderProducts(products);
  