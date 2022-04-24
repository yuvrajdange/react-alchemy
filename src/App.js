import "./App.css";
import ProductList from "./Components/ProductList";
import EditProduct from "./Components/EditProduct";
import Addproduct from "./Components/Addproduct";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="container body-content">
      <Router>
        <Switch>
          <Route path="/" exact component={Addproduct} />
          <Route path="/editProduct/:id" exact component={EditProduct} />
          <Route path="/productList" exact component={ProductList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
