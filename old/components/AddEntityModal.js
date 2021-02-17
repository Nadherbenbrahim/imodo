import React, { useState } from 'react'

function AddEntityModal(props) {
    const [entity, setEntity] = useState('')
    const [value, setValue] = useState('')
    const [synonym, setSynonym] = useState('')
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            props.handelSubmit(entity, value, synonym);
            e.currentTarget.reset()
            props.close()
        }} style={{ padding: "50px" }}>
            <label style={{
                fontFamily: "poppins",
                marginBottom: "10px",
                fontSize: "14px"
            }}>Entity</label><br /><br />
            <input style={{
                padding: "8px",
                border: "2px solid lightgray",
                borderRadius: "5px",
                outline: "none",
                width: "100%"
            }} type="text" onChange={(e) => setEntity(e.target.value)} required /><br /><br /><br />
            <label style={{
                fontFamily: "poppins",
                marginBottom: "10px",
                fontSize: "14px"
            }}>Normolized Value</label><br /><br />
            <input style={{
                padding: "8px",
                border: "2px solid lightgray",
                borderRadius: "5px",
                outline: "none",
                width: "100%"
            }} type="text" onChange={(e) => setValue(e.target.value)} required /><br /><br /><br />
            <label style={{
                fontFamily: "poppins",
                marginBottom: "10px",
                fontSize: "14px"
            }}>Synonym</label><br /><br />
            <input style={{
                padding: "8px",
                border: "2px solid lightgray",
                borderRadius: "5px",
                outline: "none",
                width: "100%"
            }} type="text" onChange={(e) => setSynonym(e.target.value)} required /><br /><br /><br />
            <button type="submit">Submit</button>
        </form>
    )
}

export default AddEntityModal
