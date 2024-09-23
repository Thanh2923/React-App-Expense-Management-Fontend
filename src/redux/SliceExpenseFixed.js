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
    addExpenseFixed(state, action) {
      state.ExpenseFixed = [...state.ExpenseFixed, action.payload];
    },
    editExpenseFixed(state, action) {
      const index = state.ExpenseFixed.findIndex(expense => expense.id === action.payload.id);
       index ?  state.ExpenseFixed[index] = action.payload : state.ExpenseFixed
       
      
    },
    deleteExpenseFixed(state, action) {
      state.ExpenseFixed = state.ExpenseFixed.filter(expense => expense.id !== action.payload);
    },
    addTatal(state,action) {
      state.Tatal = action.payload
    },
    getTatal(state) {
      const total = state.ExpenseFixed.reduce((sum, expense) => sum + expense.amount, 0);
      state.Tatal = total;
    }
  
  }
})

export const { fetchDataExpenseFixed,getTatal, addExpenseFixed, editExpenseFixed,  addTatal, deleteExpenseFixed }  = SliceExpenseFixed.actions