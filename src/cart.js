function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

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

function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
