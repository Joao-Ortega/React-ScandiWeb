import { gql } from "@apollo/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "..";

export const fetchCurrencies = createAsyncThunk(
  "currency/getAllCurrencies",
  async () => {
    const {
      data: { currencies },
    } = await client.query({
      query: gql`
        query getCurrencies {
          currencies {
            label
            symbol
          }
        }
      `,
    });
    return currencies;
  }
);

export const fetchAllProducts = createAsyncThunk("products/getAllProducts", async () => {
  const { data: { category: { products } } } = await client.query({
    query: gql`
      query getProducts {
        category(input: { title: "all" }) {
          name
          products {
            id
            name
            inStock
            gallery
            description
            category
            attributes {
              name
              items {
                value
              }
            }
            prices {
              currency {
                label
                symbol
              }
              amount
            }
            brand
          }
        }
      }
    `,
  });
  return products;
});
