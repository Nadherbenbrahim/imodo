import React, { useState, useEffect } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

function EntetyTable(props) {
    let history = useHistory()
    let match = useRouteMatch();
    const [show, setShow] = useState(false)

    const { entity } = props
    // console.log(entity)
    // if (props.entitys.filter(element => element.name == entity).length == 0)
    //     return '';
    return (
        <tr style={{ position: "relative" }}>
            <td onClick={() => history.push(`${match.path}/add/${entity._id}`)} style={{ cursor: 'pointer' }} className="entityName">{entity.name}</td>
            <td></td>
            <td>{entity.children.length}</td>
            <td style={{ textAlign: 'center' }}>
                <svg onClick={() => {
                    if (entity.children.length !== 0) return;
                    props.removeEntity(props.entity._id)

                }}
                    onMouseEnter={() => entity.children.length !== 0 && setShow(true)}
                    onMouseLeave={() => entity.children.length !== 0 && setShow(false)}
                    style={{ cursor: 'pointer' }}
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
                {show && <div style={{ position: "absolute", width: 200, padding: 10, border: "2px solid #E5017D", background: "#fff", right: 10, }}>
                    <p style={{ color: "#E5017D", fontSize: 15, fontWeight: "bold" }}>The category should be empty!</p>
                </div>
                }
            </td>
        </tr >
    )


}

export default EntetyTable
