import React, { useEffect, useState } from "react";
import db from "../db";
import FormCategories from "../components/Categories/FormCategories";
import UserContext from "../context/UserContext";
import Modal from 'react-bootstrap/Modal';
export default function CategoriesPage(props) {
    const [id, setId] = useState();
    const [name, setName] = useState();
    const { state, dispatch } = React.useContext(UserContext);
    const refresh = () => {
        const dbRef = db.ref();
        dbRef.child("/categories").get().then((snapshot) => {
            if (snapshot.exists()) {
                state.categories = snapshot.val();
                dispatch({ type: "update_categories", payload: state.categories });
                localStorage.setItem('state', JSON.stringify(state));
                setTimeout(()=>{
                    dispatch({ type: "hide_loading" });
                },1000)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    const data = JSON.parse(localStorage.getItem('state'))

    useEffect(() => {
        console.log(state);
        refresh();
        console.log(data)
    }, [])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (i) => {
        setShow(true);
        setId(i.id);
        setName(i.name);
    };
    const configCate = () => {
        // A post entry.
        console.log("config");
        var postData = {
            id: id,
            name: name
        };
        // Get a key for a new Post.
        var PostKey = id - 1;
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/categories/' + PostKey] = postData;
        return db.ref().update(updates);
    }
    const deleteCate = (i) => {
        console.log("deleteCate");
        console.log(i.id)
        if (window.confirm("Bạn chắc chắn muốn xóa danh mục này?")) {
            const objectRef = db.ref(`/categories/${i.id-1}`);
            objectRef.remove()
                .then(() => {
                    console.log('Object deleted successfully!');
                })
                .catch((error) => {
                    console.error(`Error deleting object: ${error}`);
                })
        }
    }
    const formSubmit = (e) => {
        console.log("submit")
        e.preventDefault();
        db.ref('categories/').set(data);
    }
    const handleInput = (e) => {
        setName(e.target.value);
    }
    return (
        <React.Fragment>
            <section class="is-hero-bar">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                    <h1 class="title">
                        Danh Mục
                    </h1>
                </div>
            </section>
            <FormCategories style={{ marginBottom: '20px' }}></FormCategories>
            <section className="is-title-bar mt-5">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                    <ul>
                        <li>Admin</li>
                        <li>Danh Mục</li>
                    </ul>
                    
                </div>
            </section>

            <div className="card has-table ">
                <div className="card-content">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên danh mục</th>
                                <th className="text-left">Các chức năng</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                    data ? data.categories.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="text-center">
                                                    {item.id}
                                                </td>
                                                <td data-label="Name" className="text-center">{item.name}</td>

                                                <td className="actions-cell ">
                                                    <div className="buttons center nowrap">
                                                        <button onClick={() => handleShow(item)} className="button small --jb-modal " style={{ backgroundColor: 'rgb(203,112,0)', borderOpacity: '1', color: 'rgb(255,255,255,0.8)' }} data-target="sample-modal-2" type="button">
                                                            <span className="icon">Sửa</span>
                                                        </button>
                                                        <button onClick={() => deleteCate(item)} className="button small red --jb-modal" data-target="sample-modal" type="button">
                                                            <span className="icon">Xóa</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }): <div>Không có danh mục phù hợp</div>
                            }
                        </tbody>
                    </table>
                </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Sửa thông tin</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form method="post" onSubmit={formSubmit} className="form-control">
                                <div className="control icons-left">
                                    <input name="name" className="input" type="text" value={name} onChange={handleInput} required />
                                    <span className="icon left"><i className="mdi mdi-account"></i></span>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="field grouped mt-4" >
                                <div className="control">
                                    <button type="submit" className="button btn-success" onClick={configCate}>
                                        OK
                                    </button>
                                </div>
                                <div className="control">
                                    <button type="reset" className="button red" onClick={handleClose}>
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        </Modal.Footer>
                    </Modal>
            </div>
        </React.Fragment>
    )
}