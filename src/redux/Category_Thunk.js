import axios from "axios";
import { addCategory, deleteCategory,editCategory, fetchDataCategory } from "./SliceCategory";

const apiUrl = import.meta.env.VITE_API_URL;  
export function getData(email) {
  return async (dispatch) => {
    try {
      let res = await axios.get(`${apiUrl}/category`, 
        {
          params: { email }
        }
      );
      let data = res.data;
      dispatch(fetchDataCategory(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function addNewCategory(category) {
  return async (dispatch) => {
    try {
      let res = await axios.post(`${apiUrl}/category`, category);
      let newCategory = res.data;
      dispatch(addCategory(newCategory));
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateCategory(category) {
  return async (dispatch) => {
    try {
      let res = await axios.put(`  ${apiUrl}/category/${category._id}`, category); // Use PUT method here
      let updatedCategory = res.data;
      dispatch(editCategory(updatedCategory));
    } catch (error) {
      console.log(error);
    }
  };
}
export function deleteCategoryId(id) {
  return async (dispatch) => {
    try {
      let res = await axios.delete(`${apiUrl}/category/${id}`); // Use PUT method here
      let data = res.data;
      dispatch(deleteCategory(data));
    } catch (error) {
      console.log(error);
    }
  };
}

