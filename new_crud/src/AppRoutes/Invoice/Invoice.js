import React from "react";
import { useState, useRef, useEffect } from "react";
import Dates from "./Dates";
import Footer from "./Footer";
import Header from "./Header";
import MainDetails from "./MainDetails";
import Notes from "./Notes";
import Table from "./Table";
import TableForm from "./TableForm";
import ReactToPrint from "react-to-print";
import ClientDetails from "./ClientDetails";
import axios from "axios";
import './Invoice.css';




// const baseURL = "http://127.0.0.1:8088/invoice"

// const url1 = "http://127.0.0.1:8000/api/invoice2/" 


const baseURL = "http://127.0.0.1:8000/api/invoice2/"   //to post invoice data

const baseURL1 = "http://127.0.0.1:8000/api/products/"   // to get product details

const baseURL2 = "http://127.0.0.1:8000/api/customer/"   //to get customer details

const baseURL3 = "http://127.0.0.1:8000/api/orders/" //patch method to update the product quantity 


function App() { 
  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0,10);
   const [showInvoice, setShowInvoice] = useState(false);
  //  const [name, setName] = useState('');
  //  const [address, setAddress] = useState('');
  //  const [email, setEmail] = useState('');
  //  const [phone, setPhone] = useState('');
  //  const [website, setWebsite] = useState('');
  //  const [bankName, setBankName] = useState('');
  //  const [bankAccount, setBankAccount] = useState('');
   const [clientName, setClientName] = useState('');
   const [clientAddress, setClientAddess] = useState('');
   const [invoiceNumber, setInvoiceNumber] = useState('');
   const [invoiceDate, setInvoiceDate] = useState(date);
   const [dueDate, setDueDate] = useState(date);
   const [description, setDescription] = useState('');
   const [quantity, setQuantity] = useState('');
   const [price, setPrice] = useState('');
   const [amount, setAmount] = useState('');
   const[list, setList] = useState([]);
   const [total, setTotal] = useState(0);
   const [gst, setGst] = useState('')
   const [discount, setDiscount] = useState('')//added
   const [productId, setProductId] = useState(null)//added
   
  
   const componentRef = useRef()
  
  
    const handleSubmit = () => {
      window.print()
    }
  
    // "invoice_id": 2,
    //       "gross_cost": 6786734.0,
    //       "tax_amount": 0.0,
    //       "net_amount": 0.0,
    //       "payment_mode": "cash",
    //       "transaction_id": null,
    //       "invoice_date": "2022-09-30T00:00:00Z",
    //       "customer": 32
    let totalGrossCost = 0
    let totalTaxAmount = 0
    async function createPost () {
      for (let i = 0; i < list.length; i++){
        totalGrossCost += list[i].price
        totalTaxAmount += ((list[i].quantity)*(list[i].price))*((list[i].gst)/100)
      }
      console.log(list)
      
      let result = await axios.post(baseURL, {
        invoice_id: +invoiceNumber,
        gross_cost: totalGrossCost,
        tax_amount: totalTaxAmount,
        net_amount: total,
        payment_mode: "cash",
        transaction_id: null,
        invoice_date: invoiceDate,
        customer: 32
      })
      console.log(result)
  
      for (let i = 0; i <list.length ; i++){
        let result2 = await axios.post(baseURL3, {
          // order_id: Math.floor(+list[i].id *1000),
          quantity: list[i].quantity,
          customerinvoice: invoiceNumber,
          discountorder: 2,
          product: list[i].productId})
          console.log(result2.data)
      }
    }
  
    const clientdetailsHandler = async (event) => {
      let result = await axios.get(baseURL2)
    //   console.log(result.data)
    // console.log(event.target.value, typeof(event.target.value))
    const index = (result.data.findIndex((element)=> element.c_id === +event.target.value ))
    
    if ((index) === -1){
       setClientName('')
       setClientAddess('')
        
    }
    console.log(result.data)
    setClientName(result.data[index].c_name)
    setClientAddess(result.data[index].c_address)
    }
  
    // const productdetailsHandler = async () => {
    //   let result = await axios.get(baseURL1)
    //   console.log(result.data)
    // }
  
  
  
  
    return (
      <>
        <main className='p-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shandow'>
          <h1 className='font-bold text-xl uppercase md:text-4xl my-5'><u>E-Shopper</u></h1>
          {showInvoice &&
          <>
          <ReactToPrint trigger={()=> <button  className='bg-blue-500 text-white font-bold py-2 px-8 rounded shadow
                          border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 
                          transition-all duration-300 mb-5'>Print</button>}
          content={() => componentRef.current} />
          <button onClick={()=>{
        
            setList([])
            setTotal("")
            setShowInvoice(false)
            setClientAddess('')
            setClientName('')
          }}
                          className='bg-gray-300 text-gray font-bold mx-10 py-2 px-8 rounded shadow
                          border-2 border-gray-500 hover:bg-transparent hover:text-gray-500 
                          transition-all duration-300'>New Invoice 
                          </button>
                          <button onClick={createPost} className='bg-blue-200 text-gray font-bold mx-10 py-2 px-8 rounded shadow
                          border-2 border-gray-500 hover:bg-transparent hover:text-gray-500 
                          transition-all duration-300'>SAVE</button> 
                      </>}
          {showInvoice ? (
          <>
            <div ref={componentRef} className='p-5'>
          <Header hanldePrint={handleSubmit} />
          <MainDetails  />
          <ClientDetails  etails clientName={clientName} clientAddress={clientAddress} />
          <Dates invoiceNumber={invoiceNumber} invoiceDate={invoiceDate} dueDate={dueDate} />
          <Table description={description} 
          quantity={quantity} 
          price={price}
          amount={amount}
          total={total}
          setTotal={setTotal}
          list={list}
          setList={setList} />
          <Notes />
          <Footer  />
          
          </div>
          <button onClick={()=> setShowInvoice(false)} 
          className='bg-blue-500 text-white
          font-bold py-2 px-8 rounded shadow
          border-2 border-blue-500
          hover:bg-transparent hover:text-blue-500
          transition-all duration-300'>Edit information</button>
          </>) : (
            <>
              <div className='flex flex-col justify-center'>
  
              <label htmlFor='clientId'>Client Id</label>
              <input type='number' name='clientId' id='clientId'
              placeholder='Client Id'
              autoComplete='off'
              onChange={clientdetailsHandler}
              />

              <label htmlFor='clientName'>Enter Your Client Name</label>
              <input type='text' name='clientName' id='clientName'
              placeholder='Enter your Bank Client Name'
              autoComplete='off' 
              value={clientName}
              />

              <label htmlFor='clientAddress'>Enter Your Client Address</label>
              <input type='text' name='clientAddress' id='clientAddress' 
              placeholder='Enter your Bank Client Address'
              autoComplete='off' 
              value={clientAddress}
              />
  
                <label htmlFor='invoiceNumber'>Enter Your Invoice Number</label>
                <input type='text' name='invoiceNumber' id='invoiceNumber'
                placeholder='Enter your Bank Invoice Number'
                autoComplete='off' 
                value={invoiceNumber}
                onChange={(e)=>setInvoiceNumber(e.target.value)}/>
  
                
  
                <label htmlFor='invoiceDate'>Enter Your Invoice Date</label>
                <input type='date' name='invoiceDate' id='invoiceDate'
                placeholder='Enter your invoice Date'
                autoComplete='off' 
                value={invoiceDate}
                onChange={(e)=>setInvoiceDate(e.target.value)}/>
  
                <label htmlFor='dueDate'>Enter Due Date</label>
                <input type='date' name='dueDate' id='dueDate'
                placeholder='Enter your Due date'
                autoComplete='off' 
                value={dueDate}
                onChange={(e)=>setDueDate(e.target.value)}/>
  
                <article>
                  <TableForm description={description} setDescription={setDescription}
                  quantity={quantity} setQuantity={setQuantity}
                  price={price} setPrice={setPrice}
                  amount={amount} setAmount={setAmount}
                  list={list}
                  setList={setList}
                  total={total}
                  setTotal={setTotal}
                  
                  gst={gst}
                  setGst={setGst}
                  baseURL1={baseURL1}
                  //added//
                  discount={discount}
                  setDiscount={setDiscount}
                  productId={productId}
                  setProductId={setProductId}
                  //added//
                  
                  />
                </article>
  
                
                <button onClick={()=> setShowInvoice(true)} 
                className='mt-5 bg-blue-500 text-white
                font-bold py-2 px-8 rounded shadow
                border-2 border-blue-500
                hover:bg-transparent hover:text-blue-500
                transition-all duration-300'>
                  Preview Invoice
                </button>
              </div>
            </>
          )}  
        </main>
      </>
    );
  }
  
  export default App;