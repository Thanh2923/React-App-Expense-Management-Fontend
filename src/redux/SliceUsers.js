import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 Users: [],
};

export const SliceUsers = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    fetchDataUsers(state, action) {
      state.Users = action.payload;
    },
    addUsers(state, action) {
      state.Users = [...state.Users, action.payload];
    },
    editUsers(state, action) {
      const index = state.Users.findIndex(users => users.id === action.payload.id);
        index ? state.Users[index] = action.payload : state.Users
      
    },
    deleteUsers(state, action) {
      state.Users = state.Users.filter(users => users.id !== action.payload);
    },
    
  },
});

export const { fetchDataUsers,deleteUsers, addUsers,editUsers } = SliceUsers.actions;

