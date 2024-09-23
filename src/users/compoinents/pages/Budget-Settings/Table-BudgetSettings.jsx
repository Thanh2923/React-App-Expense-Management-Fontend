// TableBudgetSettings.js

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgetSettings, deleteBudgetSettingById } from '../../../../redux/BudgetSetting_Thunk'
import AddTrackExpense from './AddTrackExpense';
import EditTrackExpense from './EditTrackExpense';
import {  toast } from 'react-hot-toast';
import email from '../../../../redux/Get_email';
const TableBudgetSettings = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const dispatch = useDispatch();
  const budgetSettingsAll = useSelector((state) => state.budget.budgetSettings);
   const budgetSettings = budgetSettingsAll && email 
    ? budgetSettingsAll.filter(item => item.email === email) 
    : [];
  const formatNumber = (number) => {
    return number.toLocaleString('vi-VN');
  };
  useEffect(() => {
    dispatch(getBudgetSettings());
  }, [dispatch]);

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleDelete = (id) => {
    dispatch(deleteBudgetSettingById(id));
    toast.success("Xóa thành công !")
  };

  const handleSave = (updatedExpense) => {
    setEditingExpense(null);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => setShowForm(true)}
        className="bg-amber-500 text-white px-4 py-2 mb-6 rounded mr-2"
      >
        Thêm Mới Ngân Sách
      </button>
      {showForm && <AddTrackExpense onClose={() => setShowForm(false)} />}
      {editingExpense && (
        <EditTrackExpense
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onSave={handleSave}
        />
      )}
      <table className={`min-w-full bg-white ${showForm || editingExpense ? 'opacity-50' : ''}`}>
        <thead className="bg-slate-600 text-white">
          <tr>
            <th className="w-1/7 py-2">ID</th>
            <th className="w-1/5 py-2">Ngân Sách Danh Mục</th>
            <th className="w-1/5 py-2">Tiền</th>
            <th className="w-1/4 py-2">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {budgetSettingsAll.map((expense) => (
            <tr key={expense.id} className="text-center border-b">
              <td className="py-2">{expense.id}</td>
              <td className="py-2">{expense.category}</td>
              <td className="py-2">{formatNumber(expense.amount)}</td>
              <td className="py-2 flex">
                <button
                  onClick={() => handleEdit(expense)}
                  className="bg-slate-600 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBudgetSettings;
