import axios from "axios";
import { addUsers, deleteUsers, editUsers, fetchDataUsers } from "./SliceUsers";


export function getDataUsers() {
    return async (dispatch) => {
      try {
        let res = await axios.get(`http://localhost:3000/users` );
        let Users = res.data;
        dispatch(fetchDataUsers(Users));
      } catch (error) {
        console.log(error);
      }
    };
  }

  export function deleteUsersId(id) {
    return async (dispatch) => {
      try {
        let res = await axios.delete(`http://localhost:3000/users/${id}`); // Use PUT method here
        let users = res.data;
        dispatch(deleteUsers(users));
      } catch (error) {
        console.log(error);
      }
    };
  }


  export function addNewUsers(Users) {
    return async (dispatch) => {
      try {
        let res = await axios.post(`http://localhost:3000/users`, Users);
        let newUsers = res.data;
        dispatch(addUsers(newUsers));
      } catch (error) {
        console.log(error);
      }
    };
  }
  

  export function updateUsers(Users) {
    return async (dispatch) => {
      try {
        let res = await axios.put(`http://localhost:3000/users/${Users.id}`, Users); // Use PUT method here
        let updatedUsers = res.data;
        dispatch(editUsers(updatedUsers));
      } catch (error) {
        console.log(error);
      }
    };
  }