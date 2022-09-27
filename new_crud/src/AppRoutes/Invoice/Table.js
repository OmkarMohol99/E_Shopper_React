import React from "react";

export default function Table({ list, total }) {
  console.log(list)
  return (
    <>
      <table width="100%" className="mb-10 table table-light">
        <thead>
          <tr className="bg-gray-100 p-1">
            <td className="font-bold">Description</td>
            <td className="font-bold">Quantity</td>
            <td className="font-bold">Price</td>
            <td className="font-bold">GST(%)</td>
            <td className="font-bold">Offer(%)</td>
            <td className="font-bold">Amount</td>
          </tr>
        </thead>
        {list.map(({ id, description, quantity, price, gst, offer, amount }) => (
          <React.Fragment key={id}>
            <tbody>
              <tr className="h-10">
                <td>{description}</td>
                <td>{quantity}</td>
                <td>{price}</td>
                <td>{gst}</td>
                <td>{offer}</td>
                <td>{amount}</td>
              </tr>
            </tbody>
          </React.Fragment>
        ))}
      </table>

      <div>
        <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">
          Total Bill Amount: {total.toLocaleString()}
        </h2>
      </div>
    </>
  );
}
