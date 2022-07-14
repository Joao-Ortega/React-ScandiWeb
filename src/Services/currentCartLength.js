export const currentCartLength = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (cart) {
    return cart.reduce((acc, item) => acc += item.qt, 0)
  }
  return 0
}