import { updateCartLength } from "../Reducers/cartSlice";
import { store } from "../store/store";
import { compareAttributes, isEqual } from "./compareElements";

export const handleProductsOnLocal = (cart, product) => {
  const findObj = cart.filter((obj) => isEqual(obj.id, product.id));
  if (findObj.length) {
    const sameAttrs = findObj.some((elem) => compareAttributes(elem.selectedTraits, product.selectedTraits))
    if (sameAttrs) {
      const foundedIndex = cart.findIndex((pr) => isEqual(pr.id, product.id) && compareAttributes(pr.selectedTraits, product.selectedTraits));
      cart[foundedIndex].qt += 1
    } else cart.push(product)
  } else cart.push(product)
store.dispatch(updateCartLength(cart.reduce((acc, item) => acc += item.qt, 0)))
localStorage.setItem('cart', JSON.stringify(cart))
}