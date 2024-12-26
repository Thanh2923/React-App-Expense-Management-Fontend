import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ExpenseFixed:[],
    Tatal :0,
 }

 export const SliceExpenseFixed = createSlice({
  name: 'ExpenseFixed',
  initialState,
  reducers: {
    fetchDataExpenseFixed(state, action) {
      state.ExpenseFixed = action.payload;
    },
    fetchTotalExpenseFixedByEmail(state, action) {
      state.ExpenseFixed = action.payload;
    },
    addExpenseFixed(state, action) {
      state.ExpenseFixed = [...state.ExpenseFixed, action.payload.data];
    },
    editExpenseFixed(state, action) {
      const updatedCategories = state.ExpenseFixed.map(ExpenseFixed =>
        ExpenseFixed._id === action.payload.data._id 
          ? action.payload.data  // Thay thế ExpenseFixed cũ bằng ExpenseFixed mới
          : ExpenseFixed  // Giữ nguyên ExpenseFixed cũ nếu không trùng khớp
      );
    
      // Trả về state mới với mảng đã cập nhật
      return {
        ...state,
        ExpenseFixed: updatedCategories,
      };
    },
    deleteExpenseFixed(state, action) {
      state.ExpenseFixed = state.ExpenseFixed.filter(expense => expense._id !== action.payload);
    },

  
  }
})

export const { fetchDataExpenseFixed,fetchTotalExpenseFixedByEmail, addExpenseFixed, editExpenseFixed, deleteExpenseFixed }  = SliceExpenseFixed.actions