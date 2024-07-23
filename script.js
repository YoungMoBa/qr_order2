let currentView = 'home';
let cart = [];
let currentItem = {};

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
  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.textContent = `${item.name} x ${item.quantity}`;
    cartItemsElement.appendChild(itemElement);
  });
}

function placeOrder() {
  alert('주문이 완료되었습니다.');
  cart = [];
  showMenu();
}

function switchView(view) {
  document.getElementById(currentView).classList.add('hidden');
  document.getElementById(view).classList.remove('hidden');
  currentView = view;
}
