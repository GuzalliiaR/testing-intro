function addToCart(cart, product, count) {
  if (count === 0) throw new RangeError('Нельзя в корзину добавить нулевое количество товара.');
  if (count > product.stock) {
    throw new RangeError('Нельзя в корзину добавить товара больше чем есть на складе.');
  };

  const productInCart = cart.find((prod) => prod.id === product.id);

  if (productInCart) {
    const newQuantity = productInCart.quantity + count;
    productInCart.quantity = newQuantity <= product.stock ? newQuantity : productInCart.quantity;

  } else {
    const addedProduct = {
      ...product,
      quantity: count
    };
    cart.push(addedProduct);
  }

  return cart;
}

function changeQuantity(cart, id, count) {
  const changedProduct = cart.find((prod) => prod.id === id);

  if (!changedProduct) return cart;
  if (count === 0) {
    throw new RangeError('Нельзя в корзину добавить нулевое количество товара.');
  }
  if (count > changedProduct.stock) {
    throw new RangeError('Нельзя в корзину добавить товара больше чем есть на складе.');
  };
  
  changedProduct.quantity = count;
  return cart;
}

function removeFromCart(cart, id) {
  cart = cart.filter((prod) => prod.id !== id);
  return cart;
}

function calculateCartSubtotal(cart) {
  const costCart = cart.reduce((sum, prod) => {
    return sum = sum + (prod.quantity * prod.price);
  }, 0);

  return costCart;
}

function calculateOrderTotal(cart, promoCode) {
  const orderTotal = { subtotal: 0, discount: 0, delivery: 0, total: 0 };
  orderTotal.subtotal = calculateCartSubtotal(cart);

  if (orderTotal.subtotal < 50000) {
    orderTotal.delivery = 30000;
    orderTotal.total = orderTotal.subtotal + orderTotal.delivery;
  } else {
    orderTotal.total = orderTotal.subtotal;
  }

  if (orderTotal.subtotal >= 20000 && promoCode.trim().toUpperCase() === 'SAVE10') {
    orderTotal.discount = orderTotal.subtotal * 0.1;
    orderTotal.total = orderTotal.total - orderTotal.discount;
  }

  return orderTotal;
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
