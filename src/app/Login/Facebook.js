import React, {useEffect, useState} from 'react';
import './Login.css';
import { FacebookProvider, LoginButton } from 'react-facebook';
import axios from 'axios';
import { host } from '../../config';
import Swal from 'sweetalert2/dist/sweetalert2.js';


import {
  Redirect,
  useParams,
} from "react-router-dom";

function Facebook(props) {

  let {
    content,
    type,
  } = props;

  const [redirect, setRedirect] = useState(false);
  let { tokenMembership } = useParams();
  
  // Popup config
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'wizard-pages-active-btn-alert',
    },
    buttonsStyling: false
  });



  const handleResponse = (data) => {
    
    let token = data.tokenDetail.accessToken;
    let tokenMemberShip = tokenMembership ? tokenMembership : null;

    axios.post(host + '/api/v1/auth/login/facebook', {
        token,
        tokenMemberShip
    }).then( async res => {
      console.log('Login retour de nour=>', res.data.data);

      let objectToStore = {
        token : res.data.data.token,
        user : {
          access_token: res.data.data.user.access_token ,
          create_at: res.data.data.user.create_at,
          email:res.data.data.user.email,
          first_name: res.data.data.user.first_name,
          idFacebook:res.data.data.user.idFacebook,
          isConnected:res.data.data.user.isConnected,
          last_name:res.data.data.user.last_name,
          last_signin: res.data.data.user.last_signin,
          profilePictureUrl: res.data.data.user.profilePictureUrl,
          pack: res.data.data.user.pack,
        },
      }
      
      await localStorage.setItem('authtoken', res.data.data.user.idFacebook)
      await localStorage.setItem('userData',JSON.stringify(objectToStore));
      setRedirect(true);
    }).catch((err) => {
      console.log("Login Error =>", err)
      swalWithBootstrapButtons.fire({
        icon: 'error',
        title: 'Connexion error with the server try again !',
        confirmButtonText: 'Okay',
      });
    })

  };

  const handleError = (error) => {
    console.log(error);
  };

  return (
    <>
      { redirect && <Redirect to="/home/dashboard" /> }

      <FacebookProvider appId="783983335073350" version="v3.0">
        <LoginButton
          scope="public_profile,publish_pages,email,pages_messaging,pages_show_list,manage_pages,instagram_basic,instagram_manage_comments,ads_management,ads_read"
          onCompleted={handleResponse}
          onError={handleError}
          
          className={type === "nav" ? "facebookbtn" : type==="signUp" ? "button-free-trial" :  "facebookbtnLanding" }
        >
          <span>{content}</span>
        </LoginButton>
      </FacebookProvider>
    </>
  );
}

export default Facebook;
