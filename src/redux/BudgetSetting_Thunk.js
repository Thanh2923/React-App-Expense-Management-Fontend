// API calls: budgetAPI.js

import axios from "axios";
import { addBudgetSetting, deleteBudgetSetting, editBudgetSetting, fetchBudgetSettings } from "./SliceBudgetSetting";

export function getBudgetSettings() {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3000/budgetSettings`);
      dispatch(fetchBudgetSettings(res.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function addNewBudgetSetting(budgetSetting) {
  return async (dispatch) => {
    try {
      const res = await axios.post(`http://localhost:3000/budgetSettings`, budgetSetting);
      dispatch(addBudgetSetting(res.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateBudgetSetting(budgetSetting) {
  return async (dispatch) => {
    try {
      const res = await axios.put(`http://localhost:3000/budgetSettings/${budgetSetting.id}`, budgetSetting);
      dispatch(editBudgetSetting(res.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteBudgetSettingById(id) {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3000/budgetSettings/${id}`);
      dispatch(deleteBudgetSetting(id));
    } catch (error) {
      console.log(error);
    }
  };
}
