import { useState, useEffect, useRef } from 'react';
import HeaderContainer from './HeaderContainer';
import NavigationMenu from './NavigationMenu';
import { ThemeProvider, useTheme } from './ThemeProvider';
import '../styles/default.css';
import '../styles/newbill.css';
import logoLight from '../assets/logo_light_2.jpg';
import logoDark from '../assets/logo_dark_1.jpg';
// import {newbill} from '../utils/newbill';
import Footer from './Footer';

const NewBillContent = () => {
  // Get theme from context
  const { theme, toggleTheme } = useTheme();

  // Component state for menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainContentRef = useRef(null);

  // Form state (add additional states as needed)
  const [billDate, setBillDate] = useState('');
  const [billTime, setBillTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [items, setItems] = useState([]);
  const [itemDescription, setItemDescription] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  // Outside click handler for closing menu
  useEffect(() => {
    const handleOutsideClick = (e) => {
      const menu = document.querySelector('.vertical-menu');
      const menuBtn = document.getElementById('menu-btn');
      if (
        isMenuOpen &&
        menu &&
        !menu.contains(e.target) &&
        menuBtn &&
        !menuBtn.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMenuOpen]);

  // Update main content class when menu state changes
  useEffect(() => {
    if (mainContentRef.current) {
      if (isMenuOpen) {
        mainContentRef.current.classList.add('menu-active');
      } else {
        mainContentRef.current.classList.remove('menu-active');
      }
    }
  }, [isMenuOpen]);

  // Auto-fill date and time function
  const autoFillDateTime = () => {
    const now = new Date();
    // Format to YYYY-MM-DD
    const formattedDate = now.toISOString().split('T')[0];
    // Format to HH:MM (24-hour format)
    const formattedTime = now.toTimeString().slice(0, 5);
    setBillDate(formattedDate);
    setBillTime(formattedTime);
  };

  // Handle adding an item to the items list
  const handleAddItem = () => {
    if (itemDescription && itemQuantity && itemPrice) {
      const newItem = {
        description: itemDescription,
        quantity: Number(itemQuantity),
        price: Number(itemPrice),
        total: Number(itemQuantity) * Number(itemPrice),
      };
      setItems([...items, newItem]);
      // Reset the input fields for next item
      setItemDescription('');
      setItemQuantity('');
      setItemPrice('');
    }
  };

  // Calculate grand total
  const grandTotal = items.reduce((acc, item) => acc + item.total, 0).toFixed(2);

  // Handle bill submission (you can extend this to integrate with your backend)
  const handleBillSubmit = (e) => {
    e.preventDefault();
    // Process bill data
    console.log({
      date: billDate,
      time: billTime,
      customerName,
      tableNumber,
      items,
      grandTotal,
    });
  };
  const username = "Hotel Name";
const address = {
    street: "J K Chambers First Floor, 77/83, Nagdevi Street",
    city: "Thane",
    state: "Maharashtra",
    zipcode: "400003",
    phoneno: "09833620541"
};
const GSTIN = "AB54XXXXXXXXXXX";
const FssaiNo = "XXXXXX0000X0XX";

const handlePrintBill = () => {
    // Calculate GST (assuming 18% total, split into CGST and SGST)
    const totalAmount = parseFloat(grandTotal);
    const gst = (totalAmount * 0.09); // 9% each for CGST and SGST

    const printableBill = `
        <style>
            *{margin:0; padding: 0px;}
            body { font-family: Arial, sans-serif; color: black; }
            h1, h2,p{ text-align: center;}
            table { width: 100%; border-collapse: collapse; text-align: center;}
            th, td, tbody, tfoot, thead {text-align:center; border: none; }
            th { background-color: #4a90e2; color: black; }
            .total-label { text-align: center; padding: 10px }
            .no-wrap { white-space: nowrap; }
            span{text-align: center;}
            .horizontal_line {width: 100%;height:5px;margin:10px; border-top: 2px dashed black;line-height: 80%;}
            table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 10px;
    }
    
    thead td {
        font-weight: bold;
        border-bottom: 2px dashed black;
        padding: 8px 0;
    }
    
    tbody td {
        padding: 15px 0;
        text-align: center;
    }
    
    tr td:first-child {
        text-align: left;
    }
            </style>
        <div class="horizontal_line"></div>
        <h2>${username}</h2>
        <p>GSTIN : ${GSTIN}</p>
        <p>FSSAI No : ${FssaiNo}</p>
        <div class="horizontal_line"></div>
        <p>${address.street} <br>
        ${address.city}, ${address.state} ${address.zipcode} <br>
        Phone: ${address.phoneno}
        </p>
        <div class="horizontal_line"></div>
        <p>TAX INVOICE</p>
        <span>Bill No : 1001</span><br>
        <span> Bill Date : ${billDate} </span><br>
        <span>Table Number: ${tableNumber}</span>
        <span>Time: ${billTime}</span>
        <div class="horizontal_line"></div>
        <table>
    <thead>
        <tr>
            <td style="width:30%">Description</td>
            <td style="width:20%">Quantity</td>
            <td style="width:20%">Unit Price</td>
            <td style="width:20%">Total</td>
        </tr>
    </thead>
    <div class="horizontal_line"></div>
    <tbody>
        ${items.map(item => `
            <tr>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${item.total.toFixed(2)}</td>
            </tr>
        `).join("")}
    </tbody>
</table>
        <div class="horizontal_line"></div>
        <table>
            <tfoot>
                <tr>
                    <td colspan="3" class="total-label">Items : ${items.length}</td>
                    <td colspan="3" class="total-label">Total : ${grandTotal}</td>
                </tr>
            </tfoot>
        </table>
        <div class="horizontal_line"></div>
        <div class="horizontal_line"></div>
        <span>GST Breakup Details</span>
        <div class="horizontal_line"></div>
        <table>
            <tfoot>
                <tr>
                    <td colspan="3" class="total-label">CGST : ${gst.toFixed(2)}</td>
                    <td colspan="3" class="total-label">SGST : ${gst.toFixed(2)}</td>
                    <td colspan="3" class="total-label">IGST : ${(0).toFixed(2)}</td>
                    <td colspan="3" class="total-label">Grand Total : ${(parseFloat(grandTotal) + gst + gst).toFixed(2)}</td>
                </tr>
            </tfoot>
        </table>
        <p><------------------------Amount Recd From Customer--------------------> </p>
        <p>---------------------------------------------------------------------------------------</p>
        <p>Cash : </p>
        <p>Balance Paid in Cash : </p>
        <div class="horizontal_line"></div>
        <div class="horizontal_line"></div>
    `;

    // Open a new window with the printable bill
    const printWindow = window.open("", "_blank");
    printWindow.document.write(printableBill);
    printWindow.document.close();

    // Print the bill
    printWindow.print();
};
  return (
    <div className={`new-bill ${theme}`}>
      {/* Header Component */}
      <HeaderContainer 
                theme={theme}
                toggleTheme={toggleTheme}
                logoLight={logoLight}
                logoDark={logoDark}
            />

      {/* Navigation Menu Component */}
      <NavigationMenu 
                theme={theme}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                logoLight={logoLight}
                logoDark={logoDark}
            />
      {/* Main Content */}
      <main ref={mainContentRef} className={isMenuOpen ? 'menu-active' : ''}>
        <h1 className="page-title">Generate New Bill</h1>
        <form id="bill-form" className="bill-form" onSubmit={handleBillSubmit}>
          {/* Date and Time Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                className="form-control"
                value={billDate}
                onChange={(e) => setBillDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                className="form-control"
                value={billTime}
                onChange={(e) => setBillTime(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Auto-Fill Date & Time Checkbox */}
          <div className="form-check">
            <input
              type="checkbox"
              id="auto-fill"
              className="form-check-input"
              onClick={autoFillDateTime}
            />
            <label className="form-check-label" htmlFor="auto-fill">
              Auto-Fill Date &amp; Time
            </label>
          </div>

          {/* Customer and Table Info */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="customer-name">Customer Name</label>
              <input
                type="text"
                id="customer-name"
                name="customer-name"
                className="form-control"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="table-number">Table Number</label>
              <input
                type="number"
                id="table-number"
                name="table-number"
                className="form-control"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Item Input Section */}
          <div className="item-input-section">
            <h3 className="section-title">Add Items</h3>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  id="item-description"
                  className="form-control"
                  placeholder="Item description"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  id="item-quantity"
                  className="form-control"
                  placeholder="Qty"
                  min="1"
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  id="item-price"
                  className="form-control"
                  placeholder="Price"
                  min="0"
                  step="0.1"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                />
              </div>
              <button
                type="button"
                id="add-item-btn"
                className="btn-primary"
                onClick={handleAddItem}
              >
                <span className="material-symbols-outlined">add</span> Add Item
              </button>
            </div>
          </div>

          {/* Items Table */}
          <div className="items-table-container">
            <table id="items-table" className="bill-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price.toFixed(2)}</td>
                    <td>{item.total.toFixed(2)}</td>
                    <td>
                      <button
                        type="button"
                        className="action-btn"
                        onClick={() =>
                          setItems(items.filter((_, i) => i !== index))
                        }
                      >
                        <span class="material-symbols-outlined">delete</span>Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="total-label">
                    Grand Total
                  </td>
                  <td id="grand-total">{grandTotal}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button type="submit" className="btn-success">
              <span className="material-symbols-outlined">receipt</span> Generate Bill
            </button>
            {/* Replace the existing print button with this: */}
            <button type="button" className="btn-secondary print-btn" onClick={handlePrintBill}>
                <span className="material-symbols-outlined">print</span> Print Bill
            </button>
            <button type="reset" className="btn-neutral new-bill">
              <span className="material-symbols-outlined">new_window</span> New Bill
            </button>
          </div>
        </form>
      </main>
      <Footer></Footer>
      <script src='newbill'></script>
    </div>
  );
};

const NewBillPage = () => {
  return (
    <ThemeProvider>
      <NewBillContent />
    </ThemeProvider>
  );
};

export default NewBillPage;
