import { Col, Container, Row, Button, Modal } from "react-bootstrap"
import Layout from "../../components/Layout"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCategory, getAllCategory, updateCategories, deleteCategories as deleteCategoriesAction } from "../../actions";
import CheckboxTree from "react-checkbox-tree"
import { IoCheckbox } from "react-icons/io5";
import { IoIosCheckboxOutline } from "react-icons/io";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import UpdateCategory from "./components/UpdateCategory";
import AddNewCategory from "./components/AddNewCategory";
import DeleteCategory from "./components/DeleteCategory";
import "./style.css"
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";




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



    return (
        <>
            <Layout sidebar>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{ display: "flex", }} className="mt-1">
                                <h3>Category List</h3>
                                <div className="categoryNav ms-auto">
                                    <Button onClick={handleShow}>
                                        <IoMdAddCircleOutline /> Create
                                    </Button>
                                    <Button onClick={deleteCategory}> <MdDeleteOutline />Delete</Button>
                                    <Button onClick={updateCategory}><FaRegEdit />Edit</Button>
                                </div>

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

                </Container>
                <AddNewCategory
                    show={show}
                    handleClose={handleClose}
                    categoryList={createCategoryList(category.categories)}
                    categoryName={categoryName}
                    categoryParentId={categoryParentId}
                    handleCategoryImage={handleCategoryImage}
                    setCategoryName={setCategoryName}
                    setCategoryParentId={setCategoryParentId}
                    setShow={setShow}

                />
                <UpdateCategory
                    show={updateCategoryModal}
                    handleClose={updateCategoryForm}
                    expandedArray={expandedArray}
                    checkedArray={checkedArray}
                    handleCategoryInput={handleCategoryInput}
                    categoryList={createCategoryList(category.categories)}
                    setUpdateCategoryModal={setUpdateCategoryModal}
                />

                <DeleteCategory
                    deleteCategoryModal={deleteCategoryModal}
                    expandedArray={expandedArray}
                    checkedArray={checkedArray}
                    deleteCategories={deleteCategories}
                    setDeleteCategoryModal={setDeleteCategoryModal}

                />
            </Layout >
        </>
    )
}

export default Category