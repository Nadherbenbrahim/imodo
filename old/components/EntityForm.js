import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import layout from "simple-keyboard-layouts/build/layouts/arabic";

function EntityForm(props) {
    const [showKeyBoard, setshowKeyBoard] = useState(false)
    const { entityHandelSubmit, selectedEntent, setEntetysVal, entetyVal, setReponseSpecefic, reponseSpecefic, productExist } = props
    const [disable, setDisable] = useState(false)
    // useEffect(() => {

    // })
    useEffect(() => {
        if (entetyVal.length > 0) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [])

    const onChange = (input) => {
        console.log("Input changed", input);
        setReponseSpecefic(input)
    }

    const onKeyPress = (button) => {
        console.log("Button pressed", button);
        if (button.toString() == "{enter}") {
            setshowKeyBoard(false)
        }
    }

    return (

        <form
            onSubmit={(e) => {
                entityHandelSubmit(e, selectedEntent);
            }}
            style={{
                zIndex: 10,
                width: "400px",
                position: "absolute",
                right: "102%",
                background: "#fff",
                padding: "10px 20px",
                display: "flex",
                flexDirection: "column",
                // height: "250px",
                justifyContent: "space-around",
                top: "20px",
                border: "2px solid lightgray",
                borderRadius: "10px"
            }}>
            <div style={{
                position: "absolute",
                height: "10px",
                width: "10px",
                borderRight: "2px solid lightgray",
                borderTop: "2px solid lightgrey",
                background: "#fff",
                right: "-7px",
                transform: "rotate(45deg)"
            }} />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <svg onClick={() => { props.setShowEntity(false); props.setproductId(''); setEntetysVal(''); setReponseSpecefic('') }} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <g id="Groupe_1163" data-name="Groupe 1163" transform="translate(-3.375 -3.375)">
                        <path id="Tracé_213" data-name="Tracé 213" d="M19.231,18.231,16.9,15.9l2.329-2.329a.706.706,0,0,0-1-1L15.9,14.9l-2.329-2.329a.706.706,0,0,0-1,1L14.905,15.9l-2.329,2.329a.683.683,0,0,0,0,1,.7.7,0,0,0,1,0L15.9,16.9l2.329,2.329a.709.709,0,0,0,1,0A.7.7,0,0,0,19.231,18.231Z" transform="translate(-3.529 -3.527)" fill="#b4b4b4" />
                        <path id="Tracé_214" data-name="Tracé 214" d="M12.375,4.587a7.785,7.785,0,1,1-5.508,2.28,7.737,7.737,0,0,1,5.508-2.28m0-1.212a9,9,0,1,0,9,9,9,9,0,0,0-9-9Z" fill="#b4b4b4" />
                    </g>
                </svg>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column"
            }}>
                <label style={{
                    fontFamily: "poppins",
                    marginBottom: "10px",
                    fontSize: "14px",
                    fontWeight: "bold"
                }}>Product name</label>
                <input style={{
                    padding: "8px",
                    border: "2px solid lightgray",
                    borderRadius: "5px",
                    outline: "none"
                }} type="text" name="entity" autoComplete="off" onChange={(e) => { setEntetysVal(e.target.value); }} value={entetyVal} disabled={disable} required />

                <span style={{
                    color: "red",
                    height: "10px",
                    transform: "translateY(6px)"
                }}>{productExist}</span>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column"
            }}>
                <label style={{
                    fontFamily: "poppins",
                    marginBottom: "10px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginTop: 20
                }}>Specific response</label>
                <textarea style={{
                    padding: "8px",
                    border: "2px solid lightgray",
                    borderRadius: "5px"
                }} type="text" name="responseSpecific" onChange={e => setReponseSpecefic(e.target.value)} value={reponseSpecefic} required />
                {showKeyBoard &&
                    <div style={{
                        position: "absolute",
                        bottom: -100,
                        right: -90
                    }}>
                        <Keyboard
                            onChange={onChange}
                            onKeyPress={onKeyPress}
                            layout={layout}
                        />
                    </div>
                }
                <span style={{
                    margin: "10px 5px",
                    width: 41,
                    background: "rgb(249, 249, 249)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 40,
                    border: "1px solid lightgray",
                    cursor: 'pointer'
                }} onClick={() => setshowKeyBoard(!showKeyBoard)}>ع</span>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" style={{
                    border: "none",
                    background: "transparent",
                    padding: 0,
                    margin: "10px 5px",
                    outline: "none"
                }}>
                    <svg width={100} height={40} viewBox="0 0 100 40">
                        <g data-name="Groupe 1132" transform="translate(-1210 -782)">
                            <rect
                                data-name="Rectangle 1563"
                                width={100}
                                height={40}
                                rx={2}
                                transform="translate(1210 782)"
                                fill="#4080ff"
                            />
                            <text
                                transform={`translate(${disable ? 1235 : 1243} 807)`}
                                fill="#fff"
                                fontSize={14}
                                fontFamily="Poppins-SemiBold, Poppins"
                                fontWeight={600}
                            >
                                <tspan x={0} y={0}>
                                    {disable ? "Update" : "Add"}
                                </tspan>
                            </text>
                        </g>
                    </svg>
                </button>
            </div>
        </form>

    )
}

export default EntityForm
