import axios from 'axios';
import { host, trainagenthost } from '../../config';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const loginAction = (token, ownProps) => {
    return (dispatch) => {
        
        dispatch(showLoading())
        
        console.log("doing login !!!")

        axios.post(host + '/api/v1/auth/login/facebook', {
            token
        }).then(resdata => {
            console.log('Login =>', resdata)
            localStorage.setItem('authtoken', resdata.data.data.user.idFacebook)
            dispatch(hideLoading())
            ownProps.history.push('dashboard')
         
            // dispatch({
            //     type: 'LOGIN',
            //     user: resdata
            // })
        }).catch(() => dispatch(hideLoading()))
    }
};

export const logoutAction = (owenProps) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.post(host + '/api/v1/auth/logout', null, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        }).then(() => {
            localStorage.removeItem('authtoken')
            localStorage.removeItem('persist:root')
            dispatch({
                type: 'LOGOUT',
            })
            dispatch({
                type: 'RESET'
            })
            owenProps.history.push('/')
            dispatch(hideLoading())
        })

    }
};


export const fbdata = (fbdata) => {
    return {
        type: 'FBDATA',
        fbdata
    }
};
