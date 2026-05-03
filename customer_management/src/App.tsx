import Message from "./Message";

function App() {
  const name = "Tunahan";
  if (name === "Tunahan") {
    return <div className="App">Hello {name}</div>;
  }
  return (
    <div className="App">
      <Message />
    </div>
  );
}

export default App;
