// Cart State
let cart = JSON.parse(localStorage.getItem("swiftcart")) || [];

const saveCart = () => localStorage.setItem("swiftcart", JSON.stringify(cart));

const addToCart = (product) => {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  updateCartCount();
  showToast(product.title);
};

const updateCartCount = () => {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll(".cart-count-badge").forEach((badge) => {
    badge.textContent = total;
    badge.classList.toggle("hidden", total === 0);
  });
};

const showToast = (title) => {
  const toast = document.getElementById("cart-toast");
  const msg = document.getElementById("toast-message");
  const short = title.length > 30 ? title.substring(0, 30) + "…" : title;
  msg.textContent = `"${short}" added to cart!`;
  toast.classList.remove("hidden");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.add("hidden"), 3000);
};

// load all products
const loadProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      if (document.getElementById("trending-products"))
        displayTrendingProducts(data);
      if (document.getElementById("products-container"))
        displayProductsByCategory(data);
    })
    .catch((error) => console.error("Error fetching products:", error));
};

// load all categories
const loadCategories = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data))
    .catch((error) => console.error("Error fetching categories:", error));
};

// load products by category
const loadProductsByCategory = (category) => {
  const url = `https://fakestoreapi.com/products/category/${category}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayProductsByCategory(data))
    .catch((error) =>
      console.error("Error fetching products by category:", error),
    );
};

// load product details
const loadProductDetails = (productId) => {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((response) => response.json())
    .then((product) => displayProductModal(product))
    .catch((error) => {
      console.error("Error fetching product details:", error);
    });
};

// display trending products
const displayTrendingProducts = (products) => {
  const trendingProductsContainer =
    document.getElementById("trending-products");

  const trendingProducts = [...products]
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 3);

  trendingProducts.forEach((product) => {
    const productCardDiv = document.createElement("div");
    productCardDiv.innerHTML = `
    <div class="card bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
        <!-- Product Image -->
        <figure class="bg-gray-100 px-8 pt-8">
            <img
                src=${product.image}
                alt=${product.title}
                class="h-64 w-full object-contain"
            />
        </figure>

        <div class="card-body p-6">
            <!-- Category Badge and Rating -->
            <div class="flex items-center justify-between mb-2">
                <span class="badge badge-ghost text-indigo-600 font-medium">${product.category}</span>
                  <div class="flex items-center gap-1 text-sm">
                    <i class="fas fa-star text-yellow-400"></i>
                    <span class="font-semibold">${product.rating.rate}</span>
                    <span class="text-gray-500">(${product.rating.count})</span>
                  </div>
                </div>

                <!-- Product Title -->
                <h3 class="card-title text-base font-semibold text-gray-900 mb-2">
                  ${
                    product.title.length > 50
                      ? product.title.substring(0, 40) + "..."
                      : product.title
                  }
                </h3>

                <!-- Price -->
                <p class="text-2xl font-bold text-gray-900 mb-4">$${product.price}</p>

                <!-- Action Buttons -->
                <div class="card-actions flex gap-2">
                  <button onclick="loadProductDetails(${product.id})" class="btn btn-outline btn-sm flex-1">
                    <i class="far fa-eye"></i>
                    Details
                  </button>
                  <button
                    id="add-btn-${product.id}"
                    class="btn btn-primary btn-sm flex-1 bg-indigo-600 hover:bg-indigo-700 border-indigo-600"
                  >
                    <i class="fas fa-shopping-cart"></i>
                    Add
                  </button>
                </div>
              </div>
            </div>`;

    trendingProductsContainer.appendChild(productCardDiv);

    document
      .getElementById(`add-btn-${product.id}`)
      .addEventListener("click", () => addToCart(product));
  });
};

// display products by category
const displayProductsByCategory = (products) => {
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productCardDiv = document.createElement("div");

    productCardDiv.innerHTML = `
        <div class="card bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
        <!-- Product Image -->
        <figure class="bg-gray-100 px-8 pt-8">
            <img
                src=${product.image}
                alt=${product.title}
                class="h-64 w-full object-contain"
            />
        </figure>

        <div class="card-body p-6">
            <!-- Category Badge and Rating -->
            <div class="flex items-center justify-between mb-2">
                <span class="badge badge-ghost text-indigo-600 font-medium">${product.category}</span>
                  <div class="flex items-center gap-1 text-sm">
                    <i class="fas fa-star text-yellow-400"></i>
                    <span class="font-semibold">${product.rating.rate}</span>
                    <span class="text-gray-500">(${product.rating.count})</span>
                  </div>
                </div>

                <!-- Product Title -->
                <h3 class="card-title text-base font-semibold text-gray-900 mb-2">
                  ${
                    product.title.length > 50
                      ? product.title.substring(0, 50) + "..."
                      : product.title
                  }
                </h3>

                <!-- Price -->
                <p class="text-2xl font-bold text-gray-900 mb-4">$${product.price}</p>

                <!-- Action Buttons -->
                <div class="card-actions flex gap-2">
                  <button onclick="loadProductDetails(${product.id})" class="btn btn-outline btn-sm flex-1">
                    <i class="far fa-eye"></i>
                    Details
                  </button>
                  <button
                    class="add-btn btn btn-primary btn-sm flex-1 bg-indigo-600 hover:bg-indigo-700 border-indigo-600"
                  >
                    <i class="fas fa-shopping-cart"></i>
                    Add
                  </button>
                </div>
              </div>
            </div>
    `;

    productsContainer.appendChild(productCardDiv);

    productCardDiv
      .querySelector(".add-btn")
      .addEventListener("click", () => addToCart(product));
  });
};

// display categories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");

  categories.forEach((category) => {
    const categoryButton = document.createElement("button");

    categoryButton.className =
      "btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white border-none px-6";

    categoryButton.textContent = category;

    categoryButton.addEventListener("click", () =>
      loadProductsByCategory(category),
    );
    categoriesContainer.appendChild(categoryButton);
  });
};

const displayProductModal = (product) => {
  const modal = document.getElementById("product-modal");
  const modalBody = document.getElementById("modal-body");

  modalBody.innerHTML = `
    <div class="flex flex-col items-center justify-center py-16">
      <span class="loading loading-spinner loading-lg text-indigo-600"></span>
      <p class="mt-4 text-gray-500">Loading product details...</p>
    </div>
  `;
  modal.showModal();

  // Generate star rating HTML
  const fullStars = Math.floor(product.rating.rate);
  const hasHalfStar = product.rating.rate % 1 >= 0.5;
  let starsHTML = "";
  for (let i = 0; i < fullStars; i++) {
    starsHTML += `<i class="fas fa-star text-yellow-400"></i>`;
  }
  if (hasHalfStar) {
    starsHTML += `<i class="fas fa-star-half-alt text-yellow-400"></i>`;
  }
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += `<i class="far fa-star text-yellow-400"></i>`;
  }

  modalBody.innerHTML = `
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Product Image -->
      <div class="flex-shrink-0 bg-gray-100 rounded-xl flex items-center justify-center p-8 md:w-56 md:h-56 w-full h-48">
        <img
          src="${product.image}"
          alt="${product.title}"
          class="max-h-full max-w-full object-contain"
        />
      </div>

      <!-- Product Info -->
      <div class="flex-1 flex flex-col gap-3">
        <!-- Category Badge -->
        <span class="badge badge-ghost text-indigo-600 font-medium w-fit">${product.category}</span>

        <!-- Full Title -->
        <h2 class="text-xl font-bold text-gray-900 leading-snug">${product.title}</h2>

        <!-- Rating -->
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-0.5">${starsHTML}</div>
          <span class="font-semibold text-gray-700">${product.rating.rate}</span>
          <span class="text-gray-400 text-sm">(${product.rating.count} reviews)</span>
        </div>

        <!-- Price -->
        <p class="text-3xl font-bold text-gray-900">$${product.price}</p>

        <!-- Description -->
        <p class="text-gray-600 text-sm leading-relaxed">${product.description}</p>

        <!-- Action Buttons -->
        <div class="flex gap-3 mt-2">
          <button id="modal-buy-btn" class="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none flex-1">
            <i class="fas fa-bolt"></i>
            Buy Now
          </button>
          <button id="modal-cart-btn" class="btn btn-outline border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white flex-1">
            <i class="fas fa-shopping-cart"></i>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;

  document
    .getElementById("modal-cart-btn")
    .addEventListener("click", () => addToCart(product));
  document.getElementById("modal-buy-btn").addEventListener("click", () => {
    addToCart(product);
    document.getElementById("product-modal").close();
  });
};

loadProducts();
updateCartCount();
if (document.getElementById("categories-container")) loadCategories();
