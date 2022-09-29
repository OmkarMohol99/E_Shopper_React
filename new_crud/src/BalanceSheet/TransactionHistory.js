// import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
// import axios from "axios";
import { getDataInBalancesheet } from "../AppRoutes/Database/DBServices";


const TransactionHistory = () => {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(true)

  useEffect(()=>{
    getDataFromDb()
  },[flag])


  const getDataFromDb=async()=>{
    let resp = await getDataInBalancesheet()
    setData(resp.data)
  }
  // useEffect(() => {
  //   axios.get("http://127.0.0.1:8000/expense_app/expense/").then((res) => {
  //     console.log({ res });
  //     setData(res.data.results);
  //   });
  // }, []);

  // console.log({ users });
  return (
    <>
      <h1 className="text-primary"><center>Expenses Information</center></h1>
      <div className="container">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">BalanceSheet ID</th>
              <th scope="col">Purchase Orders</th>
              <th scope="col">Customer Invoice</th>
              <th scope="col">Light Bill</th>
              <th scope="col">Employee Salary</th>
              <th scope="col">Monthly Rent</th>
              <th scope="col">Miscellaneous</th>
              <th scope="col">Date</th>
              
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((user) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{user.bs_id}</th>
                      <td>{user.purchaseorderdetails}</td>
                      <td>{user.customerinvoice}</td>
                      <td>{user.light_bill}</td>
                      <td>{user.emp_salary}</td>
                      <td>{user.monthly_rent}</td>
                      <td>{user.miscellaneous}</td>
                      <td>{user.bs_date}</td>
                      
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionHistory;
