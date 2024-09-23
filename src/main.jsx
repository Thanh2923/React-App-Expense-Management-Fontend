import React from 'react'
import ReactDOM from 'react-dom/client'
import Admin from './Admin.jsx'
import UserTable from './admin/compoinents/pages/UserTable'
import './index.css'
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ExpenseFixed from './users/compoinents/pages/ExpenseFixed/ExpenseFixed.jsx'
import TableExpense from './users/compoinents/pages/Track-Expenses/Table-TrackExpense.jsx'
import TableCategorys from './users/compoinents/pages/Category/Table-Category.jsx'
import Register from './users/compoinents/pages/register.jsx'
import Login from './users/compoinents/pages/login.jsx'
import TableBudgetSettings from './users/compoinents/pages/Budget-Settings/Table-BudgetSettings.jsx'
import TableTotalExpense from './users/compoinents/pages/Total-Expense/TableTotalExpense.jsx'
import { Store } from './redux/store.js'





library.add(fas, far, fab);
const router = createBrowserRouter([
  {
    path :"/admin/",
    element : <Admin></Admin>,
    children:[
      {
        path:"UserTable",
        element: <UserTable/>
        
      },
      {
        path:"about",
        element: <h1>about</h1>
      }
    ]
  },
  {
    path :"/",
    element : <App/>,
    
    children:[
      {
        path:"ExpenseFixed",
        element: <ExpenseFixed/>
      },
      {
        path:"Track-Expense",
        element: <TableExpense/>
      },
      {
        path:"Category",
        element: <TableCategorys/>
      },
      {
        path:"Budget-Settings",
        element: <TableBudgetSettings/>
      },
      {
        path:"Total-Expense",
        element: <TableTotalExpense/>
      },
    

    ]
  },
  {
    path: "register",
    element: <Register />,
   

   
  },
  {
    path: "login",
    element: <Login />,
   
   
  },
],

);

ReactDOM.createRoot(document.getElementById("root")).render(
 <Provider store={Store}>
    <React.StrictMode>
    <Toaster position="top-right" /> 
    <RouterProvider router={router} />
  </React.StrictMode>
 </Provider>
);
