import React, { useState } from 'react'
import { Col, Container, Row, Button, Modal, Table } from "react-bootstrap"
import Input from "../../components/UI";
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, getInitialData } from '../../actions/products.actions';
import { useEffect } from 'react';

function Products(props) {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDiscription] = useState("");
    const [categoryId, setCategoryId] = useState("")
    const [productPictures, setProductPicture] = useState([])
    const category = useSelector(state => state.category);
    const productState = useSelector(state => state.product);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const [productDetailModal, setProductDetailModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);



    useEffect(() => {
        dispatch(getInitialData())
    }, [dispatch])

    const handleClose = () => {
        const form = new FormData()
        form.append("name", name),
            form.append("price", price);
        form.append("quantity", quantity);
        form.append("category", categoryId)
        form.append("description", description);

        for (let pic of productPictures) {
            form.append("productPictures", pic)
        }

        dispatch(createProduct(form))
        // setName("");
        // setPrice("");
        // setQuantity("");
        // setDiscription("");
        // setCategoryId("");
        // setProductPicture([]);

        setShow(false);
    }
    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children && category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }
    const handleproductPicture = (e) => {
        if (e.target.files.length > 0) {
            setProductPicture(prev => [...prev, e.target.files[0]]);
        }
    };
    const showProductDetailsModal = (product) => {
        setSelectedProduct(product);
        setProductDetailModal(true);
    };
    const renderInitialData = () => {
        const products = productState.product; // यहीं mistake थी

        if (!Array.isArray(products) || products.length === 0) {
            return <p>No product found</p>;
        }

        return (
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod, index) => (
                        <tr key={prod._id} onClick={() => showProductDetailsModal(prod)} style={{ cursor: "pointer" }}>
                            <td>{index + 1}</td>
                            <td>{prod.name}</td>
                            <td>{prod.price}</td>
                            <td>{prod.quantity}</td>
                            <td>{prod.description}</td>
                            <td>{prod.category?.name || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }



    return (
        <>
            <Layout sidebar>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h3>Product</h3>
                                <Button variant="primary" onClick={handleShow}>
                                    Add
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            {renderInitialData()}
                        </Col>
                    </Row>
                </Container>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input
                            label="Name"
                            placeholder="Enter Product name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            label="Price"
                            placeholder="Enter Product Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <Input
                            label="Quantity"
                            placeholder="Enter Product Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <Input
                            label="Description"
                            placeholder="Enter Product Description"
                            value={description}
                            onChange={(e) => setDiscription(e.target.value)}
                        />
                        <label htmlFor="productCategory">Choose Category</label>
                        <select className="form-control mb-3"
                            id="productCategory"
                            label="Category"
                            value={categoryId}
                            onChange={(e) => { setCategoryId(e.target.value) }}>
                            <option value="" >select category</option>
                            {
                                createCategoryList(category.categories).map(option =>
                                    <option key={option.value} value={option.value}>{option.name}</option>
                                )
                            }
                        </select>
                        {productPictures.length > 0 ?
                            productPictures.map(pic => <div>
                                {JSON.stringify(pic.name)}
                            </div>) : null}
                        <div className='form-control'>
                            <p>Choose Multiple Files</p>
                            <input type='file'
                                name='productPicture'
                                onChange={handleproductPicture}
                            />
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={productDetailModal} onHide={() => setProductDetailModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Product Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedProduct && (
                            <>
                                <Row>
                                    <Col md={6}>
                                        <span><strong>Name:</strong> {selectedProduct.name}</span>

                                    </Col>
                                    <Col md={6}>

                                        <span><strong>Price:</strong> {selectedProduct.price}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
                                    </Col>
                                    <Col>
                                        <p><strong>Category:</strong> {selectedProduct.category?.name || "N/A"}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p><strong>Description:</strong> {selectedProduct.description}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <p><strong>Pictures:</strong></p>
                                    </Col>
                                    <Col style={{ display: 'flex', alignItems: 'center' }}>
                                        {selectedProduct.productPictures?.map(pic => (
                                            <img
                                                key={pic._id}
                                                src={`http://localhost:2000/public/${pic.img}`}
                                                alt="product"
                                                style={{ width: '100px', margin: '10px' }}
                                            />
                                        ))}
                                    </Col>
                                </Row>



                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setProductDetailModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Layout >
        </>
    )
}

export default Products