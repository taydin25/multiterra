import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../config/api.ts";

function App() {

  const [customer, setCustomer] = useState({
  customerId: "",
  name: "",
  surname: "",
  email: "",
  phone_number: "",
  addressId: "",
  nationalId: "",
  status: "",
  type: "",
  created_date: "",
  updated_date: ""
});
  const [nationalId, setNationalId] = useState("");

 /*const createCustomer = async () => {

    const createRequest = {
    name: customer.name,
    surname: customer.surname,
    email: customer.email,
    phone_number: customer.phone_number,
    addressId: customer.addressId,
    nationalId: customer.nationalId,
    status: customer.status,
    type: customer.type
  };
  try {
    const response = await fetch(
      "http://localhost:8080/customermanagement/customers/createCustomer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(createRequest)
      }
    );

    if (!response.ok) {
      throw new Error("Create customer failed");
    }

    const data = await response.json();

    alert("Customer created successfully");
    console.log(data);

    setCustomer(data);
  } catch (error) {
    console.error(error);
    alert("Customer creation failed");
  }
};*/
  
  const findCustomer = async () => {
  try {
    const response = await fetch(
      `${API_URLS.CUSTOMER}/customers/getCustomerByNationalId/${nationalId}`
    );

    if (!response.ok) {
      throw new Error("Customer not found");
    }

    const data = await response.json();

    setCustomer(data);
  } catch (error) {
    console.error(error);
  }
};


 const navigate = useNavigate();

  const listCustomers = () => {
    navigate("/customers/list");
  };

  const updateCustomer = () => {
    console.log("Update Customer:", nationalId);
  };

  const deleteCustomer = () => {
    console.log("Delete Customer:", nationalId);
  };

  return (
  <div style={{ padding: "20px" }}>
    <h1>Customer Management</h1>

    <input
      type="text"
      placeholder="National Id"
      value={nationalId}
      onChange={(e) => setNationalId(e.target.value)}
    />

    <br />
    <br />

    
    <button onClick={findCustomer}>Find Customer</button>
    <button onClick={listCustomers}>List Customers</button>
    <button onClick={updateCustomer}>Update Customer</button>
    <button onClick={deleteCustomer}>Delete Customer</button>

    <hr />

   {customer && (
  <table
    style={{
      marginTop: "20px",
      borderCollapse: "collapse",
      width: "100%",
    }}
  >
    <tbody>
      <tr><td>Customer Id</td><td>{customer.customerId}</td></tr>
      <tr><td>Name</td><td>{customer.name}</td></tr>
      <tr><td>Surname</td><td>{customer.surname}</td></tr>
      <tr><td>Email</td><td>{customer.email}</td></tr>
      <tr><td>Phone</td><td>{customer.phone_number}</td></tr>
      <tr><td>Address Id</td><td>{customer.addressId}</td></tr>
      <tr><td>National Id</td><td>{customer.nationalId}</td></tr>
      <tr><td>Status</td><td>{customer.status}</td></tr>
      <tr><td>Type</td><td>{customer.type}</td></tr>

      <tr>
        <td>Created Date</td>
        <td>
          {new Date(customer.created_date).toLocaleString("tr-TR")}
        </td>
      </tr>

      <tr>
        <td>Updated Date</td>
        <td>
          {new Date(customer.updated_date).toLocaleString("tr-TR")}
        </td>
      </tr>
    </tbody>
  </table>
)}
<div style={{ marginBottom: "20px" }}>
  <input
    placeholder="Name"
    value={customer.name}
    onChange={(e) =>
      setCustomer({ ...customer, name: e.target.value })
    }
  />

  <input
    placeholder="Surname"
    value={customer.surname}
    onChange={(e) =>
      setCustomer({ ...customer, surname: e.target.value })
    }
  />

  <input
    placeholder="Email"
    value={customer.email}
    onChange={(e) =>
      setCustomer({ ...customer, email: e.target.value })
    }
  />

  <input
    placeholder="Phone Number"
    value={customer.phone_number}
    onChange={(e) =>
      setCustomer({ ...customer, phone_number: e.target.value })
    }
  />

  <input
    placeholder="Address Id"
    value={customer.addressId}
    onChange={(e) =>
      setCustomer({ ...customer, addressId: e.target.value })
    }
  />

  <input
    placeholder="National Id"
    value={customer.nationalId}
    onChange={(e) =>
      setCustomer({ ...customer, nationalId: e.target.value })
    }
  />
  <select
  value={customer.status}
  onChange={(e) =>
    setCustomer({ ...customer, status: e.target.value })
  }
>
  <option value="ACTIVE">ACTIVE</option>
  <option value="INACTIVE">INACTIVE</option>
</select>

<select
  value={customer.type}
  onChange={(e) =>
    setCustomer({ ...customer, type: e.target.value })
  }
>
  <option value="INDIVIDUAL">INDIVIDUAL</option>
  <option value="CORPORATE">CORPORATE</option>
</select>
</div>
  </div>
  
);
}

export default App;
