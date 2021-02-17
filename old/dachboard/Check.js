import React from 'react'
import TopMenu from '../components/TopMenu'
import { Link } from 'react-router-dom'

function Check(props) {
    return (
        <>
            <TopMenu />
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: 600, height: 400, background: '#fff', boxShadow: "0 0 30px lightgray", margin: "70px auto 0 auto" }}>

                <Link to={`/dachboard/wizard/pages/monitorPost`}><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="320"
                    height="80"
                    data-name="Composant 36 – 1"
                    viewBox="0 0 320 80"
                >
                    <g
                        fill="#e4e6eb"
                        stroke="#707070"
                        strokeWidth="2"
                        data-name="Rectangle 1576"
                    >
                        <rect width="320" height="80" stroke="none" rx="5"></rect>
                        <rect width="318" height="78" x="1" y="1" fill="none" rx="4"></rect>
                    </g>
                    <text
                        fill="#818e94"
                        data-name="Specific post’s comment"
                        fontFamily="Poppins-SemiBold, Poppins"
                        fontSize="20"
                        fontWeight="600"
                        letterSpacing="-.016em"
                        transform="translate(160 47)"
                    >
                        <tspan x="-122.04" y="0">
                            Specific post’s comment
        </tspan>
                    </text>
                </svg></Link>
                <br /><br />
                <Link to={`/dachboard/wizard/pages/monitorPage`}><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="320"
                    height="80"
                    data-name="Composant 37 – 1"
                    viewBox="0 0 320 80"
                >
                    <g
                        fill="#e4e6eb"
                        stroke="#707070"
                        strokeWidth="2"
                        data-name="Rectangle 1577"
                    >
                        <rect width="320" height="80" stroke="none" rx="5"></rect>
                        <rect width="318" height="78" x="1" y="1" fill="none" rx="4"></rect>
                    </g>
                    <text
                        fill="#818e94"
                        data-name="Generic intents"
                        fontFamily="Poppins-SemiBold, Poppins"
                        fontSize="20"
                        fontWeight="600"
                        letterSpacing="-.016em"
                        transform="translate(160 47)"
                    >
                        <tspan x="-74.99" y="0">
                            Generic intents
        </tspan>
                    </text>
                </svg></Link>


            </div>
        </>
    )
}

export default Check
