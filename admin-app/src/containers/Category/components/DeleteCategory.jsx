import React from 'react'
import { Modal, Button } from "react-bootstrap"

function DeleteCategory(props) {
    const {
        deleteCategoryModal,
        expandedArray,
        checkedArray,
        deleteCategories,
        setDeleteCategoryModal
    } = props
    return (
        <>
            <Modal
                show={deleteCategoryModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    Ary You Sure
                    <h5>Expended</h5>
                    {
                        expandedArray.map((item, index) => <span key={index}>{item.name}</span>)
                    }
                    <h5>Checked</h5>
                    {
                        checkedArray.map((item, index) => <span key={index}>{item.name}</span>)
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setDeleteCategoryModal(false)}>
                        No
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            deleteCategories();
                            setDeleteCategoryModal(false); // optional: modal close karne ke liye
                        }}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default DeleteCategory
