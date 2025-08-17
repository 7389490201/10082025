import { Col, Container, Row, Button, Modal } from "react-bootstrap"
import Layout from "../../components/Layout"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCategory, getAllCategory } from "../../actions";
import Input from "../../components/UI";




function Category() {
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryParentId, setCategoryParentId] = useState("");
    const [categoryImage, setCategoryImage] = useState("");
    const dispatch = useDispatch();
    const handleClose = () => {
        const form = new FormData();



        form.append("name", categoryName);
        form.append("parentId", categoryParentId),
            form.append("categoryImage", categoryImage)
        dispatch(addCategory(form)).then(() => {
            dispatch(getAllCategory()); // Refresh category list
            setShow(false); // Close modal after successful submit
            setCategoryName("");
            setCategoryParentId("");
            setCategoryImage("")
        });

        // const cat = {
        //     categoryName,
        //     categoryParentId,
        //     categoryImage
        // }
        // console.log(cat);


    };
    const handleShow = () => setShow(true);
    const category = useSelector(state => state.category);

    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getAllCategory())
    // }, [])

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category._id}>
                    {category.name}
                    {category.children && category.children.length > 0 ? (
                        <ul>{renderCategories(category.children)}</ul>
                    ) : null}
                </li>
            )
        }
        return myCategories;
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
    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }
    return (
        <>
            <Layout sidebar>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h3>Category List</h3>
                                <Button variant="primary" onClick={handleShow}>
                                    Add Category
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <ul>
                                {renderCategories(category.categories)}
                                {/* {JSON.stringify(createCategoryList(category.categories))} */}

                            </ul>
                        </Col>
                    </Row>
                </Container>
                <Modal show={show} onHide={handleClose}>
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
                                createCategoryList(category.categories).map(option =>
                                    <option key={option.value} value={option.value}>{option.name}</option>
                                )
                            }
                        </select>
                        <input type="file" name="categoryImage" onChange={handleCategoryImage} />

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
            </Layout >
        </>
    )
}

export default Category