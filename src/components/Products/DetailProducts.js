import React, { useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import db from "../../db";
export default function DetailProducts(props) {
    const [cate, setCate] = useState({});
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [nameFood, setNameFood] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [review, setReview] = useState('');
    const [reviewDemo, setReviewDemo] = useState('');
    const [start, setStart] = useState('2023-05-31');
    const { state, dispatch } = React.useContext(UserContext);
    
    useEffect(() => {
        setCate(state.product_detail)
        setId(state.product_detail.id);
        setName(state.product_detail.name);
        setNameFood(state.product_detail.nameFood);
        setPrice(state.product_detail.price);
        setImage(state.product_detail.img);
        setReview(state.product_detail.review);
        setReviewDemo(state.product_detail.reviewDemo);
        setStart(state.product_detail.start);
        setTimeout(() => {
            dispatch({ type: "hide_loading" })
        }, 1000)
    }, [])
    const handleInput = (e) => {
        cate["id"] = cate.id
        cate[e.target.name] = e.target.value;
        setCate(cate);
        setId(cate.id);
        setName(cate.name);
        setNameFood(cate.nameFood);
        setPrice(cate.price);
        setImage(cate.img);
        setReview(cate.review);
        setReviewDemo(cate.reviewDemo);
        setStart(cate.start);
        console.log(cate);

    }
    const configPro = (e) => {
        e.preventDefault();
        // A post entry.
        console.log("config");
        
        var postData = {
            id: id,
            name: name,
            nameFood: nameFood,
            price: price,
            img: image,
            review: review,
            reviewDemo: reviewDemo,
            start: start,
        };
        console.log(postData);
        // Get a key for a new Post.
        var PostKey = id - 1;
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/productsCate/' + PostKey] = postData;
        return db.ref().update(updates);
    }

    return (
        <React.Fragment>
            <div className="card mb-6" style={{ width: '50%', height: '75%' }}>
                <header className="card-header">
                    <p className="card-header-title">
                        <span className="icon"><i className="mdi mdi-ballot"></i></span>
                        Thông tin Sản Phẩm
                    </p>
                </header>
                <form method="post" onSubmit={configPro} className="form-control">
                    <div className="control icons-left form-group">
                        <input name="nameFood" className="input form-control" type="text" onChange={handleInput} required value={nameFood} />
                        <span className="icon left"><i className="mdi mdi-account"></i></span>
                    </div>
                    <div className="control icons-left form-group">
                        <input name="name" className="input form-control" type="text" onChange={handleInput} required value={name} />
                        <span className="icon left"><i className="mdi mdi-account"></i></span>
                    </div>

                    <div className="control icons-left form-group">
                        <input name="price" className="input form-control" type="number" onChange={handleInput} required value={price} />
                        <span className="icon left"><i className="mdi mdi-account"></i></span>
                    </div>
                    <div className="control icons-left form-group">
                        <input name="review" className="input form-control" type="text" onChange={handleInput} required value={review} />
                        <span className="icon left"><i className="mdi mdi-account"></i></span>
                    </div>
                    <div className="control icons-left form-group">
                        <input name="reviewDemo" className="input form-control" type="text" onChange={handleInput} required value={reviewDemo} />
                        <span className="icon left"><i className="mdi mdi-account"></i></span>
                    </div>
                    <div className="control icons-left form-group">
                        <input name="start" className="input form-control" type="text" onChange={handleInput} required value={start} />
                        <span className="icon left"><i className="mdi mdi-account"></i></span>
                    </div>
                    <div className="field grouped mt-4" >
                        <div className="control">
                            <button type="submit" className="button green" >
                                Sửa
                            </button>
                        </div>
                        <div className="control">
                            <button type="reset" className="button red">
                                Hủy
                            </button>
                        </div>
                        <div className="control">
                            <NavLink to="/products" className="button red" >
                                Back
                            </NavLink>
                        </div>
                    </div>
                </form>
            </div>

        </React.Fragment>
    )
}