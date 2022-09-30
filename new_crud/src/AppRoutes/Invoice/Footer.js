

const Footer = props => {
  return(
      <>
          <footer className="footer border-t-2 border-gray-300 pt-5">
          <ul className='flex flex-wrap items-center justify-center'>
              <li><span className='font-bold'>Shop Name:</span>E-Shopper</li>
              <li><span className='font-bold'>Email Address:</span>e_shoppeer@gmail.com</li>
              <li><b>Phone number:</b>123456789</li>
              <li><span className='font-bold'>Bank:</span>ICICI</li>
              <li><span className='font-bold'>Account Holder:</span>E-Shopper</li>
              <li><span className='font-bold'>Account Number</span>12345678</li>
              <li><span className='font-bold'>Website:</span><a href="https://eshopper.global/en/"
              target='_blank' rel="noopenner noreferrer">www.e_shopper.com</a></li>
          </ul>
          </footer>
      </>
  )
};

export default Footer