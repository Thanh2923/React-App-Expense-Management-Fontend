import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  budgetSettings:[],
 }

 export const SliceBudgetSetting = createSlice({
  name: 'budget',
  initialState,
  reducers:  {
    fetchBudgetSettings(state, action) {
      state.budgetSettings = action.payload;
    },
    addBudgetSetting(state, action) {
      state.budgetSettings.push(action.payload.data);
    },
    editBudgetSetting(state, action) {
      const updatedbudgetSettings = state.budgetSettings.map(budgetSettings =>
        budgetSettings._id === action.payload.data._id 
          ? action.payload.data  // Thay thế budgetSettings cũ bằng budgetSettings mới
          : budgetSettings  // Giữ nguyên budgetSettings cũ nếu không trùng khớp
      );
    
      // Trả về state mới với mảng đã cập nhật
      return {
        ...state,
        budgetSettings: updatedbudgetSettings,
      };
    },
    deleteBudgetSetting(state, action) {
      console.log(action.payload)
      state.budgetSettings = state.budgetSettings.filter(item => item._id !== action.payload);
    },

  },
})

export const { fetchBudgetSettings, addBudgetSetting, editBudgetSetting, deleteBudgetSetting }= SliceBudgetSetting.actions