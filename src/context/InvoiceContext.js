import React, { useState, createContext } from "react";

const InvoiceContext = createContext([{}, () => {}]);

const InvoiceProvider = (props) => {
  const [state, setState] = useState({
    approved_status: "",
    category: "",
    credit_number: "",
    customer_email: "",
    customer_id: "",
    customer_phone_number: "",
    details: {
      item1: {
        item_amount: "",
        item_code: "",
        item_description: "",
        item_price: "",
      },
    },
    invoice_number: "",
    payment_type: "",
    payments: "",
    refund: "",
    seller_name: "",
    store_address: "",
    store_city: "",
    store_id: "",
    store_name: "",
    store_phone: "",
    total_amount: "",
    transaction_date: "",
    vat: "",
    warranty: "",
  });

  return (
    <InvoiceContext.Provider value={[state, setState]}>
      {props.children}
    </InvoiceContext.Provider>
  );
};

export { InvoiceContext, InvoiceProvider };
