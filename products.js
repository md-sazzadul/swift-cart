// load all products
const loadProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => displayProductsByCategory(data))
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

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");

  categories.forEach((category) => {
    const categoryButton = document.createElement("button");

    categoryButton.innerHTML = `
        <button onclick="loadProductsByCategory('${category}')" class="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white border-none px-6">
            ${category}
        </button>`;

    categoriesContainer.appendChild(categoryButton);
  });
};

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
                    class="btn btn-primary btn-sm flex-1 bg-indigo-600 hover:bg-indigo-700 border-indigo-600"
                  >
                    <i class="fas fa-shopping-cart"></i>
                    Add
                  </button>
                </div>
              </div>
            </div>
    `;

    productsContainer.appendChild(productCardDiv);
  });
};

loadCategories();
loadProducts();
