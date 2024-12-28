import axios from 'axios';
import {fetchTotal } from './SliceTotal';
const apiUrl =import.meta.env.VITE_API_URL;  

export function getTotalExpenseFixedByEmail(email) {
  return async (dispatch) => {
    try {
        let params = {};

      // Thêm email và page vào params nếu chúng tồn tại
      if (email) params.email = email;
      const res = await axios.get(`${apiUrl}/total`,
        {
          params
        }
      );
      const data = res.data;
      dispatch(fetchTotal(data));
    } catch (error) {
      console.error(error);
    }
  };
}

