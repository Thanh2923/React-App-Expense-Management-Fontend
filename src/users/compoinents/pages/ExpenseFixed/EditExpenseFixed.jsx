import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateExpense } from '../../../../redux/ExpenseFixed_Thunk';

import {  toast } from 'react-toastify';
const EditExpenseFixed = ({ expense, onClose }) => {
  const [expenseName, setExpenseName] = useState(expense.name);
  const [amount, setAmount] = useState(expense.amount);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let amountInt = parseInt(amount)
    dispatch(updateExpense({ ...expense, name: expenseName, amount:amountInt })).then(() => {
      toast.success("Cập nhật thành công !")
      onClose(); // Close form after saving
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative lg:w-[30%] w-[70%] mx-auto bg-white shadow-md rounded-md p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Chỉnh Sửa Chi Phí Cố Định</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="expenseName">
              Tên Chi Phí
            </label>
            <input
              type="text"
              id="expenseName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              placeholder="Nhập tên chi phí"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="amount">
              Tiền
            </label>
            <input
              type="text"
              id="amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Nhập số tiền"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseFixed;
