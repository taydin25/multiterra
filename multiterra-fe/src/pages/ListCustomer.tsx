import { useEffect, useState } from "react";

function ListCustomer() {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/customermanagement/customers/getAllCustomers"
      );

      const data = await response.json();

      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Customer List</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>National Id</th>
            <th>Status</th>
            <th>Type</th>
            <th>Created Date</th>
            <th>Updated Date</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customerId}>
              <td>{customer.name}</td>
              <td>{customer.surname}</td>
              <td>{customer.email}</td>
              <td>{customer.nationalId}</td>
              <td>{customer.status}</td>
              <td>{customer.type}</td>
              <td>{customer.created_date}</td>
              <td>{customer.updated_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListCustomer;