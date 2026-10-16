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

function changeQuantity() { return notImplemented(); }
function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
