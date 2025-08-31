import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductBySlug } from '../../actions';
import Layout from '../../component/Layout';
import { useParams } from 'react-router-dom';
import './style.css'
import { generatePublicUrl } from '../../generatePublicUrl';


function ProductPage(props) {
    const product = useSelector(state => state.product);
    console.log(product.productByPrice)
    const dispatch = useDispatch();
    const { slug } = useParams();
    const priceRange = { // मूल्य श्रेणियों के लिए हार्डकोडेड मान
        under5K: 5000,
        under10K: 10000,
        under15K: 15000,
        under20K: 20000,
        under30K: 30000,
    };

    useEffect(() => {
        dispatch(getProductBySlug(slug));
    }, [slug, dispatch]); // निर्भरता सरणी में slug और dispatch जोड़ें

    return (
        <Layout>
            {

                product.productByPrice && Object.keys(product.productByPrice).map((key, index) => {
                    return (
                        <div className="card" key={index}>
                            <div className="cardHeader">

                                <div>{slug} Mobile Under {priceRange[key]}</div>
                                <button>View All</button>
                            </div>
                            <div style={{ display: 'flex' }}>
                                {
                                    // यहां भी जांचें कि product.productByPrice[key] मौजूद है और एक सरणी है
                                    product.productByPrice[key] && product.productByPrice[key].map(productItem => ( // product को productItem में बदला गया ताकि नाम टकराव से बचा जा सके
                                        <div className="productContainer" key={productItem._id}>
                                            <div className="productImgContainer">
                                                {/* generatePublicUrl को आयात करना और उपयोग करना सुनिश्चित करें */}
                                                <img src={generatePublicUrl(productItem.productPictures[0].img)} alt={productItem.name} />
                                            </div>
                                            <div className="productInfo">
                                                <div style={{ margin: '5px 0' }}>{productItem.name}</div>
                                                <div>
                                                    <span>4.3</span>&nbsp;
                                                    <span>3353</span>
                                                </div>
                                                <div className="productPrice">₹{productItem.price}</div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    );
                })
            }
        </Layout>
    )
}

export default ProductPage