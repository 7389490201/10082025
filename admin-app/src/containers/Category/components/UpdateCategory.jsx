import React from 'react'
import Input from '../../../components/UI'
import { Modal, Row, Col, Button } from 'react-bootstrap'


function UpdateCategory(props) {

    const {
        handleClose,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList,
        show,
        setUpdateCategoryModal
    } = props

    return (
        <>
            <Modal show={show}
                onHide={() => setUpdateCategoryModal(false)}
                size="lg">

                <Modal.Header closeButton>
                    <Modal.Title>Update Categories</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <h6>Expended</h6>
                        </Col>
                    </Row>
                    {
                        expandedArray.length > 0 && expandedArray.map((item, index) =>
                            <Row key={index}>
                                <Col>
                                    <Input
                                        placeholder="Enter category name"
                                        value={item.name}
                                        onChange={(e) => handleCategoryInput("name", e.target.value, index, "expanded")}
                                    />
                                </Col>
                                <Col>
                                    <select className="form-control mb-3"
                                        value={item.parentId}
                                        onChange={(e) => { (e) => handleCategoryInput("parentId", e.target.value, index, "expanded") }}>
                                        <option value="" >select category</option>
                                        {
                                            categoryList.map(option =>
                                                <option key={option.value} value={option.value}>{option.name}</option>
                                            )
                                        }
                                    </select>
                                </Col>
                                <Col>
                                    <select name="" id=""
                                        className="form-control">
                                        <option value="">Select type</option>
                                        <option value="Store">Store</option>
                                        <option value="Product">Product</option>
                                        <option value="Page">Page</option>
                                    </select>
                                </Col>
                            </Row>

                        )
                    }
                    <h6>Checked Categories</h6>
                    {
                        checkedArray.length > 0 && checkedArray.map((item, index) =>
                            <Row key={index}>
                                <Col>
                                    <Input
                                        placeholder="Enter category name"
                                        value={item.name}
                                        onChange={(e) => handleCategoryInput("name", e.target.value, index, "checked")}
                                    />
                                </Col>
                                <Col>
                                    <select className="form-control mb-3"
                                        value={item.parentId}
                                        onChange={(e) => { (e) => handleCategoryInput("parentId", e.target.value, index, "checked") }}>
                                        <option value="" >select category</option>
                                        {
                                            categoryList.map(option =>
                                                <option key={option.value} value={option.value}>{option.name}</option>
                                            )
                                        }
                                    </select>
                                </Col>
                                   <Col>
                                    <select
                                    className="form-control"
                                    value={item.type}
                                    onChange={(e) =>
                                        handleCategoryInput("type", e.target.value, index, "checked")
                                    }
                                    >
                                    <option value="">Select type</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                    </select>
                                </Col>
                            </Row>

                        )
                    }


                    {/* <input type="file" name="categoryImage" onChange={handleCategoryImage} /> */}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setUpdateCategoryModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleClose()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpdateCategory
