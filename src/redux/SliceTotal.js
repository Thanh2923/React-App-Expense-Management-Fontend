import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    total:[],
 }

 export const SliceTotal = createSlice({
  name: 'total',
  initialState,
  reducers: {
    fetchTotal(state, action) {
      state.total = action.payload;
    },
    
  }
}
)

export const {  fetchTotal} = SliceTotal.actions