import { gql } from "@apollo/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "..";

export const fetchCurrencies = createAsyncThunk(
  "currency/getAllCurrencies",
  async () => {
    const { data: { currencies } } = await client.query({
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
