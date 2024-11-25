// Sample product data
const products = [
    { name: "Gourmet Chocolate Boxes", price: 15, rating: 5, type: "Occasional Gifts", image: "https://m.media-amazon.com/images/I/71KDvxT8d-L._AC_UF1000,1000_QL80_.jpg" },
    { name: "Toys", price: 50, rating: 5, type: "Toy Gifts", image: "https://m.media-amazon.com/images/I/818ig5vexZL.jpg" },
    { name: "Customized Jewelry", price: 25, rating: 4, type: "Luxury Gifts", image: "https://m.media-amazon.com/images/I/81GhwQA0R0L._AC_UF350,350_QL80_.jpg" },
    { name: "Flower Bouquet", price: 35, rating: 5, type: "Occasional Gifts", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDjLRZfJhQWyP80nU4Ic7bAsPfQW-JcI8wTGJS2OVRNedKJwC4g0ikn7pNk9qKr8fNaE8&usqp=CAU" },
    { name: "Photo Albums or Frames", price: 100, rating: 5, type: "Personalized Gifts", image: "https://www.gosupps.com/media/catalog/product/cache/25/small_image/1500x1650/9df78eab33525d08d6e5fb8d27136e95/7/1/71y9iW6eSqL.jpg" },
    { name: "Wooden Calendars", price: 150, rating: 4, type: "Personalized Gifts", image: "https://i.etsystatic.com/49786242/r/il/90d15b/5882563419/il_570xN.5882563419_lang.jpg" },
    { name: "Teddy bears", price: 60, rating: 4, type: "Toy Gifts", image: "https://img.freepik.com/premium-photo/teddy-bear-boxes-with-gifts_100436-1490.jpg" },
    { name: "Flower Plants", price: 60, rating: 4, type: "Toy Gifts", image: "https://nurserylive.com/cdn/shop/products/nurserylive-bulk-gifts-money-plant-marble-prince-in-paper-wrap-gift-pack-16969031843980.jpg?v=1634224220" },
    { name: "Cakes", price: 40, rating: 4, type: "Occasional Gifts", image: "https://i.pinimg.com/originals/3e/3b/a7/3e3ba74eb37732227ff76bca2f139947.jpg" },
    { name: "Themed T-Shirts", price: 30, rating: 5, type: "Personalized Gifts", image: "https://gfashion.in/cdn/shop/files/wink-smile-family-tshirts-white-_-gfashion_1024x1024.jpg?v=1711111456" },
    { name: "Watches", price: 30, rating: 5, type: "Luxury Gifts", image: "https://down-sg.img.susercontent.com/file/6ac60d135ded8dfb5eadf86d1c0e9f1e_tn" },
    { name: "Gift Hampers", price: 300, rating: 5, type: "Occasional Gifts", image: "https://i.pinimg.com/736x/5a/b1/65/5ab1658af53725213e64a4830cf2e10e.jpg" },
  ];
  
  // Global filter criteria
  let filteredProducts = [...products];
  
  // Function to render products
  function renderProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    filteredProducts.forEach(product => {
      const div = document.createElement("div");
      div.className = "product-item";
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <p>Rating: ${product.rating}</p>
        <button onclick="addToCart('${product.name}')">Add to Cart</button>
      `;
      productList.appendChild(div);
    });
  }
  
  // Function to handle filter and sorting
  function filterAndSortProducts() {
    const priceSort = document.getElementById("priceSort").value;
    const ratingSort = document.getElementById("ratingSort").value;
    const typeFilter = document.getElementById("typeFilter").value;
  
    // Filter products by type
    filteredProducts = products.filter(product => {
      return typeFilter === "" || product.type === typeFilter;
    });
  
    // Sort products by price
    if (priceSort) {
      filteredProducts.sort((a, b) => (priceSort === 'Low-to-High' ? a.price - b.price : b.price - a.price));
    }
  
    // Sort products by rating
    if (ratingSort) {
      filteredProducts.sort((a, b) => (ratingSort === 'Low-to-High' ? a.rating - b.rating : b.rating - a.rating));
    }
  
    // Render filtered and sorted products
    renderProducts();
  }
  
  // Shopping Cart Functions
  function addToCart(productName) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productName);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  }
  
  function removeFromCart(productName) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.filter(item => item !== productName); // Remove item by name
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCart();
  }
  
  function updateCart() {
    const cartList = document.getElementById("cartList");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Clear current cart list
    cartList.innerHTML = '';
  
    // Add cart items to the list
    cart.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item}
        <button onclick="removeFromCart('${item}')">Remove</button>
      `;
      cartList.appendChild(li);
    });
  }
  
  function clearCart() {
    localStorage.setItem("cart", JSON.stringify([]));
    updateCart();
  }
  // Contact Form Submission
  document.getElementById("contactForm").addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Get values from the form
    const name = document.getElementById("Name").value;
    const email = document.getElementById("Email").value;
    const contactNumber = document.getElementById("Contact Number").value;
    const message = document.getElementById("Message").value;
     
    if (Name && email && contactNumber && message) {
      alert('Thank you for contacting us, ' + name + '! We will get back to you soon.');
    } else {
      alert('Please fill in all the fields.');
    }
  });
    
  // Initial Render
  window.onload = () => {
    renderProducts();
    updateCart();
  };
  