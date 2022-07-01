import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  loading: false,
  count: 0,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
        state.products =  action.payload;
    },
    setLoading: (state, action) => {
        state.loading = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    }
  },
})

export const { setProducts, setLoading, setCount } = productsSlice.actions

export default productsSlice.reducer