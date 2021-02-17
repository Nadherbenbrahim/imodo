import React from 'react'
import { addentity } from '../actions'
import { useState } from 'react'
import { connect } from 'react-redux'
import TopMenu from '../components/TopMenu'
import { v4 as uuidv4 } from 'uuid';

function AddCategory(props) {
    const [entity, setEntity] = useState('')
    const [existEntity, setexistEntity] = useState(true)
    // const [show, setShow] = useState(false)
    // const [synonyms, setSynonyms] = useState(null)
    // const [content, setContent] = useState(null)
    const [values, setValues] = useState([])
    const handelSubmit = (entity, values) => {
        const newEntity = {
            idUser: props.fb,
            entity: {
                name: entity,
                values
            }
        }
        console.log('add Product ', newEntity)
        return props.addEntity(newEntity)
    }

    return (
        <div>
            <TopMenu />
            <div style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30, position: 'relative' }}>
                {!existEntity && <div style={{ position: "absolute", padding: "0 10px", border: "2px solid #E5017D", background: "#fff", left: 300, top: 100 }}>
                    <p style={{ color: "#E5017D", fontSize: 15, fontWeight: "bold" }}>Already exist category</p>
                </div>
                }
                <h2 style={{ fontSize: 30, color: "rgba(45, 47, 57, 1)" }}>Add Category</h2>
                <div><input type="text" className="entityNameUpdate" value={entity} onChange={e => setEntity(e.target.value)} /><br /><br /></div>

                <div style={{
                    display: 'flex',
                    marginTop: 30,
                    marginBottom: 30
                }}>
                    <input type="text" name="add" id="addEntity" placeholder="Add Product" required />
                    <button onClick={() => {
                        const obj = {
                            id: uuidv4(),
                            content: document.getElementById("addEntity").value,
                            synonyms: []
                        }
                        setValues([...values, obj])
                        document.getElementById("addEntity").value = ""
                    }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="142"
                            height="40"
                            viewBox="0 0 142 40"
                        >
                            <g data-name="Groupe 1136" transform="translate(-661 -274)">
                                <g transform="translate(633 274)">
                                    <rect
                                        width="142"
                                        height="40"
                                        fill="#e5007d"
                                        rx="4"
                                        transform="translate(28)"
                                    ></rect>
                                </g>
                                <text
                                    fill="#fff"
                                    data-name="Add Value"
                                    fontFamily="Poppins-SemiBold, Poppins"
                                    fontSize="16"
                                    fontWeight="600"
                                    transform="translate(680 300)"
                                >
                                    <tspan x="0" y="0">
                                        Add Products
          </tspan>
                                </text>
                            </g>
                        </svg>
                    </button>
                </div>
                <div style={{ background: '#fff', paddingTop: 20, paddingLeft: 70, paddingRight: 70, paddingBottom: 20 }}>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left' }}>Products</th>
                                <th style={{ textAlign: 'left' }}></th>
                                <th style={{ textAlign: 'left' }}>Synonyms</th>
                                <th style={{ textAlign: 'left' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                values && values.map(el =>
                                    <tr key={uuidv4()}>
                                        <td>
                                            <span>{el.content}</span>
                                        </td>
                                        <td></td>
                                        <td>
                                            {el.synonyms && el.synonyms.map(Element => <span key={uuidv4()} className="entitys">{Element}</span>)}
                                            <form className="addSynForm" onSubmit={(e) => {
                                                e.preventDefault()
                                                const modifArr = [...values]
                                                modifArr.forEach(Element => {
                                                    if (Element.id == el.id) {
                                                        Element.synonyms.push(e.target.addSyn.value)
                                                    }
                                                })

                                                setValues(modifArr)
                                            }} className="addSynForm" style={{ display: "inline-block" }}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="19.176"
                                                    height="19.176"
                                                    viewBox="0 0 19.176 19.176"
                                                >
                                                    <g
                                                        fill="none"
                                                        stroke="#818e94"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="1.5"
                                                        data-name="Icon feather-plus-circle"
                                                        transform="translate(-2.25 -2.25)"
                                                    >
                                                        <path
                                                            d="M20.676 11.838A8.838 8.838 0 1111.838 3a8.838 8.838 0 018.838 8.838z"
                                                            data-name="Tracé 210"
                                                        ></path>
                                                        <path d="M11.838 8.303v7.07" data-name="Tracé 211"></path>
                                                        <path d="M8.303 11.838h7.07" data-name="Tracé 212"></path>
                                                    </g>
                                                </svg>
                                                <input className="addSyn" name="addSyn" type="text" placeholder="Add Synonym" required />
                                            </form>
                                        </td>
                                        <td>
                                            <svg onClick={() => {
                                                setValues([...values].filter(Element => Element.id !== el.id))
                                                // setSynonyms('');
                                                // setContent('')
                                            }} style={{ cursor: 'pointer' }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="27"
                                                height="28.786"
                                                viewBox="0 0 27 28.786"
                                            >
                                                <g
                                                    fill="none"
                                                    stroke="#e5137d"
                                                    strokeLinecap="square"
                                                    strokeMiterlimit="10"
                                                    strokeWidth="2"
                                                    transform="translate(-3 -1)"
                                                >
                                                    <path
                                                        d="M26.322 9.143V27a1.786 1.786 0 01-1.786 1.786H8.465A1.786 1.786 0 016.679 27V9.143"
                                                        data-name="Tracé 429"
                                                    ></path>
                                                    <path
                                                        d="M0 0L0 10"
                                                        data-name="Ligne 25"
                                                        transform="translate(17 13.786)"
                                                    ></path>
                                                    <path
                                                        d="M0 0L0 10"
                                                        data-name="Ligne 26"
                                                        transform="translate(12 13.786)"
                                                    ></path>
                                                    <path
                                                        d="M0 0L0 10"
                                                        data-name="Ligne 27"
                                                        transform="translate(21 13.786)"
                                                    ></path>
                                                    <path d="M12.036 6.464V2h8.929v4.464" data-name="Tracé 430"></path>
                                                    <path
                                                        d="M25 0L0 0"
                                                        data-name="Ligne 28"
                                                        transform="translate(4 6.786)"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div style={{ textAlign: 'right', marginTop: 20 }} >
                    <svg onClick={() => {
                        let pass
                        if (!entity || !values) {
                            alert('you have fill all the value')
                            return;
                        }
                        for (const element of props.entitys) {

                            if (element.name.toUpperCase() === entity.toUpperCase()) {
                                setexistEntity(false)
                                pass = false
                                return;
                            } else {
                                pass = true
                                setexistEntity(true)
                            }

                        };
                        // console.log('data ', { entity, values })
                        if (pass) {
                            handelSubmit(entity, values)
                                .then(() => {
                                    props.history.push('/dachboard/entities')
                                })
                        }
                    }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="142"
                        height="40"
                        viewBox="0 0 142 40"
                    >
                        <g data-name="Groupe 1136" transform="translate(-661 -274)">
                            <g transform="translate(633 274)">
                                <rect
                                    width="80"
                                    height="40"
                                    fill="#e5007d"
                                    rx="4"
                                    transform="translate(28)"
                                ></rect>
                            </g>
                            <text
                                fill="#fff"
                                data-name="Add Value"
                                fontFamily="Poppins-SemiBold, Poppins"
                                fontSize="16"
                                fontWeight="600"
                                transform="translate(680 300)"
                            >
                                <tspan x="0" y="0">
                                    Save
          </tspan>
                            </text>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addEntity: (data) => dispatch(addentity(data)),
    }
}

const mapStateToProps = (state) => {
    return {
        fb: state.fbdata.tokenDetail.userID,
        entitys: state.entitys
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)
