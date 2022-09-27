import React, { useState, useEffect } from "react";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TableForm({
  description,
  setDescription,
  quantity,
  setQuantity,
  price,
  setPrice,
  amount,
  setAmount,
  list,
  setList,
  total,
  setTotal,
  gst,
  setGst,
  offer,
  setOffer
}) {
  const [isEditing, setIsEditing] = useState(false);

  // Submit form function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !quantity || !price) {
      toast.error("Please fill in all inputs");
    } else {
      const newItems = {
        id: uuidv4(),
        description,
        quantity,
        price,
        amount,
        gst,
        offer
      };
      setDescription("");
      setQuantity("");
      setPrice("");
      setAmount("");
      setList([...list, newItems]);
      setIsEditing(false);
    }
  };

  // Calculate items amount function
  useEffect(() => {
    const calculateAmount = (amount) => {
      let totalPrice = (((quantity * price)*(gst/100)+(quantity * price))-(quantity*price*(offer/100)));
            
      setAmount(totalPrice);
    };

    calculateAmount(amount);
  }, [amount, price, quantity, setAmount, gst, setGst, offer, setOffer]);

  // Calculate total amount of items in table
  useEffect(() => {
    let rows = document.querySelectorAll(".amount");
    let sum = 0;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].className === "amount") {
        sum += isNaN(rows[i].innerHTML) ? 0 : parseInt(rows[i].innerHTML);
        setTotal(sum);
      }
    }
  });

  // Edit function
  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    setList(list.filter((row) => row.id !== id));
    setIsEditing(true);
    setDescription(editingRow.description);
    setQuantity(editingRow.quantity);
    setPrice(editingRow.price);
  };

  // Delete function
  const deleteRow = (id) => setList(list.filter((row) => row.id !== id));

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:mt-16">
          <label htmlFor="description">Item description</label>
          <input
            className="form-control"
            type="text"
            name="description"
            id="description"
            placeholder="Item description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <br></br>
        <div className="md:grid grid-cols-3 gap-10">
          <div className="flex flex-col">
            <label htmlFor="quantity">Quantity</label>
            <input
              className="form-control"
              type="text"
              name="quantity"
              id="quantity"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <br></br>
          <div className="flex flex-col">
            <label htmlFor="price">Price</label>
            <input
              className="form-control"
              type="text"
              name="price"
              id="price"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <br></br>
            {/*added*/}
            
            <div className="flex flex-col"> 
                <label>GST(%)</label>
                <input type='text' name='gst' id='gst'
                placeholder='gst' value={gst} 
                onChange={(e)=>{setGst(e.target.value)}}/>
            </div>

            {/* added */}

            {/* { subtracted } */}

            <div className="flex flex-col"> 
                <label>Offer(%)</label>
                <input type='text' name='offer' id='offer'
                placeholder='offer' value={offer} 
                onChange={(e)=>{setOffer(e.target.value)}}/>
            </div>
        
            {/* { subtracted } */}

          <div className="flex flex-col">
            <label htmlFor="amount">
              <h4>Amount</h4>
            </label>
            <p style={{ color: "green" }}>
              <h4>{amount}</h4>
            </p>
          </div>
        </div>
        <button type="submit" className="btn btn-outline-primary">
          {isEditing ? "Editing Row Item" : "Add Table Item"}
        </button>
      </form>
      <br></br>
      {/* Table items */}

      <table width="100%" className="mb-10 table table-light">
        <thead>
          <tr className="bg-gray-100 p-1">
            <td className="font-bold">Description</td>
            <td className="font-bold">Quantity</td>
            <td className="font-bold">Price</td>
            <td className="font-bold">GST(%)</td>
            <td className="font-bold">Offer(%)</td>
            <td className="font-bold">Amount</td>
            <td className="font-bold">Edit</td>
            <td className="font-bold">Delete</td>
          </tr>
        </thead>
        {list.map(({ id, description, quantity, price, amount }) => (
          <React.Fragment key={id}>
            <tbody>
              <tr className="h-10">
                <td>{description}</td>
                <td>{quantity}</td>
                <td>{price}</td>
                <td>{gst}</td>
                <td>{offer}</td>
                <td className="amount">{amount}</td>
                <td>
                  <button onClick={() => editRow(id)}>
                    <AiOutlineEdit className="text-green-500 font-bold text-xl" />
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteRow(id)}>
                    <AiFillDelete className="text-red-500 font-bold text-xl" />
                  </button>
                </td>
              </tr>
            </tbody>
          </React.Fragment>
        ))}
      </table>

      <div>
        <h5>Total Bill Amount: {total.toLocaleString()}</h5>
      </div>
    </>
  );
}
