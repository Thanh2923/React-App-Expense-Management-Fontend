import axios from "axios";
import {  fetchData, addTrackExpense,  editTrackExpense,  deleteTrackExpense } from "./SliceTrackExpense";
const apiUrl = process.env.VITE_API_URL;  
export function getData({ email, page,limit }) {
  return async (dispatch) => {
    try {
      let params = {};

      // Thêm email và page vào params nếu chúng tồn tại
      if (email) params.email = email;
      if (page) params.page = page;
      if (limit) params.limit = limit;

      // Gửi yêu cầu với params
      let res = await axios.get(`${apiUrl}/expenseTracking`, { params });

      let data = res.data;
      dispatch(fetchData(data)); // Gửi dữ liệu tới reducer
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
}

export function addNewTrackExpense(dataExpense) {
  return async (dispatch) => {
    try {
      let res = await axios.post(`${apiUrl}/expenseTracking`, dataExpense);
      let newTrackExpense = res.data;
      dispatch(addTrackExpense(newTrackExpense));
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateTrackExpense(updatedData) {
  return async (dispatch) => {
    try {
      let res = await axios.put(`${apiUrl}/expenseTracking/${updatedData._id}`, updatedData); // Use PUT method here
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
      let res = await axios.delete(`${apiUrl}/expenseTracking/${id}`); // Use PUT method here
      let updatedCategory = res.data;
      dispatch(deleteTrackExpense(updatedCategory));
    } catch (error) {
      console.log(error);
    }
  };
}

