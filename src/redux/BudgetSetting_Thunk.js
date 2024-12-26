// API calls: budgetAPI.js

import axios from "axios";
import { addBudgetSetting, deleteBudgetSetting, editBudgetSetting, fetchBudgetSettings } from "./SliceBudgetSetting";
const apiUrl = import.meta.env.VITE_API_URL;  
export function getBudgetSettings(email) {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${apiUrl}/budgetSettings`,
        {
          params: { email }
        }
      );
      dispatch(fetchBudgetSettings(res.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function addNewBudgetSetting(budgetSetting) {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${apiUrl}/budgetSettings`, budgetSetting);
      dispatch(addBudgetSetting(res.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateBudgetSetting(budgetSetting) {
  return async (dispatch) => {
    try {
      const res = await axios.put(`${apiUrl}/budgetSettings/${budgetSetting._id}`, budgetSetting);
      dispatch(editBudgetSetting(res.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteBudgetSettingById(id) {
  return async (dispatch) => {
    try {
      await axios.delete(`${apiUrl}/budgetSettings/${id}`);
      dispatch(deleteBudgetSetting(id));
    } catch (error) {
      console.log(error);
    }
  };
}
