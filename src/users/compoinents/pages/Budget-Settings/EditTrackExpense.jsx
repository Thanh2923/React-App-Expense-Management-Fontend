// EditTrackExpense.js
import {  toast } from 'react-hot-toast';

import { useState, useEffect } from 'react';
import { updateBudgetSetting } from '../../../../redux/BudgetSetting_Thunk';
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../../../../redux/Category_Thunk';
import email from '../../../../redux/Get_email';
const EditTrackExpense = ({ expense, onClose }) => {
  const [category, setCategory] = useState(expense.category);
  const [amount, setAmount] = useState(expense.amount);
  const dispatch = useDispatch();
  const Categoryq = useSelector((state)=>state.Category.Category)
  const Category =Categoryq && email 
  ? Categoryq.filter(item => item.email === email) 
  : [];
  useEffect(() => {
    dispatch(getData())
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBudgetSetting({ ...expense, category, amount: parseFloat(amount) }));
    toast.success("Cập nhật thành công !")
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-[30%] mx-auto bg-white shadow-md rounded-md p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Chỉnh Sửa Ngân Sách</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="category">
              Chọn loại chi phí
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            >
              {Category.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
             
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="amount">
              Tiền
            </label>
            <input
              type="number"
              id="amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Nhập số tiền"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Lưu Ngân Sách
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTrackExpense;
