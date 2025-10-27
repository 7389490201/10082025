import React from 'react'
import Input from '../../../components/UI'
import { Button, Row, Col, Modal } from 'react-bootstrap'

function AddNewCategory(props) {
    const {
        show,
        handleClose,
        categoryList,
        categoryName,
        categoryParentId,
        handleCategoryImage,
        setCategoryName,
        setCategoryParentId,
        setShow

    } = props
    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        label="Category Name"
                        placeholder="Enter category name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <select className="form-control mb-3"
                        value={categoryParentId}
                        onChange={(e) => { setCategoryParentId(e.target.value) }}>
                        <option value="" >select category</option>
                        {
                            categoryList.map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        }
                    </select>
                    <input type="file" name="categoryImage" onChange={handleCategoryImage} />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddNewCategory
