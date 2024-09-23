import axios from "axios";
import {  fetchData, addTrackExpense,  editTrackExpense,  deleteTrackExpense } from "./SliceTrackExpense";

export function getData() {
  return async (dispatch) => {
    try {
      let res = await axios.get(`http://localhost:3000/expenseTracking`);
      let data = res.data;
      dispatch(fetchData(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function addNewTrackExpense(TrackExpense) {
  return async (dispatch) => {
    try {
      let res = await axios.post(`http://localhost:3000/expenseTracking`, TrackExpense);
      let newTrackExpense = res.data;
      dispatch(addTrackExpense(newTrackExpense));
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateTrackExpense(TrackExpense) {
  return async (dispatch) => {
    try {
      let res = await axios.put(`http://localhost:3000/expenseTracking/${TrackExpense.id}`, TrackExpense); // Use PUT method here
      let updatedTrackExpense = res.data;
      dispatch(editTrackExpense(updatedTrackExpense));
    } catch (error) {
      console.log(error);
    }
  };
}
export function deleteTrackExpenseid(id) {
  return async (dispatch) => {
    try {
      let res = await axios.delete(`http://localhost:3000/expenseTracking/${id}`); // Use PUT method here
      let updatedCategory = res.data;
      dispatch(deleteTrackExpense(updatedCategory));
    } catch (error) {
      console.log(error);
    }
  };
}

