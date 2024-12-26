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
      state.Category = [...state.Category, action.payload.category];
    },
    editCategory(state, action) {
      const updatedCategories = state.Category.map(category =>
        category._id === action.payload.updatedCategory._id 
          ? action.payload.updatedCategory  // Thay thế category cũ bằng category mới
          : category  // Giữ nguyên category cũ nếu không trùng khớp
      );
    
      // Trả về state mới với mảng đã cập nhật
      return {
        ...state,
        Category: updatedCategories,
      };
    },
    deleteCategory(state, action) {
      state.Category = state.Category.filter(category => category._id !== action.payload.category._id);
    },
    
  },
});

export const { fetchDataCategory, addCategory,deleteCategory, editCategory } = SliceCategory.actions;

