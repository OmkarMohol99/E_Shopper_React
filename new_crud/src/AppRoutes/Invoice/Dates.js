// export default function Dates({ invoiceNumber, invoiceDate, dueDate }) {
//     return (
//       <>
//         <article className="mt-10 mb-14 flex items-end justify-end">
//           <ul>
//             <li className="p-1 ">
//               <span className="font-bold">Invoicer number:</span> {invoiceNumber}
//             </li>
//             <li className="p-1 bg-gray-100">
//               <span className="font-bold">Invoice date:</span> {invoiceDate}
//             </li>
//             <li className="p-1 ">
//               <span className="font-bold">Due date:</span> {dueDate}
//             </li>
//           </ul>
//         </article>
//       </>
//     )
//   }


const Dates = (props) => {
  return(
      <>
          <article className='mt-10 mb-14 flex items-end justify-end'>
              <ul>
                  <li className="p-1 "><span className='font-bold'>Invoice number: </span>{props.invoiceNumber}</li>
                  <li className="bg-gray-100 p-1"><span className='font-bold'>Invoice Date: </span>{props.invoiceDate}</li>
                  <li className="p-1 "><span className='font-bold'>Due Date: </span>{props.dueDate}</li>
              </ul>
          </article>
      </>
  )
};

export default Dates
  