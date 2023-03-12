import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Form from "./components/Main/Form/Form";
import TopCart from "./components/Main/TopCart/TopCart";
import Transactions from "./components/Main/Transactions/Transactions";
import "./style.css";
function App() {
  return (
    <div className="App">
      <Header></Header>

      <div className="main">
        <div className="container">
          <TopCart></TopCart>
          <Form></Form>
          <Transactions></Transactions>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
