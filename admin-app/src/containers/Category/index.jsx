import { Col, Container, Row, Button, Modal } from "react-bootstrap"
import Layout from "../../components/Layout"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCategory, getAllCategory, updateCategories, deleteCategories as deleteCategoriesAction } from "../../actions";
import Input from "../../components/UI";
import CheckboxTree from "react-checkbox-tree"
import { IoCheckbox } from "react-icons/io5";
import { IoIosCheckboxOutline } from "react-icons/io";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';




function Category() {
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryParentId, setCategoryParentId] = useState("");
    const [categoryImage, setCategoryImage] = useState("");
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
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
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                },
                // <li key={category._id}>
                //     {category.name}
                //     {category.children && category.children.length > 0 ? (
                //         <ul>{renderCategories(category.children)}</ul>
                //     ) : null}
                // </li>
            )
        }
        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name, parentId: category.parentId });
            if (category.children && category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }
    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }

    const updateCategory = () => {
        updateCheckedAndExpendedCategories();
        setUpdateCategoryModal(true);

    }

    const updateCheckedAndExpendedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((cat, _index) => cat.value === categoryId);
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((cat, _index) => cat.value === categoryId);
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
        console.log({ checked, expanded, categories, checkedArray, expandedArray });
    }
    const handleCategoryInput = (key, value, index, type) => {
        if (type === "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type === "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    };

    const updateCategoryForm = () => {
        const form = new FormData();
        const updatedCategories = [];

        expandedArray.forEach(item => {
            updatedCategories.push({
                _id: item.value,
                name: item.name,
                parentId: item.parentId || "",
                type: item.type || ""
            });
        });

        checkedArray.forEach(item => {
            updatedCategories.push({
                _id: item.value,
                name: item.name,
                parentId: item.parentId || "",
                type: item.type || ""
            });
        });

        form.append("categories", JSON.stringify(updatedCategories));

        dispatch(updateCategories(form)).then(() => {
            dispatch(getAllCategory());
        });
        setUpdateCategoryModal(false);
    }

    const deleteCategory = () => {
        setDeleteCategoryModal(true);
        updateCheckedAndExpendedCategories()
    }

    const deleteCategories = () => {
        const checkedIdArray = checkedArray.map((item, index) => ({ _id: item.value }))
        const expendedIdArray = checkedArray.map((item, index) => ({ _id: item.value }))
        const idsArray = expendedIdArray.concat(checkedIdArray);
        console.log("idsArray", idsArray)
        dispatch(deleteCategoriesAction(idsArray)).then(() => {
            dispatch(getAllCategory());
            setDeleteCategoryModal(false);
            setChecked([]);
            setExpanded([]);
        });

    }

    const renderDeleteCategoryModal = () => {
        console.log("delete", checkedArray)
        return (
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
        )
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
                            {/* <ul>
                                {renderCategories(category.categories)}
                                {JSON.stringify(createCategoryList(category.categories))}
                            </ul> */}
                            <CheckboxTree
                                nodes={renderCategories(category.categories)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}
                                icons={{
                                    check: <IoCheckbox />,
                                    uncheck: <IoIosCheckboxOutline />,
                                    halfCheck: <IoIosCheckboxOutline style={{ opacity: 0.5 }} />,
                                    expandClose: <IoIosArrowForward />,
                                    expandOpen: <IoIosArrowDown />,
                                    expandAll: <IoIosArrowDown />,
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button onClick={deleteCategory}>Delete</button>
                            <button onClick={updateCategory}>Edit</button>
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



                {/* // 2nd modal for update categories */}
                <Modal show={updateCategoryModal}
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
                                                createCategoryList(category.categories).map(option =>
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
                                                createCategoryList(category.categories).map(option =>
                                                    <option key={option.value} value={option.value}>{option.name}</option>
                                                )
                                            }
                                        </select>
                                    </Col>
                                    <Col>
                                        <select name="" id=""
                                            className="form-control">
                                            <option value="">Select type</option>
                                            <option value="">Store</option>
                                            <option value="">Product</option>
                                            <option value="">Page</option>
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
                        <Button variant="primary" onClick={() => updateCategoryForm()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                {renderDeleteCategoryModal()}
            </Layout >
        </>
    )
}

export default Category