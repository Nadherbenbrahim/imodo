import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import { Row } from 'react-bootstrap';

// Translations
import { trans } from '../../../Translations';

import { MdAddCircleOutline } from 'react-icons/md';
import Swal from 'sweetalert2/dist/sweetalert2.js';

export const AddSynonymInput = (props) => {

    let {
        lang,
        product,
        index,
        categorySelected,
        socialMediaPageSelected,

        // Functions
        addSynonym,
        addStaticSynonym,
    } = props;

    const inputRef = useRef();
    const [enableSynonymInput,setEnableSynonymInput] = useState(false);
    const [Synonym,setSynonym] = useState('');

    useEffect(() => {
        enableSynonymInput && inputRef.current.focus();
    },[enableSynonymInput]);


    const newSynonym = () => {
        
        if(addStaticSynonym) {
            addStaticSynonym(index,Synonym);
            setSynonym(''); 
            setEnableSynonymInput(false); 
            props.setSynonymBoxBorder(false); 
        } else {
            addSynonym(Synonym,categorySelected,product,socialMediaPageSelected)
            .then(() => {
                setSynonym(''); 
                setEnableSynonymInput(false); 
                props.setSynonymBoxBorder(false); 
            }) 
            .catch(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: trans[lang].productsDetails.errorDeleteSynonym,
                    showConfirmButton: false,
                    timer: 2000
                })
                setSynonym(''); 
                setEnableSynonymInput(false); 
                props.setSynonymBoxBorder(false); 
            });
        }
    };

    return (
        <div className="m-auto">
            {
            enableSynonymInput
            ?
            <Row className="d-flex mx-auto" style={{ cursor: 'pointer' }}>
                <input 
                    type="text" 
                    className="add-new-product-input w-100" 
                    ref={inputRef} 
                    value={Synonym} 
                    onChange={(e) => setSynonym(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && newSynonym()} 
                />
            </Row>
            : 
            <Row className="d-flex mx-auto" style={{ cursor: 'pointer' }} onClick={() => { setEnableSynonymInput(true); }}>
                <p className="my-auto mr-auto">{trans[lang].productsDetails.addSynonym}</p>
                <MdAddCircleOutline className="my-auto ml-auto" color={'#818E94'} size={'15'} />
            </Row>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    lang : state.socialMediaR.lang,
    socialMediaPageSelected : state.socialMediaR.socialMediaPageSelected,
    categorySelected : state.productsR.categorySelected,
    productSelected: state.productsR.productSelected, 
})

export default connect(mapStateToProps,{})(AddSynonymInput)
