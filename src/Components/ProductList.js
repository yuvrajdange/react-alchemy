import React from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const BaseapiUrl = "http://localhost:6600/product";
class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productss: [],
      IsApiError: false,
      query: "",
      data: [],
      filteredData: [],
    };
  }

  componentDidMount() {
    fetch(BaseapiUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            productss: result,
          });
        },
        (error) => {
          this.setState({ IsApiError: true });
        }
      );
    this.getData();
  }
  async deletepro(id) {
    const { productss } = this.state;

    await fetch("http://localhost:6600/product/" + id, {
      method: "DELETE",
    })
      .then(async (response) => {
        const data = await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        this.setState({
          productss: productss.filter((proloyee) => proloyee.id !== id),
        });
        alert("Delete successful");
      })
      .catch((error) => {
        alert("There was an error!");
        console.error("There was an error!", error);
      });
    this.getData();
  }

  handleInputChange = (event) => {
    const query = event.target.value;

    this.setState((prevState) => {
      const filteredData = prevState.data.filter((element) => {
        return element.productName.toLowerCase().includes(query.toLowerCase());
      });

      return {
        query,
        filteredData,
      };
    });
  };

  getData = () => {
    fetch("http://localhost:6600/product/")
      .then((response) => response.json())
      .then((data) => {
        const { query } = this.state;
        const filteredData = data.filter((element) => {
          return element.productName
            .toLowerCase()
            .includes(query.toLowerCase());
        });

        this.setState({
          data,
          filteredData,
        });
      });
  };

  render() {
    var productsslist = this.state.filteredData;
    // // debugger;
    if (productsslist && productsslist.length > 0) {
      return (
        <div>
          <form>
            <h2>Product List</h2>
            <input
              placeholder="Search..."
              value={this.state.query}
              onChange={this.handleInputChange}
            />
          </form>

          <Link className="Addbtn" variant="primary" to="/">
            Add Product
          </Link>

          <Table className="table">
            <thead>
              <tr>
                <th>ProductID</th>
                <th>ProductName</th>
                <th>ProductDiscription</th>
                <th>ExpiryDate</th>
                <th>ProductPrice</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.filteredData.map((pro) => (
                <tr key={pro.id}>
                  <td>{pro.id}</td>
                  <td>{pro.productName}</td>
                  <td>{pro.productDiscription}</td>
                  <td>{pro.expiryDate}</td>
                  <td>{pro.productPrice}</td>
                  <td>
                    <Link variant="info" to={"/editProduct/" + pro.id}>
                      Edit
                    </Link>
                    &nbsp;
                    <Button
                      variant="danger"
                      onClick={() => this.deletepro(pro.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
           
        </div>
      );
    } else {
      return <div>No Record Found</div>;
    }
  }
}
export default ProductList;
