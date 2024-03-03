let cart = [];

let addToCart = (product) => {
    cart.push(product);
    console.log("Cart now has ", cart);
    appendAlert("Item Added to cart","success",product.id);
    localStorage.setItem("cart",JSON.stringify(cart));
};

const appendAlert = (message, type, id) => {
    const alertPlaceholder = document.getElementById(`liveAlertPlaceholder${id}`)
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
  
    alertPlaceholder.append(wrapper)
  }
  
let buildProduct = (product) => {
  const colDiv = document.createElement("div");
  colDiv.setAttribute("class", "col");
  colDiv.innerHTML = [
    '<div class="card shadow-sm">',
    `<img src="${product.image}" class="card-img-top" />`,
    '<div class="card-body">',
    `<h5 class="card-title">${product.title.substring(0,32)}</h5>`,
    '<p class="card-text" id="card1Text">',
    `${product.description.substring(0,128)}</p>`,
    `<div id="liveAlertPlaceholder${product.id}"></div>`,
    '<div class="d-flex justify-content-between align-items-center">',
    '<div class="btn-group">',
    `<button type="button" id="addCart${product.id}" class="btn btn-sm btn-outline-secondary">`,
    "Add to Cart</button>",
    "</div>",
    `<small class="text-body-secondary">$${product.price}</small>`,
    "</div>",
    "</div>",
    `</div>`,
  ].join("");
  document.getElementById("productsDiv").appendChild(colDiv);

  const buyBtn = document.getElementById(`addCart${product.id}`);
  buyBtn.addEventListener("click", (event) => {
    addToCart(product);
  });
};
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    data.map((product) => {
      buildProduct(product);
    });
  });
