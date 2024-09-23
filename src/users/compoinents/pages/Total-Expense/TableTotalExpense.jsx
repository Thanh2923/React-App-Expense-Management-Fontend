import { useState, useEffect } from 'react';
import Chart from '../../../../admin/compoinents/chart/chart';
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../../../../redux/TrackExpense_Thunk';
import { getBudgetSettings } from '../../../../redux/BudgetSetting_Thunk';
import { getTatal } from '../../../../redux/SliceExpenseFixed';
import email from '../../../../redux/Get_email';
import { getDataExpenseFixed } from '../../../../redux/ExpenseFixed_Thunk';
const TableTotalExpense = () => {
  
  const dispatch = useDispatch();
  const TrackExpenseAll = useSelector((state) => state.TrackExpense.TrackExpense);
  const budgetSettingsAll = useSelector((state) => state.budget.budgetSettings);
  const expenseFixedAll = useSelector((state) => state.ExpenseFixed.ExpenseFixed);
  const TrackExpense = TrackExpenseAll && email 
  ? TrackExpenseAll.filter(item => item.email === email) 
  : [];
  const expenseFixed = expenseFixedAll && email 
  ? expenseFixedAll.filter(item => item.email === email) 
  : [];
  console.log(expenseFixed)
  const budgetSettings =budgetSettingsAll && email 
  ?budgetSettingsAll.filter(item => item.email === email) 
  : [];

 
  const formatNumber = (number) => {
    return number.toLocaleString('vi-VN');
  };
  useEffect(() => {
    dispatch(getData());
    dispatch(getBudgetSettings());
   dispatch(getDataExpenseFixed())
  }, [dispatch]);
 

  useEffect(() => {
    
    dispatch(getTatal());
  }, [dispatch, TrackExpense]);

  const categoryTotals = {};

  TrackExpenseAll.forEach((expense) => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category].amountInt += expense.amountInt;
    } else {
      categoryTotals[expense.category] = {
        id: expense.id,
        category: expense.category,
        amountInt: expense.amountInt,
        totalBudget: 0,
        remainingBudget: 0,
      };
    }
  });

  budgetSettingsAll.forEach((budget) => {
    let  categoryId = categoryTotals[budget.category] 
    if (categoryId) {
      categoryId.totalBudget = budget.amount;
      categoryId.remainingBudget = budget.amount - categoryId.amountInt;
    }
  });

  const uniqueExpenses = Object.values(categoryTotals);
  const totalBudget = uniqueExpenses.reduce((acc, curr) => acc + curr.totalBudget, 0);
  const totalFixedExpense = TrackExpense.reduce((acc, curr) => acc + curr.amountInt, 0);
  const totalRemainingBudget = uniqueExpenses.reduce((acc, curr) => acc + curr.remainingBudget, 0);
  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white">
        <thead className="bg-slate-600 text-white">
          <tr>
            <th className="w-1/7 py-2">ID</th>
            <th className="w-1/5 py-2">Chi tiêu</th>
            <th className="w-1/5 py-2">Danh Mục</th>
            <th className="w-1/5 py-2">Tổng ngân sách</th>
            <th className="w-1/5 py-2">Ngân Sách Còn Lại</th>
          </tr>
        </thead>
        <tbody>
          {uniqueExpenses.map((expense) => (
            <tr key={expense.category} className="text-center border-b">
              <td className="py-2">{expense.id}</td>
              <td className="py-2">{formatNumber(expense.amountInt)}</td>
              <td className="py-2">{expense.category}</td>
              <td className="py-2">{formatNumber(expense.totalBudget)}</td>
              <td className="py-2">{formatNumber(expense.remainingBudget)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <tfoot className="justify-between w-full mt-5 flex text-white">
       
        <div className="bg-blue-400 w-1/3 font-bold text-center py-2">
          Tổng Ngân Sách: {formatNumber(totalBudget)} VNĐ
        </div>
      
      </tfoot>
      <tfoot className="justify-between w-full mt-5 flex text-white">
        <div className="bg-blue-400 w-1/3 font-bold text-center py-2">
          Tổng Chi Tiêu: {formatNumber( totalFixedExpense)} VNĐ
        </div>
        <div className="bg-blue-400 w-1/3 font-bold text-center py-2">
          Tổng Ngân Sách Còn Lại: {formatNumber(totalRemainingBudget)} VNĐ
        </div>
      
      </tfoot>
      <Chart />
    </div>
  );
};

export default TableTotalExpense;
