import axios from "axios";
import { addCategory, deleteCategory,editCategory, fetchDataCategory } from "./SliceCategory";

export function getData() {
  return async (dispatch) => {
    try {
      let res = await axios.get(`  http://localhost:3000/categories/`);
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
      let res = await axios.post(`  http://localhost:3000/categories/`, category);
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
      let res = await axios.put(`  http://localhost:3000/categories//${category.id}`, category); // Use PUT method here
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
      let res = await axios.delete(`  http://localhost:3000/categories//${id}`); // Use PUT method here
      let updatedCategory = res.data;
      dispatch(deleteCategory(updatedCategory));
    } catch (error) {
      console.log(error);
    }
  };
}

