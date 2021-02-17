import React, { useState, useEffect } from 'react'
import IntentContainerTable from './IntentContainerTable'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import { emptyToggleIntent } from '../actions/index'
function IntentContainer(props) {
    const [intent, setIntent] = useState([])
    const [selectedEntent, setselectedEntent] = useState([])
    const showententForm = (intent) => {
        if (selectedEntent.includes(intent)) return;
        setselectedEntent([...selectedEntent, intent])
    }

    const removeSelectedIntent = (removedIntent) => {
        setselectedEntent(selectedEntent.filter(el => el != removedIntent))
    }

    useEffect(() => {
        props.emptyToggleIntent()
        manupilateIntentsData()
        if (props.porject) {
            const projectActiveIntent = props.porject.intents.map(el => el.name)
            console.log(projectActiveIntent)
            setselectedEntent(projectActiveIntent)
        }
    }, [props.intent])

    const manupilateIntentsData = () => {
        let obj
        let newdata = {}
        // let expressions
        for (let i = 0; i < props.intent.length; i++) {
            obj = {
                [props.intent[i]['intent']]: {
                    id: props.intent[i]['id'],
                    // expression: props.intent[i + 1] && props.intent[i]['intent'] === props.intent[i + 1]['intent'] ? [...newdata.data[i]['intent']['expression'], props.intent[i]['expression']] : [...newdata.data[i]['intent']['expression'], props.intent[i]['expression']],
                    date: props.intent[i]['date']
                }
            }
            newdata = { ...newdata, ...obj }

        }
        setIntent(Object.keys(newdata))
    }

    return (
        <>
            {
                props.porject ?
                    <div>
                        <div style={{ width: "95%", border: "1px solid #B4B4B4", borderRadius: 15, padding: 20 }}>
                            <h4 style={{ marginTop: 0 }}>Select Intents</h4>
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                {
                                    intent.map(el =>
                                        <button key={el} className="btn" style={{ background: selectedEntent.find(Element => el == Element) ? 'rgba(229, 0, 125, 0.15)' : 'transparent', cursor: 'pointer', margin: 1 }} onClick={() => showententForm(el)}>{el}</button>
                                    )
                                }
                            </div>
                        </div>
                        <br /><br />
                        <div style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "flex-start"
                        }}>

                            {
                                selectedEntent.map(el => <IntentContainerTable removeSelectedIntent={removeSelectedIntent} key={Math.random()} selectedEntent={el} intents={props.porject.hasOwnProperty("intents") ? props.porject.intents.find(Element => Element.name == el) : 'undefined'} />)
                            }
                        </div>
                    </div> :
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Loader
                            type="Puff"
                            color="#E5007D"
                            height={100}
                            width={100}
                        />
                    </div>
            }
        </>
    )
}

const mapStateToProps = (state, owenProps) => {
    const porject = state.allProjects.find(el => el.post.idPost == owenProps.match.params.idpost)
    console.log('mapStateToProps ', porject)
    return {
        porject
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        emptyToggleIntent: () => dispatch(emptyToggleIntent())
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IntentContainer))
