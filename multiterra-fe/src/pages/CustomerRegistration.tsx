import { useState } from "react";

function CustomerRegistration() {

  const [customer, setCustomer] = useState({
    name: "",
    surname: "",
    email: "",
    phone_number: "",
    nationalId: "",
    status: "ACTIVE",
    type: "INDIVIDUAL",

    country: "",
    city: "",
    district: "",
    address: "",
    fullAddress: "",

    username: "",
    password: ""
  });

  const registerCustomer = async () => {

    try {

      const response = await fetch(
        "http://localhost:8080/customermanagement/customers/createCustomer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(customer)
        }
      );

      if (!response.ok) {
        throw new Error("Customer creation failed");
      }

      alert("Customer created successfully");

    } catch (error) {

      console.error(error);

      alert("Customer creation failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Become a Customer</h1>

      <input
        placeholder="Name"
        onChange={(e) =>
          setCustomer({
            ...customer,
            name: e.target.value
          })
        }
      />

      <input
        placeholder="Surname"
        onChange={(e) =>
          setCustomer({
            ...customer,
            surname: e.target.value
          })
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setCustomer({
            ...customer,
            email: e.target.value
          })
        }
      />

      <input
        placeholder="Phone"
        onChange={(e) =>
          setCustomer({
            ...customer,
            phone_number: e.target.value
          })
        }
      />

      <input
        placeholder="National Id"
        onChange={(e) =>
          setCustomer({
            ...customer,
            nationalId: e.target.value
          })
        }
      />

      <input
        placeholder="Country"
        onChange={(e) =>
          setCustomer({
            ...customer,
            country: e.target.value
          })
        }
      />

      <input
        placeholder="City"
        onChange={(e) =>
          setCustomer({
            ...customer,
            city: e.target.value
          })
        }
      />

      <input
        placeholder="District"
        onChange={(e) =>
          setCustomer({
            ...customer,
            district: e.target.value
          })
        }
      />

      <input
        placeholder="Address"
        onChange={(e) =>
          setCustomer({
            ...customer,
            address: e.target.value
          })
        }
      />

      <input
        placeholder="Username"
        onChange={(e) =>
          setCustomer({
            ...customer,
            username: e.target.value
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setCustomer({
            ...customer,
            password: e.target.value
          })
        }
      />

      <br />
      <br />

      <button onClick={registerCustomer}>
        Register
      </button>
    </div>
  );
}

export default CustomerRegistration;