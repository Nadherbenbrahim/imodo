import React, { Fragment } from 'react'
import { useState } from 'react'
import AddSynonym from './AddSynonym'
import { updateContent, getAllEntity, removeContent } from '../actions'
import { connect } from 'react-redux'
import Modal from './Modal'
import { withRouter } from 'react-router-dom'
import { useEffect } from 'react'

function AddEntityTable({ entity, el, removSynonym, handelSubmitSynonym, dispatch, fb, index, project }) {
    const [inputState, setInputState] = useState(true)
    useEffect(() => {
        console.log('logging ', project)
    })
    return (
        <tr>
            <td>
                <form style={{ position: 'relative' }} onSubmit={(e) => {
                    e.preventDefault()
                    dispatch(updateContent({ id: entity._id, idChildren: el._id, name: e.target.content.value }))
                        .then(() => {
                            setInputState(true);
                            dispatch(getAllEntity(fb))
                        }
                        )

                }}>
                    {!inputState &&
                        <svg style={{ position: 'absolute', left: '-15%' }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill="#4b4f56"
                                d="M4.5 20.33v4.17h4.166l12.287-12.291-4.166-4.166zM24.175 8.987a1.106 1.106 0 000-1.566l-2.6-2.6a1.106 1.106 0 00-1.566 0l-2.033 2.033 4.166 4.166 2.033-2.033z"
                                data-name="Icon material-edit"
                                transform="translate(-4.5 -4.496)"
                            ></path>
                        </svg>
                    }
                    <input type="text" defaultValue={el.content} name='content' style={{
                        background: 'transparent !important',
                        border: "none",
                        paddingBottom: "6px",
                        borderBottom: `1.5px solid ${inputState ? "transparent" : "lightgray"}`,
                        transition: "0.3s",
                        pointerEvents: inputState ? "none" : "auto",
                        outline: "none"
                    }} />
                </form>
            </td>
            <td></td>
            <td> {el.synonyms.map((child, i) =>
                (child && <span key={Math.random()} className="entitys">{child}
                    <svg onClick={() => removSynonym(el._id, child, i)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                    >
                        <g
                            fill="#818e94"
                            data-name="Icon ionic-ios-close-circle-outline"
                            transform="translate(-3.375 -3.375)"
                        >
                            <path
                                d="M19.231 18.231L16.9 15.9l2.329-2.329a.706.706 0 00-1-1L15.9 14.9l-2.329-2.329a.706.706 0 00-1 1l2.334 2.329-2.329 2.329a.683.683 0 000 1 .7.7 0 001 0L15.9 16.9l2.329 2.329a.709.709 0 001 0 .7.7 0 00.002-.998z"
                                data-name="Tracé 213"
                                transform="translate(-3.529 -3.527)"
                            ></path>
                            <path
                                d="M12.375 4.587a7.785 7.785 0 11-5.508 2.28 7.737 7.737 0 015.508-2.28m0-1.212a9 9 0 109 9 9 9 0 00-9-9z"
                                data-name="Tracé 214"
                            ></path>
                        </g>
                    </svg>
                </span>
                )

            )}

                <AddSynonym handelSubmitSynonym={handelSubmitSynonym} content={el.content} entityId={entity._id} childrenId={el._id} />

            </td>
            <td style={{ whiteSpace: "nowrap" }}>
                <svg onClick={() => setInputState(!inputState)} style={{ cursor: 'pointer', margin: "0 15px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="27.241"
                    height="27"
                    viewBox="0 0 27.241 27"
                >
                    <g
                        fill="none"
                        stroke="#e5137d"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        data-name="Icon feather-edit"
                        transform="translate(-2 -1.818)"
                    >
                        <path
                            d="M14.01 5.797H5.447A2.447 2.447 0 003 8.244v17.127a2.447 2.447 0 002.447 2.447h17.127a2.447 2.447 0 002.447-2.447v-8.564"
                            data-name="Tracé 420"
                        ></path>
                        <path
                            d="M22.913 3.691A2.979 2.979 0 0127.127 7.9L13.784 21.247l-5.618 1.405 1.4-5.618z"
                            data-name="Tracé 421"
                        ></path>
                    </g>
                </svg>
                {project ?
                    <Modal triggerModal={
                        <svg style={{ cursor: 'pointer' }}
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
                    }>
                        {close => (
                            <div style={{ textAlign: "center", padding: 40, position: "relative" }}>
                                <svg onClick={() => close()} style={{ position: "absolute", top: 15, right: 15 }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><g fill="#818e94" data-name="Icon ionic-ios-close-circle-outline" transform="translate(-3.375 -3.375)"><path d="M19.231 18.231L16.9 15.9l2.329-2.329a.706.706 0 00-1-1L15.9 14.9l-2.329-2.329a.706.706 0 00-1 1l2.334 2.329-2.329 2.329a.683.683 0 000 1 .7.7 0 001 0L15.9 16.9l2.329 2.329a.709.709 0 001 0 .7.7 0 00.002-.998z" data-name="Tracé 213" transform="translate(-3.529 -3.527)"></path><path d="M12.375 4.587a7.785 7.785 0 11-5.508 2.28 7.737 7.737 0 015.508-2.28m0-1.212a9 9 0 109 9 9 9 0 00-9-9z" data-name="Tracé 214"></path></g></svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="70"
                                    height="62.804"
                                    viewBox="0 0 70 62.804"
                                >
                                    <g fill="#e5007d" data-name="Group 1203" transform="translate(0 -26.315)">
                                        <path
                                            d="M61.755 89.119H8.244a8.231 8.231 0 01-7.128-12.346L27.871 30.43a8.231 8.231 0 0114.257 0l26.756 46.343a8.231 8.231 0 01-7.129 12.346zM35 30.416a4.088 4.088 0 00-3.577 2.065L4.667 78.823a4.13 4.13 0 003.577 6.2h53.511a4.13 4.13 0 003.577-6.2L38.576 32.481A4.088 4.088 0 0035 30.416z"
                                            data-name="Path 436"
                                        ></path>
                                        <path
                                            d="M0 0H4.101V20.505H0z"
                                            data-name="Rectangle 1580"
                                            transform="translate(32.949 46.781)"
                                        ></path>
                                        <path
                                            d="M238.737 361.458a2.734 2.734 0 112.734-2.734 2.737 2.737 0 01-2.734 2.734z"
                                            data-name="Path 437"
                                            transform="translate(-203.737 -284.602)"
                                        ></path>
                                    </g>
                                </svg>
                                <br /><br />
                                <p>Are you sure you want to delete this product!</p>
                                <p>This will remove all response using this product.</p><br />
                                <button style={{
                                    border: "none",
                                    background: "#e5007d",
                                    color: "#fff",
                                    padding: "15px 40px",
                                    cursor: "pointer"
                                }} onClick={e => {
                                    console.log(entity)
                                    dispatch(removeContent(fb, { id: el._id, entity: entity._id }))
                                        .then(() => dispatch(getAllEntity(fb)))
                                        .then(() => close())
                                }}>Yes, delete it!</button><br />
                                <button style={{
                                    border: "none",
                                    background: "transparent",
                                    color: "#818E94",
                                    padding: "15px 40px",
                                    cursor: "pointer"
                                }} onClick={() => close()}>Cancel</button>
                            </div>
                        )}
                    </Modal>
                    :
                    <svg onClick={e => {
                        dispatch(removeContent(fb, { id: el._id, entity: entity._id }))
                            .then(() => dispatch(getAllEntity(fb)))
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
                }
            </td>
        </tr >
    )
}

export default withRouter(connect((state, props) => ({ fb: state.fbdata.tokenDetail.userID, project: state.allProjects.find(el => el.entities.find(Element => Element._id == props.match.params.id)) }))(AddEntityTable))
