import { useEffect, useState } from 'react';
import AddUserModal from './AddUser';
import EditUserModal from './EditUser';
import { useSelector,useDispatch } from 'react-redux';
import { deleteUsersId, getDataUsers } from '../../../redux/Users_Thunk';
import {  toast } from 'react-hot-toast';


const UserTable = () => {
   let users = useSelector(state=>state.Users.Users)
   let dispatch = useDispatch()

   useEffect(()=>{
    dispatch(getDataUsers())
   },[dispatch])
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  

 
 const handClickDeleteUsers= (id)=>{
       dispatch(deleteUsersId(id)).then(()=>{
        dispatch(getDataUsers())
        toast.success("Xóa thành công !")
       })
  }


  const handleOpenAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };

  const handleOpenEditUserModal = (user) => {
    setEditingUser(user);
    setIsEditUserModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleOpenAddUserModal}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Thêm Mới Chi Phí
      </button>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/4 py-2">ID</th>
            <th className="w-1/4 py-2">Tên Người Dùng</th>
            <th className="w-1/4 py-2">Mật Khẩu</th>
            <th className="w-1/4 py-2">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center border-b">
              <td className="py-2">{user.id}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">{user.password}</td>
              <td className="py-2">
                <button
                  onClick={() => handleOpenEditUserModal(user)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={()=>handClickDeleteUsers(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
       
      />

      <EditUserModal
        isOpen={isEditUserModalOpen}
        onClose={() => setIsEditUserModalOpen(false)}
       
        user={editingUser}
      />
    </div>
  );
};

export default UserTable;
