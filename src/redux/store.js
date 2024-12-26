import { configureStore } from '@reduxjs/toolkit'
import { combineSlices } from '@reduxjs/toolkit'
import { SliceBudgetSetting } from './SliceBudgetSetting'
import { SliceExpenseFixed } from './SliceExpenseFixed'
import { SliceTrackExpense } from './SliceTrackExpense'
import { SliceCategory } from './SliceCategory'
import { SliceUsers } from './SliceUsers'
import { SliceTotal } from './SliceTotal'

const Reducer = combineSlices(SliceBudgetSetting,SliceUsers,SliceExpenseFixed,SliceTrackExpense,SliceTotal,SliceCategory)
export const Store = configureStore({
    reducer : Reducer
})