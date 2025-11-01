import { Col, Container, Modal, Row,Button } from "react-bootstrap";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import Input from "../../components/UI";
import linearCategories from "../../components/Helper/linearCategories"
import { useSelector } from "react-redux";


const NewPage = () =>{
    const [createModal,setCreateModal] = useState(false);
    const [title,setTitle]=useState('');
    const category = useSelector(state =>state.category)
    const [categories,setCategories]=useState([]);
    const [categoryId,setCategoryId]=useState("");
    const [desc,setDesc]=useState("");
    const [type,setType]=useState("");
    const [banners,setBanner]=useState([]);
    const [products,setProduct]=useState([]);


    useEffect(()=>{
        setCategories(linearCategories(category.categories));
    },[categories])
    

const handleClose = () =>{
setCreateModal(false)
}

const handleBannerImages = (e) =>{
    console.log(e)
    setBanner([...banners, e.target.files[0]])
}
const handleProductImages = (e) =>{
    console.log(e)
    setProduct([products,e.target.files[0]])
}

const submitPageForm = (e) =>{
    e.preventDefault();
    const form = new FormData();
    form.append("title")
    form.append("description")
    form.append("banners")
    form.append("products")
    form.append("category")
    form.append("titile")
    form.append("titile")
}


const renderCreatePageModal = () =>{
    return(
        <Modal
        show={createModal}
        handleClose={handleClose}>
            <Modal.Header>Create New Page</Modal.Header>
            <Modal.Body>
                <Container>
                     <Row>
                    <Col>
                    <select 
                        className="form-control form-control-sm"
                         value={categoryId}
                         onChange={(e)=>setCategories(e.target.value)}
                         >
                       <option value={""} >select category</option>
                       {
                        categories.map(cat=>
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        )
                       }
                    </select>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                    <Input
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        placeholder={"Page Title"}
                        className="form-control form-control-sm"
                    />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                    <Input
                        value={desc}
                        onChange={(e)=>setDesc(e.target.value)}
                        placeholder={"Page Description"}
                        className="form-control form-control-sm"
                    />
                    </Col>
                </Row>
                <Row className="mt-3">
                {
                    banners.length>0?
                    banners.map((banner,index)=>
                     <Row>
                        <Col>
                        {banner.name}
                        </Col>
                    </Row>):null  
                }
                    <Col>
                    <Input
                       type="file"
                       name="Banner"
                       onChange={handleBannerImages()}
                    />
                    </Col>
                </Row>
                <Row className="mt-3">
                     {
                    products.length>0?
                    products.map((product,index)=>
                     <Row>
                        <Col>
                        {product.name}
                        </Col>
                    </Row>):null  
                }
                    <Col>
                    <Input
                       type="file"
                       name="Product"
                       onChange={handleProductImages()}
                    />
                    </Col>
                </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                    <Button variant="secondary" onClick={() => setCreateModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {}}>
                        Save Changes
                    </Button>
                </Modal.Footer>

        </Modal>
    )
}



    return(
       <Layout sidebar>
            {renderCreatePageModal()}
            <button onClick={()=>setCreateModal(true)}>Create Page</button>
       </Layout>
    )
}

export default NewPage;