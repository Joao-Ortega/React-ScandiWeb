export const products = {
  allProducts: [
    {
      id: 'Sneaker',
      name: 'Adidas',
      inStock: true,
      gallery: ["https://i.zst.com.br/thumbs/12/1f/36/1999215933.jpg"],
      description: "<p>Great Sneakers for run</p>",
      category: "clothes",
      attributes: [
        {name: "Size", items: [{ value: "41" }]},
      ],
      prices: [
        {currency: { label: "USD", symbol: "$" }, amount: 144.69},
        {currency: { label: "GBP", symbol: "£" }, amount: 104},
      ],
      brand: "Adidas"
    },
    {
      id: 'Xbox one',
      name: 'Video game',
      inStock: true,
      gallery: ["https://i.zst.com.br/thumbs/12/1f/36/1999215933.jpg"],
      description: "<p>Console</p>",
      category: "tech",
      attributes: [
        {name: "Capacity", items: [{ value: "1T" }]},
      ],
      prices: [
        {currency: { label: "USD", symbol: "$" }, amount: 350.99},
        {currency: { label: "GBP", symbol: "£" }, amount: 200},
      ],
      brand: "Microsoft"
    }
  ]
}