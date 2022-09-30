const Table = props => {
  console.log(props.list)
  return(
      <>
          <table width='100%'>
              <thead>
                  <tr className="bg-gray-100 p-1">
                      <th>Product Id</th>
                      <th>Item Description</th>
                      <th>Quantity</th>
                      <th>MRP</th>
                      <th>GST Rate</th>
                      <th>Discount </th>
                      <th>Unit</th>
                      <th>Amount</th>
                  </tr>
              </thead>
              <tbody>
                  
                      {props.list.map(data=>{
                          return(
                              <tr key={data.id}>
                                  <td>{data.productId}</td>
                                  <td>{data.productdesc}</td>
                                  <td>{data.quantity}</td>
                                  <td>{data.price}</td>
                                  <td>{data.gst}</td>
                                  <td>{data.discount}</td>
                                  <td>Pieces</td>
                                  <td>{data.amount}</td>
                              </tr>              
                          )
                      })}
              </tbody>
          </table>
          <div>
                <h2 className="flex items-end justify-end 
                text-gray-800 text-4xl font-bold">Total Bill Amount Rs. {props.total.toLocaleString()}</h2>
            </div>
        </>
    )
};

export default Table