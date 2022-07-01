import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './category/categorySlice'
import productsReducer from './products/productsSlice'

export const store = configureStore({
  reducer: {
      category: categoryReducer,
      products: productsReducer
  },
})