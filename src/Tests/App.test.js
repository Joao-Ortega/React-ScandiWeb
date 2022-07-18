import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App"
import { renderWithProviders } from "./renderWithProviders";


describe('Test the App component', () => {
  it('Check if the Categories are rendering on page', async () => {
    renderWithProviders(<App />)
    const cat1 = screen.getByRole('button', { name: /All/i })
    const cat2 = screen.getByRole('button', { name: /Clothes/i })
    const cat3 = screen.getByRole('button', { name: /Tech/i })
    const all = screen.getByRole('heading', { level: 1 }).textContent
    expect(cat1).toBeInTheDocument()
    expect(cat2).toBeInTheDocument()
    expect(cat3).toBeInTheDocument()
    expect(all).toBe('All')
  });

  it('Test if the currency starts with "$"', () => {
    renderWithProviders(<App />)
    const currentCurrency = screen.getByText('$')
    expect(currentCurrency).toBeInTheDocument()
  })

  it('Test if click on currency and select Euro the currency on page changes', async () => {
    renderWithProviders(<App />)
    const currencyBtn = screen.getByTestId('btn-currencies')
    expect(currencyBtn).toBeInTheDocument()
    await userEvent.click(currencyBtn);

    const divCurrencies = screen.getByTestId('currencies-label')
    const euro = screen.getByTestId('£')
    expect(divCurrencies).toBeInTheDocument()
    expect(euro).toBeInTheDocument()
    await userEvent.click(euro)

    const newCurrency = screen.getByText('£')
    expect(newCurrency).toBeInTheDocument()
  });
})