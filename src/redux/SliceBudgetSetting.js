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
      state.budgetSettings.push(action.payload);
    },
    editBudgetSetting(state, action) {
      const index = state.budgetSettings.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.budgetSettings[index] = action.payload;
      }
    },
    deleteBudgetSetting(state, action) {
      state.budgetSettings = state.budgetSettings.filter(item => item.id !== action.payload);
    },

  },
})

export const { fetchBudgetSettings, addBudgetSetting, editBudgetSetting, deleteBudgetSetting }= SliceBudgetSetting.actions