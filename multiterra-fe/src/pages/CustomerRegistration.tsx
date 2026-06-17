import { useState } from "react";
import "../css/CustomerRegistration.css";

function CustomerRegistration() {

  const [countryCode, setCountryCode] = useState("+90");

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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(customer.email)) {

    alert("Invalid email format");

    return;
  }

  if (
    !customer.name ||
    !customer.surname ||
    !customer.email ||
    !customer.phone_number ||
    !customer.nationalId ||
    !customer.country ||
    !customer.city ||
    !customer.district ||
    !customer.address ||
    !customer.username ||
    !customer.password
  ) {
    alert("Please fill in all required fields.");
    return;
  }
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
         const errorMessage = (await response.json()).message;
         alert(errorMessage);

         return;
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

<div className="form-row">
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

      
</div>
      
<div className="form-row">
  <input
        type="email"
        placeholder="Email"
        value={customer.email}
        onChange={(e) =>
          setCustomer({
            ...customer,
            email: e.target.value
          })
        }
      />
<div className="phone-container">

  <select
    className="country-code"
    value={countryCode}
    onChange={(e) => setCountryCode(e.target.value)}
  >
    <option value="+90">🇹🇷 +90</option>
    <option value="+1">🇺🇸 +1</option>
    <option value="+44">🇬🇧 +44</option>
    <option value="+49">🇩🇪 +49</option>
    <option value="+33">🇫🇷 +33</option>
  </select>

  <input
    type="tel"
    placeholder="5XXXXXXXXX"
    maxLength={10}
    value={customer.phone_number}
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, "");

      setCustomer({
        ...customer,
        phone_number: value
      });
    }}
  />

</div>
</div>
      
<div className="form-row">
   <select
  value={customer.country}
  onChange={(e) =>
    setCustomer({
      ...customer,
      country: e.target.value,
      city: "",
      district: ""
    })
  }
>
  <option value="">Select Country</option>
  <option value="Turkey">Turkey</option>
  <option value="Germany">Germany</option>
  <option value="United Kingdom">United Kingdom</option>
</select>
  <select
  value={customer.city}
  onChange={(e) =>
    setCustomer({
      ...customer,
      city: e.target.value,
      district: ""
    })
  }
>
  <option value="">Select City</option>

  {customer.country === "Turkey" && (
    <>
      <option value="Istanbul">Istanbul</option>
      <option value="Ankara">Ankara</option>
      <option value="Izmir">Izmir</option>
      <option value="Antalya">Antalya</option>
    </>
  )}
</select>
</div>


<div className="form-row">
  <select
  value={customer.district}
  onChange={(e) =>
    setCustomer({
      ...customer,
      district: e.target.value
    })
  }
>
  <option value="">Select District</option>

  {customer.city === "Istanbul" && (
    <>
      <option value="Kadikoy">Kadikoy</option>
      <option value="Maltepe">Maltepe</option>
      <option value="Besiktas">Besiktas</option>
    </>
  )}

  {customer.city === "Ankara" && (
    <>
      <option value="Cankaya">Cankaya</option>
      <option value="Kecioren">Kecioren</option>
    </>
  )}
</select>

 <input
        placeholder="Address"
        onChange={(e) =>
          setCustomer({
            ...customer,
            address: e.target.value
          })
        }
      />
</div>

<div className="form-row">
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
</div>

     
<div className="form-row">
   <input
        placeholder="National Id"
        onChange={(e) =>
          setCustomer({
            ...customer,
            nationalId: e.target.value
          })
        }
      />
</div>
     

      <br />
      <br />

      <button 
        className="register-btn"
        onClick={registerCustomer}>
        Register
      </button>
    </div>
  );
}

export default CustomerRegistration;