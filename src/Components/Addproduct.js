import React, { Component } from "react";
import { Row, Form, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
const BaseapiUrl = 'http://localhost:6600/product';
class Addproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            productDiscription: '',
            productPrice: '',
            expiryDate:''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    AddProduct() {
        //debugger;
        if (this.state.productName === "" || this.state.productName === undefined) {
            alert("Product Name is required");
        } else if (this.state.productDiscription === "" || this.state.productDiscription === undefined) {
            alert("Product Discription is required");
        } else if (this.state.productPrice === "" || this.state.productPrice === undefined) {
            alert("Product Price  is required");
        }else if (this.state.expiryDate === "" || this.state.expiryDate === undefined) {
            alert("Date  is required");
        } 

        //let MeetingToken = Math.floor(Math.random() * 100000000 + 1);
        let body = {
            productName: this.state.productName,
            productDiscription: this.state.productDiscription,
            productPrice: this.state.productPrice,
            expiryDate: this.state.expiryDate
        };

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(body),
        };

        let baseurl = BaseapiUrl;
        fetch(baseurl, requestOptions)
            .then((res) => {
                return res.json();
            })
            .then((results) => {
                if (results) {
                    alert("Added successfully!");
                    this.setState({
                        productName: '',
                        productDiscription: '',
                        productPrice: '',
                        expiryDate: ''
                    })
                }
            })
            

            


            .catch((e) => {
                alert(e);
            });
    }

    render() {
        return (
            <div>
                <h1>Add Product</h1>
                <Link variant="primary" to="/ProductList">View Product list</Link>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="productName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="productName"
                                    value={this.state.productName}
                                    onChange={this.handleChange}
                                    placeholder="Product Name" />
                            </Form.Group>
                            <Form.Group controlId="productDiscription">
                                <Form.Label>Product Discription</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="productDiscription"
                                    value={this.state.productDiscription}
                                    onChange={this.handleChange}
                                    placeholder="product Discription" />
                            </Form.Group>
                            <Form.Group controlId="expiryDate">
                                <Form.Label>Expiry Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="expiryDate"
                                    value={this.state.expiryDate}
                                    onChange={this.handleChange}
                                    placeholder="product expiryDate" />
                            </Form.Group>
                            <Form.Group controlId="productPrice">
                                <Form.Label>Product Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="productPrice"
                                    value={this.state.productPrice}
                                    onChange={this.handleChange}
                                    placeholder="Product Price" />
                            </Form.Group>
                            <br />
                            <Form.Group>
                                <Button variant="success" onClick={() => this.AddProduct()}>Save</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
        )

    }
}
export default Addproduct;