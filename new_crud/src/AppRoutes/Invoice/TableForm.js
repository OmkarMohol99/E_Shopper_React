import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlineEdit } from 'react-icons/ai';
import axios from "axios";


const TableForm = ({amount, setAmount,description, setDescription,
quantity, setQuantity, price, setPrice, list, setList, total, setTotal,
gst, setGst, baseURL1, discount, setDiscount, productId, setProductId}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [productdesc, setProductDesc] = useState('');
    const [quantity1, setQuantity1] = useState('')

    const productdetailsHandler = async (event) => {
          let result = await axios.get(baseURL1)
        //   console.log(result.data)
        // console.log(event.target.value, typeof(event.target.value))
        const index = (result.data.findIndex((element)=> element.p_id === +event.target.value ))
        
        if ((index) !== -1){
            setQuantity1(result.data[index].product_stock);
            setProductDesc(result.data[index].p_name);
            setGst(result.data[index].gst);
            setDiscount(result.data[index].discount)
            setProductId(event.target.value);
            setPrice(result.data[index].p_price);}
        else {
            setPrice('');  
            setQuantity('');
            setProductDesc('');
            setDiscount('')
            setGst('')
        }
        };

    const handleSubmit = e => {
        e.preventDefault()
        if (!description && !quantity && !price ){
            alert("Please fill in all inputs")
        }
        else {
            const newItems = {
                id: Math.random().toString(),
                // description,
                quantity,
                price,
                amount,
                gst,
                discount,
                productId,
                productdesc
                
            }
            async function updateQuantity(){
                console.log(baseURL1, productId)
                let result = await axios.patch(`http://127.0.0.1:8000/api/products/${productId}/`, {
                    product_stock: quantity1 -quantity
                })
                console.log(result.data)
              }
              updateQuantity();
            setDescription('');
            setAmount('');
            setQuantity('');
            setPrice('');
            setGst('')
            setDiscount('')
            setProductDesc('')
            setProductId(null)
            setList([...list, newItems])
            setIsEditing(false)    
        
        }
    }
    
    useEffect(() => {
        const calculateAmount = amount => {
            let totalPrice1 = ((quantity * price)*(gst/100)+(quantity * price));
            let totalPrice2 = totalPrice1 - (totalPrice1 * (discount/100))
            setAmount(totalPrice2);
        }
        calculateAmount(amount)
    }, [price, amount, setAmount, quantity, gst, setGst, discount, setDiscount])

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
        setGst(editingRow.gst);
        setDiscount(editingRow.discount)
        setProductId(editingRow.productId)
    }

    const deleteRow = id => {
        setList(list.filter((data)=>data.id !== id    
        ))
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <label>Product ID</label>
                <input type='number' name='product_id' id='product_id'
                placeholder='product_id' onChange={productdetailsHandler}
                value={productId} 
                />
            </div>
            <div className="md:grid grid-cols-3 gap-10">
            <div className="flex flex-col">
                <label>Quantity</label>
                <input type='number' name='quantity' id='quantity'
                placeholder='quantity' value={quantity}
                onChange={(e)=>setQuantity(e.target.value)}
                />
                <p>Total avaialable stocks: {quantity1}</p>
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
                <input type='text' name='price' id='price'
                placeholder='Price' value={price} 
                />
            </div>

            

            <div className="flex flex-col"> 
                <label>GST</label>
                <input type='text' name='gst' id='gst'
                placeholder='gst' value={gst} 
                />
            </div>

            <div className="flex flex-col"> 
                <label>Discount</label>
                <input type='text' name='discount' id='discount'
                placeholder='discount' value={discount} 
                />
            </div>

            

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
                        <tr className="bg-gray-200">
                            <th>ProductId</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Gst</th>
                            <th>Discount</th>
                            <th>Amount</th>    
                        </tr>
                    </thead>
                    
                    {list.map((data=>{
                        return(
                            <React.Fragment key={data.id}>
                                <tbody>
                                    <tr>
                                        <td>{data.productId}</td>
                                        <td>{data.productdesc}</td>
                                        <td>{data.quantity}</td>
                                        <td>{data.price}</td>
                                        <td>{data.gst}</td>
                                        <td>{data.discount}</td>
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
                    <h2 className="flex items-end justify-end 
                text-gray-800 text-4xl font-bold">Total Amount Rs. {total.toLocaleString()}</h2>
                </div>
                
                
                
        </>
    )
};

export default TableForm;