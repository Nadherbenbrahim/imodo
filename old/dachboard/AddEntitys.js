import React, { useState } from 'react'
import TopMenu from '../components/TopMenu'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addSynonym, getAllEntity, addValue, removeSynonym, updateEntityName } from '../actions'

import AddEntityTable from '../components/AddEntityTable'


function AddEntitys(props) {
    const [inputState, setInputState] = useState(false)
    const handelSumbit = (e, normlizedValue) => {
        e.preventDefault()
        let obj = {
            entity: {
                content: normlizedValue,
                synonyms: normlizedValue
            },
            id: props.entity._id
        }

        props.addVal(props.fb, obj)
            .then(() => props.getAllEntity(props.fb))
        e.currentTarget.reset()
    }
    const handelSubmitSynonym = (e, data) => {
        e.preventDefault()
        props.addSyn(props.fb, data)
            .then(() => props.getAllEntity(props.fb))
        console.log({ fb: props.fb, data })
    }

    const removSynonym = (id, synonym, index) => {
        console.log(props.fb)
        props.removeSyn(props.fb, { synonym, id, index })
            .then(() => props.getAllEntity(props.fb))
    }
    return (
        <div>
            <TopMenu />
            <div style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30 }}>
                <h2 style={{ fontSize: 30, color: "rgba(45, 47, 57, 1)" }}>Update category</h2>
                {
                    inputState && <form onSubmit={
                        e => {
                            e.preventDefault()
                            props.updateEntityName({ id: props.entity._id, name: e.target.entityName.value })
                                .then(() => {
                                    setInputState(false)
                                    props.getAllEntity(props.fb)
                                })
                        }
                    }><input type="text" defaultValue={props.entity.name} name="entityName" className="entityNameUpdate" /><br /><br /></form>
                }
                <div>
                    <svg style={{ cursor: 'pointer' }} onClick={() => setInputState(!inputState)}
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
                    <span className="entityTitle">{'   '}{props.entity.name}</span>
                </div>
                <form style={{
                    display: 'flex',
                    marginTop: 30,
                    marginBottom: 30
                }} onSubmit={(e) => handelSumbit(e, e.target.add.value)}>
                    <input type="text" name="add" id="addEntity" required />
                    <button type="submit">
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
                </form>
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
                                props.entity.children.map((el, index) =>
                                    <AddEntityTable entity={props.entity} el={el} key={el._id} index={index} removSynonym={removSynonym} handelSubmitSynonym={handelSubmitSynonym} />
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <br />
            <div onClick={() => { props.history.goBack()}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="125" height="50" viewBox="0 0 125 50">
                    <g id="Button" transform="translate(-1376 -914)">
                        <rect id="Rectangle_1549" data-name="Rectangle 1549" width="125" height="50" rx="4" transform="translate(1376 914)" fill="#e4e6eb" />
                        <text id="Back" transform="translate(1416 946)" fill="#818e94" font-size="20" font-family="Roboto-Bold, Roboto" font-weight="700"><tspan x="0" y="0">Back</tspan></text>
                    </g>
                </svg>
                </div>
            </div>
        </div >
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addSyn: (uid, data) => dispatch(addSynonym(uid, data)),
        getAllEntity: (id) => dispatch(getAllEntity(id)),
        addVal: (uid, data) => dispatch(addValue(uid, data)),
        removeSyn: (uid, data) => dispatch(removeSynonym(uid, data)),
        updateEntityName: (data) => dispatch(updateEntityName(data))
    }
}

const mapStateToProps = (state, owenProps) => {
    const entity = state.entitys.find(el => el._id === owenProps.match.params.id)
    return {
        entity,
        fb: state.fbdata.tokenDetail.userID,
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEntitys))
