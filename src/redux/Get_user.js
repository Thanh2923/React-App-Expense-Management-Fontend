import { useState, useEffect } from 'react';

// Custom hook để lấy và lưu thông tin người dùng từ localStorage
const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const saveUser = (newUser) => {
    localStorage.setItem('user', JSON.stringify(newUser)); // Lưu user vào localStorage
    setUser(newUser); // Cập nhật state
  };

  const removeUser = () => {
    localStorage.removeItem('user'); // Xóa user khỏi localStorage
    setUser(null); // Cập nhật state
  };

  return {
    user,
    saveUser,
    removeUser,
  };
};

export default useUser;
