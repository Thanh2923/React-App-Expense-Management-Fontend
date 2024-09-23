import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewUsers } from '../../../redux/Users_Thunk';
import {  toast } from 'react-hot-toast';

const AddUser = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addNewUsers({ email, password }));
      toast.success("Thêm người dùng thành công!");
      setEmail('');
      setPassword('');
      onClose();
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      
      <div className="bg-white p-4 rounded shadow-lg w-[40%]">
        <h2 className="text-xl mb-4">Thêm Người Dùng</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Mật Khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Đóng
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
