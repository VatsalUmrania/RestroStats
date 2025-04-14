document.addEventListener("DOMContentLoaded", function () {
    const addItemBtn = document.getElementById("add-item-btn");
    const itemDescription = document.getElementById("item-description");
    const itemQuantity = document.getElementById("item-quantity");
    const itemPrice = document.getElementById("item-price");
    const itemsTableBody = document.querySelector("#items-table tbody");
    const grandTotalCell = document.getElementById("grand-total");
    const billForm = document.getElementById("bill-form");
    const customerName = document.getElementById("customer-name");
    const tableNumber = document.getElementById("table-number");
    const printBtn = document.querySelector(".print-btn");
    const newBtn = document.querySelector(".new-bill");
    let Gst = 0;
    let grandTotal = 0;
    let totalitem = 0;
    newBtn.addEventListener("click" ,function(){
        location.reload();
    })
    // Function to add an item to the table
    addItemBtn.addEventListener("click", function () {
        const description = itemDescription.value.trim();
        const quantity = parseInt(itemQuantity.value);
        const price = parseFloat(itemPrice.value);

        if (!description || isNaN(quantity) || isNaN(price)) {
            alert("Please fill in all fields correctly.");
            return;
        }
        totalitem++;
        const total = quantity * price;
        grandTotal += total;
        gst = 0.025*grandTotal;
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <tr id="itemRow$">
                <td>${description}</td>
                <td>${quantity}</td>
                <td>${price.toFixed(2)}</td>
                <td>${total.toFixed(2)}</td>
                <td><button class="remove-btn">Remove</button></td>
            </tr>
        `;

        itemsTableBody.appendChild(newRow);
        grandTotalCell.textContent = grandTotal.toFixed(2);

        // Disable Customer Name & Table Number Input
        customerName.disabled = true;
        tableNumber.disabled = true;

        // Clear input fields
        itemDescription.value = "";
        itemQuantity.value = "";
        itemPrice.value = "";

        // Add event listener to remove button
        newRow.querySelector(".remove-btn").addEventListener("click", function () {
            const rowTotal = parseFloat(newRow.querySelector("td:nth-child(4)").textContent);
            grandTotal -= rowTotal;
            grandTotalCell.textContent = grandTotal.toFixed(2);
            newRow.remove();
        });
    });

    // Function to handle form submission
    billForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting and reloading the page

        // Get form data
        const customerName = document.getElementById("customer-name").value;
        const tableNumber = document.getElementById("table-number").value;
        const items = [];

        // Collect all items from the table
        itemsTableBody.querySelectorAll("tr").forEach(row => {
            const description = row.querySelector("td:nth-child(1)").textContent;
            const quantity = row.querySelector("td:nth-child(2)").textContent;
            const price = row.querySelector("td:nth-child(3)").textContent;
            const total = row.querySelector("td:nth-child(4)").textContent;

            items.push({
                description,
                quantity: parseInt(quantity),
                price: parseFloat(price),
                total: parseFloat(total),
            });
        });

        // Create the bill object
        const bill = {
            customerName,
            tableNumber,
            items,
            grandTotal: parseFloat(grandTotalCell.textContent),
        };

        // Log the bill object (you can replace this with an API call to save the bill)
        console.log("Generated Bill:", bill);

        // Optionally, display a success message
        alert("Bill generated successfully!");

    });

    // Function to generate printable bill
    printBtn.addEventListener("click", function () {
        const customerName = document.getElementById("customer-name").value;
        const tableNumber = document.getElementById("table-number").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const items = [];

        // Collect all items from the table
        itemsTableBody.querySelectorAll("tr").forEach(row => {
            const description = row.querySelector("td:nth-child(1)").textContent;
            const quantity = row.querySelector("td:nth-child(2)").textContent;
            const price = row.querySelector("td:nth-child(3)").textContent;
            const total = row.querySelector("td:nth-child(4)").textContent;

            items.push({
                description,
                quantity,
                price,
                total,
            });
        });
        username = "Hotel Name"
        const address = {
            street : "J K Chambers First Floor, 77/83, Nagdevi Street",
            city : "Thane",
            state : "Maharashtra",
            zipcode : "400003",
            phoneno : "09833620541"
        }
        
        GSTIN = "AB54XXXXXXXXXXX"
        FssaiNo = "XXXXXX0000X0XX"
        // Create a printable bill HTML
        const printableBill = `
            <style>
                *{margin:0; padding : 0px;}
                body { font-family: Arial, sans-serif; color: black; }
                h1, h2,p{ text-align: center;}
                table { width: 100%; border-collapse: collapse; text-align: center;}
                th, td, tbody , tfoot ,thead {text-align:center; border: none; }
                th { background-color: #4a90e2; color: black; }
                .total-label { text-align: center;padding : 10px }
                .no-wrap { white-space: nowrap; }
                span{text-align: center;}
                .horizontal_line {width: 100%;height:5px;margin:10px;  border-top: 2px dashed black;line-height: 80%;}
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
            <span> Bill Date : ${date} </span><br>
            <span>Table Number: ${tableNumber}</span>
            <span>Time: ${time}</p>
            <div class="horizontal_line"></div>
            <table>
                <tbody>
                    <tr>
                        <td style="width:30%">Description</td>
                        <td style="width:20%">Quantity</td>
                        <td style="width:20%">Unit Price</td>
                        <td style="width:20%">Total</td>
                    </tr> 
                </tbody>
            </table>
            <div class="horizontal_line"></div>
            <table>
                <tbody>
                    ${items.map(item => `
                        <tr>
                            <td>${item.description}</td>
                            <td>${item.quantity}</td>
                            <td>${item.price}</td>
                            <td>${item.total}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
            <div class="horizontal_line"></div>
            <table>
                <tfoot>
                    <tr>
                        <td colspan="3" class="total-label">Items : ${totalitem}</td>
                        <td colspan="3" class="total-label">Total : ${grandTotalCell.textContent}</td>
                    </tr>
                </tfoot>
            </table>
            <div class="horizontal_line"></div>
            <div class="horizontal_line"></div>
            <span>GST Breakup Details<span>
            <div class="horizontal_line"></div>
            <table>
                <tfoot>
                    <tr>
                        <td colspan="3" class="total-label">CGST : ${gst.toFixed(2)}</td>
                        <td colspan="3" class="total-label">SGST : ${gst.toFixed(2)}</td>
                        <td colspan="3" class="total-label">IGST : ${(0).toFixed(2)}</td>
                        <td colspan="3" class="total-label">Grand Total : ${(grandTotal+gst+gst).toFixed(2)}</td>
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
    });
});

// Function to auto-fill date and time
    function autoTickDateTime() {
        let currentDate = new Date();
        let formattedDate = currentDate.toISOString().split('T')[0];
        let formattedTime = currentDate.toTimeString().split(' ')[0].substring(0, 5);
        document.getElementById('date').value = formattedDate;
        document.getElementById('time').value = formattedTime;
    }


    