let currentView = 'home';
let cart = [];
let currentItem = {};
let itemToDelete = null;

function showMenu() {
  switchView('menu');
}

function showCart() {
  switchView('cart');
  displayCartItems();
}

function showOrder(name, description, image) {
  currentItem = { name, description, image };
  document.getElementById('order-name').textContent = name;
  document.getElementById('order-description').textContent = description;
  document.getElementById('order-image').src = image;
  document.getElementById('quantity').textContent = '0';
  switchView('order');
}

function changeQuantity(change) {
  const quantityElement = document.getElementById('quantity');
  let quantity = parseInt(quantityElement.textContent);
  quantity = Math.max(0, quantity + change);
  quantityElement.textContent = quantity;
}

function addToCart() {
  const quantity = parseInt(document.getElementById('quantity').textContent);
  if (quantity > 0) {
    cart.push({ ...currentItem, quantity });
  }
  showMenu();
}

function displayCartItems() {
  const cartItemsElement = document.getElementById('cart-items');
  cartItemsElement.innerHTML = '';
  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <span>${item.name} x ${item.quantity}</span>
      <button onclick="changeCartItemQuantity(${index}, -1)">-</button>
      <button onclick="changeCartItemQuantity(${index}, 1)">+</button>
    `;
    cartItemsElement.appendChild(itemElement);
  });
}

function changeCartItemQuantity(index, change) {
  const item = cart[index];
  item.quantity += change;
  if (item.quantity <= 0) {
    item.quantity = 0;
    itemToDelete = index;
    showPopup();
  } else {
    displayCartItems();
  }
}

function showPopup() {
  document.getElementById('popup').classList.remove('hidden');
}

function confirmDelete(confirm) {
  if (confirm && itemToDelete !== null) {
    cart.splice(itemToDelete, 1);
  } else if (itemToDelete !== null) {
    cart[itemToDelete].quantity = 1;
  }
  itemToDelete = null;
  document.getElementById('popup').classList.add('hidden');
  displayCartItems();
}

function placeOrder() {
  alert('주문이 완료되었습니다.');
  orderHistory = orderHistory.concat(cart);
  cart = [];
  showMenu();
}

function showOrderHistory() {
  switchView('order-history');
  displayOrderHistoryItems();
}

function displayOrderHistoryItems() {
  const orderHistoryItemsElement = document.getElementById('order-history-items');
  orderHistoryItemsElement.innerHTML = '';

  const orderSummary = orderHistory.reduce((summary, item) => {
    if (!summary[item.name]) {
      summary[item.name] = 0;
    }
    summary[item.name] += item.quantity;
    return summary;
  }, {});

  for (const [name, quantity] of Object.entries(orderSummary)) {
    const itemElement = document.createElement('div');
    itemElement.className = 'order-history-item';
    itemElement.textContent = `${name} x ${quantity}`;
    orderHistoryItemsElement.appendChild(itemElement);
  }
}

function switchView(view) {
  document.getElementById(currentView).classList.add('hidden');
  document.getElementById(view).classList.remove('hidden');
  currentView = view;
}
