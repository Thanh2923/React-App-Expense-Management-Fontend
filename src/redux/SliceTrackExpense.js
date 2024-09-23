import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    TrackExpense:[],
 }

 export const SliceTrackExpense = createSlice({
  name: 'TrackExpense',
  initialState,
  reducers: {
    fetchData(state, action) {
      state.TrackExpense = action.payload;
    },
    addTrackExpense(state, action) {
      state.TrackExpense = [...state.TrackExpense, action.payload];
    },
    editTrackExpense(state, action) {
      const index = state.TrackExpense.findIndex(expense => expense.id === action.payload.id);
        index ? state.TrackExpense[index] = action.payload : state.TrackExpense
        
     
    },
    deleteTrackExpense(state, action) {
      state.TrackExpense = state.TrackExpense.filter(expense => expense.id !== action.payload);
    } }
  },
)

export const {   fetchData, addTrackExpense,  editTrackExpense,  deleteTrackExpense} = SliceTrackExpense.actions