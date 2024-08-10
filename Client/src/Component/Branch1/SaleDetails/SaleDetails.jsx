import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './SaleDetails.css';

const SaleDetails = () => {
  const { id } = useParams();
  const [sale, setSale] = useState(null);

  useEffect(() => {
    const fetchSaleDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/shala/sale-details/${id}`);
        console.log('API Response:', response.data); // Log response for debugging
        const saleData = response.data;

        if (typeof saleData.product_details === 'string') {
          saleData.products = JSON.parse(saleData.product_details);
        } else {
          saleData.products = saleData.product_details;
        }

        setSale(saleData);
      } catch (error) {
        console.error('Error fetching sale details:', error);
      }
    };

    if (id) {
      fetchSaleDetails();
    }
  }, [id]);

  if (!sale) {
    return <div>Loading...</div>;
  }

  // Calculate the total for each product and the final total
  const finalTotal = sale.products.reduce((total, product) => {
    const productTotal = product.sale_price * product.quantity;
    return total + productTotal;
  }, 0);

  return (
    <div className="sale-details-container">
      <button onClick={() => window.print()} className="print-bill-button">
        Print Bill
      </button>
      <h2 id='scc'>New Eye Care</h2>
      <h6 className='ho'>Optics & Contact Lense Clinic</h6>
      <p className='add'>Add: S.No. 34/2 Gurudware Chowk, Balaji Nagar, 
        <br></br>Near Akurdi Railway Station, Pune-411033</p>
      <p className='em'>8669309353 Email: neweyecare1@gmail.com</p>
<hr></hr>
      <div className="customer-info">
        <div>
          <strong>Customer Name:</strong> {sale.customer_name}
        </div>
        <div>
          <strong>Customer Phone Number:</strong> {sale.customer_phone}
        </div>
        <div>
          <strong>Sales Date:</strong> {new Date(sale.created_at).toLocaleDateString('en-GB')}
        </div>
        
      </div>

      <div className="products-section">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Sale Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {sale.products.map((product, index) => {
              const productTotal = product.sale_price * product.quantity;
              return (
                <tr key={index}>
                  <td>{product.product_name}</td>
                  <td>{product.sale_price}</td>
                  <td>{product.quantity}</td>
                  <td>{productTotal.toFixed(2)}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan="3" className="total-label">Final Total:</td>
              <td className="final-total">{finalTotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="sale-summary-row">
        <div>
          <strong>Discount %:</strong> {sale.order_discount}
        </div>
        <div>
          <strong>Payment Mode:</strong> {sale.payment_method}
        </div>
        <div>
          <strong>Amount Paid:</strong> {sale.paid}
        </div>
      </div>
<hr></hr>
      <p className='th'>Thank you for your purchase</p>
      <p className='te'>Technopuls Softwares | Contact: +918669048580</p>
    </div>
  );
};

export default SaleDetails;
