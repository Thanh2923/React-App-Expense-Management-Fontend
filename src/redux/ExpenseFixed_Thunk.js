import axios from 'axios';
import { addExpenseFixed, editExpenseFixed, deleteExpenseFixed, fetchDataExpenseFixed } from './SliceExpenseFixed';
const apiUrl = process.env.VITE_API_URL;  
export function getDataExpenseFixed(email) {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${apiUrl}/fixedExpense`,
        {
          params: { email }
        }
      );
      const data = res.data;
      dispatch(fetchDataExpenseFixed(data));
    } catch (error) {
      console.error(error);
    }
  };
}
export function getTotalExpenseFixedByEmail(email) {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${apiUrl}/fixedExpense`,
        {
          params: { email }
        }
      );
      const data = res.data;
      dispatch(fetchTotalExpenseFixedByEmail(data));
    } catch (error) {
      console.error(error);
    }
  };
}

export function addNewExpense(expense) {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${apiUrl}/fixedExpense`, expense);
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
      const res = await axios.put(`${apiUrl}/fixedExpense/${expense._id}`, expense);
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
      await axios.delete(`${apiUrl}/fixedExpense/${id}`);
      dispatch(deleteExpenseFixed(id));
    } catch (error) {
      console.error(error);
    }
  };
}
