import React, { useState } from 'react';

const LoginReminder = ({isVisible,setIsVisible}) => {
    const handleClose = () => {
        setIsVisible(false); // Đóng thông báo khi nhấn nút "X"
      };
 

  return (
    <>
    {isVisible===true ?  <div className="fixed top-0 left-0 w-full bg-red-500 text-white p-4 text-center shadow-md z-50">
      <p>
        Bạn chưa đăng nhập, vui lòng <a href="/login" className="underline font-bold">đăng nhập</a>.
        <button 
          onClick={handleClose} 
          className="ml-4 text-white text-lg font-bold"
        >
          X
        </button>
      </p>
    </div> : ""}
    </>
   
  );
};

export default LoginReminder;
