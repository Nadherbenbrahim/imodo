import React, { useEffect, useState } from 'react'
import TopMenu from '../components/TopMenu'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { getAllEntity, addentity, removeEntity } from '../actions'
import EntetyTable from '../components/EntetyTable';
import Modal from '../components/Modal';
import AddEntityModal from '../components/AddEntityModal';
// let obj = {}
let counter = 0
function Entitys(props) {
    // let match = useRouteMatch();
    // const [rmDuplicatedEntity, setrmDuplicatedEntity] = useState({})
    const [show, setShow] = useState(false)
    useEffect(() => {

        props.getAllEntity(props.fb)
        // .then(() => {
        //     massagingData()
        // })
    }, [counter])

    const handelSubmit = (entity, content, synonyms) => {
        const newEntity = {
            idUser: props.fb,
            entity: {
                synonyms,
                content,
                name: entity
            }
        }
        props.addEntity(newEntity)
        // .then(() => massagingData())
        counter++
    }
    // const massagingData = () => {
    //     const entity = [...props.entitys]
    //     console.log('inside messagindata ', entity)
    //     entity.forEach(el => {
    //         obj = {
    //             ...obj,
    //             [el.name]: true
    //         }
    //     })
    //     setrmDuplicatedEntity(obj)
    // }
    const removeEntityHandler = (id) => {
        console.log(id)
        props.removeEntitys(props.fb, { id })
            .then(() => props.getAllEntity(props.fb))


    }
    return (
        <div>
            <TopMenu />
            <div style={{ paddingLeft: 30, paddingRight: 100, paddingTop: 30 }}>
                <h2 style={{ fontSize: 30, color: "rgba(45, 47, 57, 1)", position: 'relative' }}>Products management <span
                    onMouseEnter={() => setShow(true)}
                    onMouseLeave={() => setShow(false)}
                    style={{
                        height: "20px",
                        width: "20px",
                        fontSize: "15px",
                        background: "rgb(64, 128, 255)",
                        position: "absolute",
                        top: "-5px",
                        color: "#fff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        left: "370px",
                        borderRadius: "50%",
                        cursor: "pointer"
                    }}>i</span>
                    {show && <div style={{ position: "absolute", width: 400, padding: "0 10px", border: "2px solid #E5017D", background: "#fff", left: 400, top: -0 }}>
                        <p style={{ color: "#E5017D", fontSize: 15, fontWeight: "bold" }}>In this section you can arrange your products in categories and add new products or synonyms to improve your agents</p>
                    </div>
                    }
                </h2>

                <Link to={'/dachboard/entities/add'}><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="180"
                    height="50"
                    viewBox="0 0 169 50"
                >
                    <g data-name="Groupe 1135" transform="translate(-1559 -214)">
                        <rect
                            width="169"
                            height="50"
                            fill="#e5007d"
                            data-name="Rectangle 1558"
                            rx="4"
                            transform="translate(1559 214)"
                        ></rect>
                        <g data-name="Groupe 1134" transform="translate(0)">
                            <text
                                fill="#fff"
                                data-name="Add Entity"
                                fontFamily="Poppins-SemiBold, Poppins"
                                fontSize="16"
                                fontWeight="600"
                                transform="translate(1648 245)"
                            >
                                <tspan x="-41.296" y="0">
                                    Add category
            </tspan>
                            </text>
                            <g
                                fill="none"
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                data-name="Icon feather-plus-circle"
                                transform="translate(1576 227)"
                            >
                                <path
                                    d="M20.676 11.838A8.838 8.838 0 1111.838 3a8.838 8.838 0 018.838 8.838z"
                                    data-name="Tracé 210"
                                ></path>
                                <path d="M11.838 8.303v7.07" data-name="Tracé 211"></path>
                                <path d="M8.303 11.838h7.07" data-name="Tracé 212"></path>
                            </g>
                        </g>
                    </g>
                </svg>
                </Link>
                <br /><br />
                <div style={{ background: '#fff', paddingTop: 20, paddingLeft: 70, paddingRight: 70, paddingBottom: 20 }}>
                    <table className="entityTable">
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left' }}>Category</th>
                                <th style={{ textAlign: 'center' }}></th>
                                <th style={{ textAlign: 'right' }}>Products</th>
                                <th style={{ textAlign: 'right' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.entitys.map(el => <EntetyTable entitys={props.entitys} entity={el} key={el._id} removeEntity={removeEntityHandler} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllEntity: (id) => dispatch(getAllEntity(id)),
        addEntity: (data) => dispatch(addentity(data)),
        removeEntitys: (id, data) => dispatch(removeEntity(id, data))
    }
}

const mapStateToProps = (state) => {
    return {
        entitys: state.entitys,
        fb: state.fbdata.tokenDetail.userID,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Entitys)
