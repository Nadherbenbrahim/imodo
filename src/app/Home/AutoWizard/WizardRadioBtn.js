import React from 'react';
import { connect } from 'react-redux';
// import { nextWizardStep,resetWizardStep } from '../../../redux/actions/wizardActions';


function WizardRadioBtn(props) {

    return (
        <>
        {
        props.checked
        ?
            <div onClick={() => props.onClick} className="m-auto d-flex wizard-radio-btn-active">
                <div className="m-auto wizard-circle-radio-btn" />
            </div>
        :
            <div className="m-auto d-flex wizard-radio-btn">
                <div className="m-auto wizard-circle-radio-btn" style={{ backgroundColor: 'transparent' }} />
            </div>
        }
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        // wizardStep: state.wizardR.wizardStep,
        // fbData : state.socialMediaR.fbData,
        // instaData : state.socialMediaR.instaData,
    }
};

export default connect(mapStateToProps, { })(WizardRadioBtn);
