
import "../css/Home.css";
function Home() {
    
  return (
<div className="home-container">

  <div className="hero-banner">
    MULTITERRA SUMMER CAMPAIGNS
  </div>

  <h1 className="welcome-title">
    Welcome to Multiterra
  </h1>

  <h2 className="section-title">
    🔥 Campaigns
  </h2>

  <div className="campaign-grid">

    <div className="campaign-card">
      <h3>Gaming Products</h3>
      <p>Up to 30% Discount</p>
    </div>

    <div className="campaign-card">
      <h3>Computer Accessories</h3>
      <p>Buy 2 Get 1 Free</p>
    </div>

    <div className="campaign-card">
      <h3>New Arrivals</h3>
      <p>Check Our Newest Products</p>
    </div>

  </div>

</div>
  );
}

export default Home;