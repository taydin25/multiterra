import { useEffect, useState } from "react";
import { isLoggedIn } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
   const customerId = localStorage.getItem("customerId");
const navigate = useNavigate();
useEffect(() => {

  if (!isLoggedIn()) {

    navigate("/login");

    return;
  }

  loadProfile();

}, []);

   const [passwordData, setPasswordData] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: ""
});

  const [customer, setCustomer] = useState<any>({});

  useEffect(() => {

    loadProfile();

  }, []);

const changePassword = async () => {

  if (
    passwordData.newPassword !==
    passwordData.confirmPassword
  ) {

    alert("Passwords do not match");

    return;
  }

  try {

    const customerId =
      localStorage.getItem("customerId");

    const response = await fetch(
      `http://localhost:8080/customermanagement/customers/changePassword/${customerId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(passwordData)
      }
    );

    if (!response.ok) {

      const error =
        await response.text();

      alert(error);

      return;
    }

    alert("Password updated successfully");

  } catch (error) {

    console.error(error);

  }
};

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
       
      <h2>Update Profile</h2>
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
       <h1></h1>
      <h2>Change Password</h2>

<input
  type="password"
  placeholder="Current Password"
  value={passwordData.currentPassword}
  onChange={(e) =>
    setPasswordData({
      ...passwordData,
      currentPassword: e.target.value
    })
  }
/>

<input
  type="password"
  placeholder="New Password"
  value={passwordData.newPassword}
  onChange={(e) =>
    setPasswordData({
      ...passwordData,
      newPassword: e.target.value
    })
  }
/>

<input
  type="password"
  placeholder="Confirm Password"
  value={passwordData.confirmPassword}
  onChange={(e) =>
    setPasswordData({
      ...passwordData,
      confirmPassword: e.target.value
    })
  }
/>

<button onClick={changePassword}>
  Change Password
</button>

     

    </div>
  );
}

export default Profile;