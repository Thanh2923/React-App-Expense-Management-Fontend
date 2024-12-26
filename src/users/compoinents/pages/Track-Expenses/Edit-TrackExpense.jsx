import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../../redux/Category_Thunk";
import { updateTrackExpense } from "../../../../redux/TrackExpense_Thunk";

import {  toast } from 'react-toastify';

const EditTrackExpense = ({ expense, onClose }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const [expenseName, setExpenseName] = useState(expense.name);
  const [amountInt, setAmount] = useState(expense.amountInt);
  const [date, setDate] = useState(
    expense.date ? new Date(expense.date).toISOString().split("T")[0] : ""
  );
  const [description, setDescription] = useState(expense.description);
  const [category, setCategory] = useState(expense.category);


  const handleSubmit = (e) => {
    e.preventDefault();
    let amount = parseInt(amountInt);
    dispatch(updateTrackExpense({ ...expense, name: expenseName, amountInt: amount, date, description, category }));
    toast.success("Cập nhật thành công!");
    onClose(); // Đóng modal sau khi lưu
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-lg shadow-lg transform transition-transform duration-300 scale-95 sm:scale-100"
        onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện click đóng modal khi click bên trong modal
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Chỉnh Sửa Chi Phí</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tên Chi Phí và Tiền */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="expenseName" className="block text-sm font-medium text-gray-700 mb-2">
                  Tên Chi Phí
                </label>
                <input
                  type="text"
                  id="expenseName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  placeholder="Nhập tên chi phí"
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Tiền
                </label>
                <input
                  type="number"
                  id="amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={amountInt}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Nhập số tiền"
                  required
                />
              </div>
            </div>
            {/* Ngày */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Ngày
              </label>
              <input
                type="date"
                id="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            {/* Mô Tả */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Mô Tả
              </label>
              <textarea
                id="description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập mô tả"
              />
            </div>
            {/* Chọn loại */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Chọn Loại Chi Phí
              </label>
              <select
                id="category"
                className="w-full px-4 py-2 border z-20 mb-3 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                  <option key={1} value={category}>
                    {category}
                  </option>
              
              </select>
            </div>
            {/* Nút Lưu */}
            <div className="text-center ">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTrackExpense;
