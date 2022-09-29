import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { registerUser } from "../Database/DBService";
import Calcomp from "../AppRoutes/calendar/CalComp";

function Expenses() {
  // const [data, setData] = useState();
  const { register, handleSubmit, reset } = useForm();
  // console.log({ data });

  // const getRegisterUser = (userObj) => {
  //   registerUser(userObj);
  //   reset();
  // };
     
  const [selectedDate, setSelectedDate] = useState(null)

  const onSubmit = async(data) => {
    console.log("submit called",data);
    // return await axios.post("http://127.0.0.1:8000/product/", data).then(() => {});
  };

 
  // useEffect(()=>{
  //   axios.get(url).then((res)=>{
  //     setData = res.data()
  //   })
  // },[])

  return (
    <>

      <h1 className="text-primary"><center>Add Expenses</center></h1>
      <div className="row col-md-4">
        <form onSubmit={handleSubmit(onSubmit)} enctype = "multipart/form-data">
          
          <div class="mb-3">
            <label class="form-label">bs_id</label>
            <input
              type="number"
              class="form-control"
              placeholder="BalanceSheet Id"
              {...register("bs_id")}
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Purchase Orders</label>
            <input
              type="text"
              class="form-control"
              placeholder="Purchase Orders "
              {...register("purchaseorderdetails")}
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Customer Invoice</label>
            <input
              type="number"
              class="form-control"
              placeholder="customer Invoice"
              {...register("customerinvoice")}
            />
          </div>
          
          <div class="mb-3">
            <label class="form-label">Light Bill</label>
            <input
              type="number"
              class="form-control"
              placeholder="light bill"
              {...register("light_bill")}
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Employee Salary</label>
            <input
              type="number"
              class="form-control"
              placeholder="Salary"
              {...register("emp_salary")}
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Monthly Rent</label>
            <input
              type="number"
              class="form-control"
              placeholder="monthly rent"
              {...register("monthly_rent")}
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Miscellaneous</label>
            <input
              type="number"
              class="form-control"
              placeholder="miscellaneous"
              {...register("miscellaneous")}
            />
          </div>
          <div className='App'>
          <label>Date</label>
           <Calcomp
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
             monthPlaceholder
             />      
           </div>
           <br></br>
        
          <div class="mb-3 text-center">
            <input
              type="submit"
              class="btn btn-outline-success"
              value="Add Expenses"
             
              onClick={handleSubmit(onSubmit)}
            />
          </div>
          
        </form>
      </div>

    </>
  );
}

export default Expenses;