import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlineEdit } from 'react-icons/ai';
import axios from "axios";


const TableForm = ({amount, setAmount,description, setDescription,
quantity, setQuantity, price, setPrice, list, setList, total, setTotal,
gst, setGst, offer, setOffer, baseURL1}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [productdesc, setProductDesc] = useState('')

    const productdetailsHandler = async (event) => {
          let result = await axios.get(baseURL1)
        //   console.log(result.data)
        // console.log(event.target.value, typeof(event.target.value))
        const index = (result.data.findIndex((element)=> element.p_id === +event.target.value ))
        
        if ((index) === -1){
            setPrice('');
            setQuantity('');
            setProductDesc('');
            
        }
        console.log(result.data)
        setPrice(result.data[index].p_price);
        setQuantity(result.data[index].product_stock);
        setProductDesc(result.data[index].p_name);
        }

        
    
    const handleSubmit = e => {
        e.preventDefault()

        if (!description && !quantity && !price ){
            alert("Please fill in all inputs")
        }
        else {
            const newItems = {
                id: Math.random().toString(),
                productdesc,
                quantity,
                price,
                amount,
                gst
            }

            

        
    
            setDescription('');
            setAmount('');
            setQuantity('');
            setPrice('');
            setGst('')
            setList([...list, newItems])
            console.log(list)
            setIsEditing(false)
        
        }

        
    }

    

    useEffect(() => {
        const calculateAmount = amount => {
            let totalPrice = ((quantity * price)*(gst/100)+(quantity * price)-(quantity*price*(gst/100)));
            
            setAmount(totalPrice);
        }
        calculateAmount(amount)
    }, [price, amount, setAmount, quantity, gst, setGst])

    useEffect(()=>{
        let rows = document.querySelectorAll(".amount")
        let sum = 0

    for(let i = 0; i < rows.length; i++){
        if(rows[i].className === 'amount'){
            sum += isNaN(rows[i].innerHTML) ? 0 : parseInt(rows[i].innerHTML) 
            setTotal(sum)
        }
    }
})


    const editRow = id => {
        const editingRow = list.find((row) => row.id === id)
        setList(list.filter((data)=>data.id !== id))
        setIsEditing(true)
        setDescription(editingRow.description);
        setQuantity(editingRow.quantity);
        setPrice(editingRow.price);

    }

    const deleteRow = id => {
        setList(list.filter((data)=>data.id !== id
        
        ))
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <label>Product Id</label>
                <input type='number' name='description' id='description'
                placeholder='product id' onChange={productdetailsHandler} 
                />
            </div>
            <div className="md:grid grid-cols-3 gap-10">
            <div className="flex flex-col">
                <label>Quntity</label>
                <input type='text' name='quantity' id='quantity'
                placeholder='Item Description' value={quantity} 
                />
            </div>
            <div className="flex flex-col">
                <label>Product description</label>
                <input type='text' name='desc' id='desc'
                placeholder='Product description' 
                value={productdesc}
                />
            </div>
            <div className="flex flex-col">
                <label>Price</label>
                <input type='text' name='p_price' id='p_price'
                placeholder='Price' value={price} 
                />
            </div>

            {/*added*/}

            <div className="flex flex-col"> 
                <label>GST(%)</label>
                <input type='text' name='gst' id='gst'
                placeholder='gst' value={gst} 
                onChange={(e)=>{setGst(e.target.value)}}/>
            </div>

            <div className="flex flex-col"> 
                <label>Offer(%)</label>
                <input type='number' name='offer' id='offer'
                placeholder='offer' value={offer} 
                onChange={(e)=>{setOffer(e.target.value)}}/>
            </div>

            {/* added */}

            <div className="flex flex-col">
                <label>Amount</label>
                <p>{amount}</p>
            </div>
            </div>
            <button type="submit" className='mb-5 bg-blue-500 text-white
              font-bold py-2 px-8 rounded shadow
              border-2 border-blue-500
              hover:bg-transparent hover:text-blue-500
              transition-all duration-300'>{isEditing ? 'Editing Row Item' :
              'Add Table Item'}</button>
            </form>
                <table width='100%' className="mb-10">
                    <thead>
                        <tr className="bg-gray-100">
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Gst(%)</th>
                            <th>Offer(%)</th>
                            <th>Amount</th>
                            
                        </tr>
                    </thead>
                    
                    {list.map((data=>{
                        return(
                            <React.Fragment key={data.id}>
                                <tbody>
                                    <tr>
                                        <td>{data.productdesc}</td>
                                        <td>{data.quantity}</td>
                                        <td>{data.price}</td>
                                        <td>{data.gst}</td>
                                        <td>{data.offer}</td>
                                        <td className="amount">{data.amount}</td>
                                        <td><button onClick={() => deleteRow(data.id)}><RiDeleteBin6Line className="text-red-500 font-bold text-xl" /></button></td>
                                        <td>
                                            <button onClick={()=> editRow(data.id)}>
                                                <AiOutlineEdit className="text-green-500 font-bold text-xl" />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </React.Fragment>
                        )
                    }))}
      </table>

      <div>
        <h5>Total Bill Amount: {total.toLocaleString()}</h5>
      </div>
    </>
  );
}

export default TableForm