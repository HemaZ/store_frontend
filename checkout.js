// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function getCookie(cookieName) {
  var name = cookieName + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      return c.substr(name.length);
    }
  }
}

let removeItem = (itemId)=>{
  cart = cart.filter((elm)=>{
    return elm.id != itemId
  })
}


let updateCart = () => {
  document.getElementById("nItems").innerText = cart.length;
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = '';
  let totalPrice = 0;
  cart.map((elm) => {
    const item = document.createElement("li");
    item.setAttribute(
      "class",
      "list-group-item d-flex justify-content-between lh-sm"
    );
    item.innerHTML = `<div>
    <h6 class="my-0">${elm.title.substring(0, 16)}</h6>
    <small class="text-body-secondary">${elm.description.substring(
      0,
      64
    )}  </small><span><button type="button" class="btn btn-outline-danger btn-sm" id="item-i${
      elm.id
    }">Remove</button></span>
  </div>
  <span class="text-body-secondary">$${elm.price}</span>`;
    cartList.appendChild(item);
    totalPrice += elm.price;
    document
    .getElementById(`item-i${elm.id}`)
    .addEventListener("click", (event) => {
      removeItem(elm.id);
      updateCart();
    });
  });

  

  // Total price
  const totalPriceElm = document.createElement("li");
  totalPriceElm.setAttribute(
    "class",
    "list-group-item d-flex justify-content-between"
  );
  totalPriceElm.innerHTML = `<span>Total (USD)</span>
  <strong>$${totalPrice}</strong>`;
  cartList.appendChild(totalPriceElm);
  localStorage.setItem("cart",JSON.stringify(cart));
};

cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);
updateCart();
