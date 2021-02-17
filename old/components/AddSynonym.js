import React, { useState } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function AddSynonym(props) {
    const [synonym, setSynonym] = useState('')
    const [existSynonym, setExistSynonym] = useState(false)
    return (
        <form className="addSynForm" onSubmit={(e) => {
            e.preventDefault();
            const synonymExist = props.entity.children.find(Element => Element.synonyms.find(el => el.toUpperCase() == synonym.toUpperCase()))
            if (synonymExist) {
                setExistSynonym(true)
                return;
            }
            setExistSynonym(false)
            let obj = {
                entity: {
                    content: props.content,
                    synonyms: synonym
                },
                idEntity: props.entityId,
                idChildren: props.childrenId
            }

            props.handelSubmitSynonym(e, obj)
            e.currentTarget.reset()

        }} style={{ display: "inline-block" }}>
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
            <input style={{ width: 120, borderColor: existSynonym ? "red" : "rgb(129, 142, 148)" }} className="addSyn" type="text" onChange={(e) => setSynonym(e.target.value)} placeholder="Add Synonym" required />
            {existSynonym && <span style={{ position: "absolute", left: "50%", bottom: -20, transform: "translateX(-50%)", color: "red", fontSize: 13, whiteSpace: "nowrap" }}>Synonyms Exist</span>}
        </form>
    )
}

export default withRouter(connect((state, props) => {
    const entity = state.entitys.find(el => el._id == props.match.params.id)
    console.log('test ', entity)
    return {
        entity
    }
})(AddSynonym))
