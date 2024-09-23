import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../redux/TrackExpense_Thunk";
import { getDataExpenseFixed } from "../../../redux/ExpenseFixed_Thunk";

const ExpenseTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
    dispatch(getDataExpenseFixed());
  }, [dispatch]);

  const TrackExpense = useSelector((state) => state.TrackExpense.TrackExpense);
  const ExpenseFixed = useSelector((state) => state.ExpenseFixed.ExpenseFixed);

  // Initialize an empty object to store the merged data
  const instate = {};

  // Loop through ExpenseFixed to populate instate with fixed expenses
  ExpenseFixed.forEach((item) => {
    if (!instate[item.email]) {
      instate[item.email] = {
        id: item.id,
        email: item.email,
        tatalExpenseFixed: 0,
        amountInt: 0,
        talal: 0,
      };
    }
    instate[item.email].tatalExpenseFixed += item.amount;
  });

  // Loop through TrackExpense to populate instate with additional expenses
  TrackExpense.forEach((expense) => {
    if (!instate[expense.email]) {
      instate[expense.email] = {
        id: expense.id,
        email: expense.email,
        tatalExpenseFixed: 0,
        amountInt: 0,
        talal: 0,
      };
    }
    instate[expense.email].amountInt += expense.amountInt;
  });

  // Calculate the total expenses for each user
  Object.values(instate).forEach((item) => {
    item.talal = item.tatalExpenseFixed + item.amountInt;
  });

  // Convert the instate object into an array for rendering
  const data = Object.values(instate);

  return (
    <div className="p-3">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-300">ID</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Email người dùng</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Chi tiêu cố định</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Chi tiêu phát sinh</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Tổng chi tiêu</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b border-gray-300">{item.id}</td>
              <td className="py-2 px-4 border-b border-gray-300">{item.email}</td>
              <td className="py-2 px-4 border-b border-gray-300">{item.tatalExpenseFixed.toLocaleString()} VND</td>
              <td className="py-2 px-4 border-b border-gray-300">{item.amountInt.toLocaleString()} VND</td>
              <td className="py-2 px-4 border-b border-gray-300">{item.talal.toLocaleString()} VND</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
