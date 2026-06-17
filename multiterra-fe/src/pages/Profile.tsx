import { useEffect, useState } from "react";

function Profile() {
   const customerId = localStorage.getItem("customerId");

  const [customer, setCustomer] = useState<any>({});

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile = async () => {

    try {
      
      const response = await fetch(
        `http://localhost:8080/customermanagement/customers/${customerId}`
      );

      const data = await response.json();

      setCustomer(data);

    } catch (error) {

      console.error(error);

    }
  };

  const updateProfile = async () => {

    try {

      const response = await fetch(
        `http://localhost:8080/customermanagement/customers/updateCustomer/${customerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(customer)
        }
      );

      if (!response.ok) {

        alert("Update failed");

        return;
      }

      alert("Profile updated successfully");

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div className="profile-container">

      <h1>My Profile</h1>

      <input
        value={customer.name || ""}
        onChange={(e) =>
          setCustomer({
            ...customer,
            name: e.target.value
          })
        }
      />

      <input
        value={customer.surname || ""}
        onChange={(e) =>
          setCustomer({
            ...customer,
            surname: e.target.value
          })
        }
      />

      <input
        value={customer.email || ""}
        onChange={(e) =>
          setCustomer({
            ...customer,
            email: e.target.value
          })
        }
      />

      <input
        value={customer.phone_number || ""}
        onChange={(e) =>
          setCustomer({
            ...customer,
            phone_number: e.target.value
          })
        }
      />

      <textarea
        value={customer.address || ""}
        onChange={(e) =>
          setCustomer({
            ...customer,
            address: e.target.value
          })
        }
      />

      <button onClick={updateProfile}>
        Update Profile
      </button>

    </div>
  );
}

export default Profile;