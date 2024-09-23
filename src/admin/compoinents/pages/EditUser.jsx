import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUsers } from '../../../redux/Users_Thunk';
import {  toast } from 'react-hot-toast';

const EditUser = ({ isOpen, onClose, onSave, user }) => {
  const [email, setemail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');
  let dispatch =useDispatch()
  useEffect(() => {
    if (user) {
      setemail(user.email);
      setPassword(user.password);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
   dispatch(updateUsers({ ...user, email, password }));
   toast.success("Cập nhật thành công!");

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded  w-[40%] shadow-lg">
        <h2 className="text-xl mb-4">Chỉnh Sửa Người Dùng</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Tên Người Dùng</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
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

export default EditUser;
