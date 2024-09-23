import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Category: [],
};

export const SliceCategory = createSlice({
  name: 'Category',
  initialState,
  reducers: {
    fetchDataCategory(state, action) {
      state.Category = action.payload;
    },
    addCategory(state, action) {
      state.Category = [...state.Category, action.payload];
    },
    editCategory(state, action) {
      const index = state.Category.findIndex(category => category.id === action.payload.id);
      index ? state.Category[index] = action.payload : state.Category
      
      
    },
    deleteCategory(state, action) {
      state.Category = state.Category.filter(category => category.id !== action.payload);
    },
    
  },
});

export const { fetchDataCategory, addCategory,deleteCategory, editCategory } = SliceCategory.actions;

