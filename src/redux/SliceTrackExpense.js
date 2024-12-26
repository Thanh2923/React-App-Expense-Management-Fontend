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
      state.TrackExpense.data = [...state.TrackExpense.data, action.payload.data];
    },
    editTrackExpense(state, action) {
      state.TrackExpense.data = state.TrackExpense.data.map(TrackExpense =>
        TrackExpense._id === action.payload.data._id
          ? action.payload.data  // Thay thế phần tử cũ bằng phần tử mới
          : TrackExpense  // Giữ nguyên phần tử cũ nếu không trùng khớp
      );
     
    },
    deleteTrackExpense(state, action) {
      state.TrackExpense.data = state.TrackExpense.data.filter(expense => expense._id !== action.payload.data._id);
    } }
  },
)

export const {   fetchData, addTrackExpense,  editTrackExpense,  deleteTrackExpense} = SliceTrackExpense.actions