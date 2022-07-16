import { screen } from "@testing-library/react"
import { products } from "./mocks/productsMock";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App"
import ProductsCard from "../Components/ProductsCard";
import { renderWithProviders } from "./renderWithProviders";



describe('Test the Product Listing Page component', () => {
  it('Check if the products are rendering on page', async () => {
    renderWithProviders(<ProductsCard allProducts={ products.allProducts } />)
    const sneaker = screen.getByText(/Adidas/i)
    const xbox = screen.getByText(/video game/i)
    expect(sneaker).toBeInTheDocument();
    expect(xbox).toBeInTheDocument()
  });

  it('Test when click on add to cart button the cart length increase', async () => {
    renderWithProviders(<ProductsCard allProducts={ products.allProducts } />)
    const addToCart = screen.getAllByAltText('add to cart button')
    await userEvent.click(addToCart[0])
    const cart = JSON.parse(localStorage.getItem('cart'));
    expect(cart).toHaveLength(1)

    await userEvent.click(addToCart[1])
    const updatedCart = JSON.parse(localStorage.getItem('cart'));
    expect(updatedCart).toHaveLength(2)
  })

  it('Test when click in one product the url changes with the product ID', async () => {
    renderWithProviders(<ProductsCard allProducts={ products.allProducts } />)
    const product = screen.getAllByTestId('link')[0];
    await userEvent.click(product)
    expect(window.location.pathname).toBe('/Sneaker')
  })
})