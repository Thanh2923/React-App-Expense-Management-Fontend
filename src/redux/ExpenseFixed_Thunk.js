import axios from 'axios';
import { addExpenseFixed, editExpenseFixed, deleteExpenseFixed, fetchDataExpenseFixed } from './SliceExpenseFixed';

export function getDataExpenseFixed() {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3000/fixedExpenses`);
      const data = res.data;
      dispatch(fetchDataExpenseFixed(data));
    } catch (error) {
      console.error(error);
    }
  };
}

export function addNewExpense(expense) {
  return async (dispatch) => {
    try {
      const res = await axios.post(`http://localhost:3000/fixedExpenses`, expense);
      const newExpense = res.data;
      dispatch(addExpenseFixed(newExpense));
    } catch (error) {
      console.error(error);
    }
  };
}

export function updateExpense(expense) {
  return async (dispatch) => {
    try {
      const res = await axios.put(`http://localhost:3000/fixedExpenses/${expense.id}`, expense);
      const updatedExpense = res.data;
      dispatch(editExpenseFixed(updatedExpense));
    } catch (error) {
      console.error(error);
    }
  };
}

export function deleteExpenseId(id) {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3000/fixedExpenses/${id}`);
      dispatch(deleteExpenseFixed(id));
    } catch (error) {
      console.error(error);
    }
  };
}
