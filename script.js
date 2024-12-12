const apiURL = "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889";


async function fetchCartData() {
  const response = await fetch(apiURL);
  const data = await response.json();
  renderCart(data);
}


function renderCart(data) {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = ""; 

  data.items.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h4>${item.title}</h4>
      <p>₹${(item.price / 100).toFixed(2)}</p>
      <input type="number" min="1" value="${item.quantity}" data-id="${item.id}">
      <button class="remove-item" data-id="${item.id}">Remove</button>
    `;
    cartContainer.appendChild(cartItem);
  });

  updateTotals(data);
}


function updateTotals(data) {
  const subtotal = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("subtotal").textContent = `₹${(subtotal / 100).toFixed(2)}`;
  document.getElementById("total").textContent = `₹${(subtotal / 100).toFixed(2)}`;
}


document.addEventListener("input", (e) => {
  if (e.target.type === "number") {
    const id = e.target.getAttribute("data-id");
    const quantity = parseInt(e.target.value);
    console.log(`Update item ${id} to quantity ${quantity}`);
    
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    const id = e.target.getAttribute("data-id");
    console.log(`Remove item with id ${id}`);
    
  }
});


fetchCartData();
