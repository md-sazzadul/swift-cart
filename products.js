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
    .then((data) => console.log(data))
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

loadCategories();
