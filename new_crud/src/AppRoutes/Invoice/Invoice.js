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

const baseURL = "http://127.0.0.1:8088/invoice"


function Invoice() {
  // const [name, setName] = useState("")
  // const [address, setAddress] = useState("")
  // const [email, setEmail] = useState("")
  // const [phone, setPhone] = useState("")
  // const [bankName, setBankName] = useState("")
  // const [bankAccount, setBankAccount] = useState("")
  // const [website, setWebsite] = useState("")
  const [clientId, setClientName] = useState("");
  const [gross_cost, setGrossCost] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [gst, setGst] = useState(0); //added
  const [offer, setOffer] = useState(0);
  const [width] = useState(641);
  


  const componentRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  async function createPost () {
    let result = await axios.post(baseURL, {
      invoice_id : invoiceNumber,
      customer: clientId,
      gross_cost: 0,
      tax_amount: 0,
      discount: offer,
      net_amount:0,
      payment_mode:"cash",
      transction_id:11122,
      invoice_date:invoiceDate,
      total_amount:total, 
    })
    console.log(result)
  }
   


  useEffect(() => {
    if (window.innerWidth < width) {
      alert("Place your phone in landscape mode for the best experience");
    }
  }, [width]);

  return (
    <>
      {/* <div className="container">
        <p className="text-white font-bold uppercase tracking-widest">Beta</p>
      </div> */}
      <main className="container">
        <section>
          <h2 className="text-primary">Customer Invoice:</h2>
          <div className="bg-white p-5 rounded shadow ">
            {/* name, address, email, phone, bank name, bank account number, website client name, client address, invoice number, invoice date, due date, notes */}
            <div className="container">
              {/* <article className="md:grid grid-cols-2 gap-10"> */}
              {/* <div className="flex flex-col">
                  <label htmlFor="name">Your full name</label>
                  <input className='form-control'
                    type="text"
                    name="text"
                    id="name"
                    placeholder="Enter your name"
                    autoComplete="off"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="address">Enter your address</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Enter your address"
                    autoComplete="off"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </article> */}

              {/* <article className="md:grid grid-cols-3 gap-10">
                <div className="flex flex-col">
                  <label htmlFor="email">Enter your email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="website">Enter your website</label>
                  <input
                    type="url"
                    name="website"
                    id="website"
                    placeholder="Enter your website"
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="phone">Enter your phone</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Enter your phone"
                    autoComplete="off"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </article>

              <article className="md:grid grid-cols-2 gap-10">
                <div className="flex flex-col">
                  <label htmlFor="bankName">Enter your bank name</label>
                  <input
                    type="text"
                    name="bankName"
                    id="bankName"
                    placeholder="Enter your bank name"
                    autoComplete="off"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="bankAccount">
                    Enter your bank account number
                  </label>
                  <input
                    type="text"
                    name="bankAccount"
                    id="bankAccount"
                    placeholder="Enter your bank account number"
                    autoComplete="off"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                  />
                </div>
              </article> */}

              <article className="md:grid grid-cols-2 gap-10 md:mt-16">
                <div className="flex flex-col">
                  <label htmlFor="invoice_id">Invoice Number:</label>
                  <input
                    className="form-control"
                    type="number"
                    name="invoice_id"
                    id="invoice_id"
                    placeholder="Invoice ID"
                    autoComplete="off"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </div>
                <br></br>
                <div className="flex flex-col">
                  <label htmlFor="customer">Customer</label>
                  <input
                    className="form-control"
                    type="number"
                    name="customer"
                    id="customer"
                    placeholder="Customer ID"
                    autoComplete="off"
                    value={clientId}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>
                <br></br>
                <div className="flex flex-col">
                  <label htmlFor="gross_cost">Gross Cost</label> 
                  <input
                    className="form-control"
                    type="number"
                    name="gross_cost"
                    id="gross_cost"
                    value={gross_cost}
                    onChange={(e) => setGrossCost(e.target.value)}
                  />
                </div>
              </article>
              <br></br>

              <article className="md:grid grid-cols-3 gap-10">
                {/* <br></br> */}
                <div className="flex flex-col">
                  <label htmlFor="invoiceDate">Invoice Date:</label>
                  <input
                    className="form-control"
                    type="date"
                    name="invoiceDate"
                    id="invoiceDate"
                    placeholder="Invoice Date"
                    autoComplete="off"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </div>
                <br></br>
                <div className="flex flex-col">
                  <label htmlFor="dueDate">Due Date:</label>
                  <input
                    className="form-control"
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    placeholder="Invoice Date"
                    autoComplete="off"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </article>
              <br></br>
              {/* This is our table form */}
              <article>
                <TableForm
                  description={description}
                  setDescription={setDescription}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  price={price}
                  setPrice={setPrice}
                  amount={amount}
                  setAmount={setAmount}
                  list={list}
                  setList={setList}
                  total={total}
                  setTotal={setTotal}
                    //added
                  gst={gst}
                  setGst={setGst}
                  offer={offer}
                  setOffer={setOffer}
                   //added
                />
              </article>

              {/* <label htmlFor="notes">Additional Notes</label> */}
              <textarea
                name="notes"
                id="notes"
                cols="132"
                rows="10"
                placeholder="Additional notes to the client"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>

              {/* <button
              onClick={() => setShowInvoice(true)}
              className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
            >
              Preview Invoice
            </button> */}
            </div>
          </div>
        </section>
        <br></br>

        {/* Invoice Preview */}

        <div className="invoice__preview bg-white p-5 rounded">
          <ReactToPrint
            trigger={() => (
              <button className="btn btn-outline-primary">
                Print / Download
              </button>
               
              
            )}
            content={() => componentRef.current}
          />
          <button onClick={createPost}>SAVE</button> 
          <div ref={componentRef} className="p-5">
            <Header handlePrint={handlePrint} />

            <MainDetails />

            <ClientDetails
              
            />

            <Dates
              invoiceNumber={invoiceNumber}
              invoiceDate={invoiceDate}
              dueDate={dueDate}
            />

            <Table
              description={description}
              quantity={quantity}
              price={price}
              amount={amount}
              list={list}
              setList={setList}
              total={total}
              setTotal={setTotal}
            />

            <Notes notes={notes} />

            <Footer
            // name={name}
            // address={address}
            // website={website}
            // email={email}
            // phone={phone}
            // bankAccount={bankAccount}
            // bankName={bankName}
            />
          </div>
          {/* <button
            onClick={() => setShowInvoice(false)}
            className="mt-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
          >
            Edit Information
          </button> */}
        </div>
      </main>
    </>
  );
}
export default Invoice;
