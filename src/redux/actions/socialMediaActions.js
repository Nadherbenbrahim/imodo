import axios from 'axios'
import { host } from '../../config';
import Swal from 'sweetalert2/dist/sweetalert2.js';

// Popup Config: 
const popup = Swal.mixin({
    customClass: {
    confirmButton: 'wizard-pages-active-btn',
    },
    buttonsStyling: false
});

// Public reply:
export const sendPublicReply = (history,page,message,status) => {
    return (dispatch) => {
        
        let objectToSend = null;
        let pagePlatform = page.platform === "fb" ? "facebook" : "instagram";
        
        if(status) {
            objectToSend = {
                statut: true,
                message: message,
            }
            
        } else {
            objectToSend = {
                statut: false,
                message: message,
            }
        }

        console.log("Public Reply sending to nour", objectToSend, page.idPage, pagePlatform);

        return axios.put(host + `/api/v1/secure/pages/publicreply/${page.idPage}/${pagePlatform}`,objectToSend,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        // .then(res => {
        //     console.log('Public Reply Response =>', res.data.data);

        //     history.push('/pages');
        // })
        // .catch((err) => console.log("setPreferences err", err))
    }
};

// Set Language :
export const setLang = (lang) => {
    return (dispatch) => {
        // console.log("Lang !", lang);
        localStorage.setItem("modoLang", lang);

        dispatch({
            type: 'SET_LANG',
            payload: lang,
        });
    };
};

// Filtring Pages:
export const filterPages = (filterBy,Pages) => {
    return (dispatch) => {

        // console.log("Filter", filterBy, "Those =>", Pages)
        
        if(filterBy === "all") {
            dispatch({
                type: 'FILTER_PAGES',
                payload: [],
            });
        } else {
            let filteredPages = Pages.filter((page) => page.platform === filterBy);
            dispatch({
                type: 'GET_ALL_PAGES',
                payload: filteredPages,
            });
        };
        
    };
};

export const resetFilterPages = () => {
    return (dispatch) => {
        dispatch({ type: 'RESET_FILTER_PAGES' });
    };
};

export const filterDashboardPosts = (Page,filter) => {
    return (dispatch) => {

        const fbHost = "https://graph.facebook.com/v8.0";

        return axios.get(host + `/api/v1/secure/logEvent/dashbord/post/${Page.id}/${Page.accessToken}/${Page.platform}/${filter}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('getDashboardPosts', res.data.data);
            
            dispatch({
                type: 'GET_DASHBOARD_POSTS',
                payload: res.data.data,
            });
            
        })
        // .catch((err) => console.log("err getDashboardPosts", err))
    };
};

export const filterDashboardIntents = (Page,filter) => {
    return (dispatch) => {

        return axios.get(host + `/api/v1/secure/logEvent/dashbord/intent/${Page.id}/${Page.platform}/${filter}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('Filtring dashboard intents RESULTS =>', res.data.data);
            let limitedTo5 = res.data.data.slice(0,5);

            dispatch({
                type: 'GET_DASHBOARD',
                payload: limitedTo5,
            });
        })
        .catch((err) => console.log("Error Filtring dashboard intents", err))
    };
};

export const getDashboardPosts = (Page) => {
    return (dispatch) => {

        const fbHost = "https://graph.facebook.com/v8.0";

        return axios.get(host + `/api/v1/secure/logEvent/dashbord/post/${Page.id}/${Page.accessToken}/${Page.platform}/all`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('getDashboardPosts', res.data.data);
            
            dispatch({
                type: 'GET_DASHBOARD_POSTS',
                payload: res.data.data,
            });
            
        })
        .catch((err) => console.log("err getDashboardPosts", err))
    };
};

export const getDashboard = (Page) => {
    return (dispatch) => {

        // console.log("Getting the dashboard with page =>", Page.id);
        let filter = "all";

        return axios.get(host + `/api/v1/secure/logEvent/dashbord/intent/${Page.id}/${Page.platform}/${filter}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('/logEvent/dashbord/intent/ Result =>', res.data.data);
            let limitedTo5 = res.data.data.slice(0,5);

            dispatch({
                type: 'GET_DASHBOARD',
                payload: limitedTo5,
            });
        })
        .catch((err) => console.log("err getDashboard", err))
    };
};

export const setPreferences = (history,spam,likes,delay,Page,Platform,exactlySeconds,exactlyMinutes,randomlyFromSeconds,randomlyFromMinutes,randomlyToSeconds,randomlyToMinutes) => {
    return (dispatch) => {
        
        let objectToSend = null;
        let pagePlatform = Platform === "fb" ? "facebook" : "instagram";
        if(delay === "immediatly") {
            objectToSend = {
                platforme: pagePlatform,
                likesComment:likes,
                spam: spam,
                respReplies: {
                    statut: 'immediatly',
                    time: [0]
                }
            }

            console.log("Immediatly",objectToSend);

        } else if(delay === "Exactly") {
            // Minutes + Seconds => X ms
            let minutes = exactlyMinutes * 60000;
            let seconds = exactlySeconds * 1000;
            let finalTime = minutes + seconds;

            objectToSend = {
                platforme: pagePlatform,
                likesComment:likes,
                spam: spam,
                respReplies: {
                    statut: 'Exactly',
                    time: [finalTime],
                }
            }

            console.log("Exactly",objectToSend);

        } else {
            // from Minutes + Seconds => X ms
            // to Minutes + Seconds => X ms
            let minutesFrom = randomlyFromMinutes * 60000;
            let secondsFrom = randomlyFromSeconds * 1000;
            let finalTimeFrom = minutesFrom + secondsFrom;
            
            let minutesTo = randomlyToMinutes * 60000;
            let secondsTo = randomlyToSeconds * 1000;
            let finalTimeTo = minutesTo + secondsTo;

            objectToSend = {
                platforme: pagePlatform,
                likesComment:likes,
                spam: spam,
                respReplies: {
                    statut: 'Randomly',
                    time: [finalTimeFrom,finalTimeTo],
                }
            }

            console.log("Randomly",objectToSend);

        }


        console.log("Preferences sending to nour", objectToSend);

        return axios.put(host + `/api/v1/secure/pages/preference/${Page.idPage}/${pagePlatform}`,objectToSend,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('setPreferences Response =>', res.data.data);

            history.push('/pages');
        })
        .catch((err) => console.log("setPreferences err", err))
    }
};

export const addPageEntity = (page) => {
    return (dispatch) => {
        
        return axios.get(host + `/api/v1/secure/pages/entities/add/${page.id}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('add entity', res.data.data);
            
            // dispatch({
            //     type: 'GET_ENTITIES_OF_A_PAGE',
            //     payload: res.data.data
            // })
        })
        .catch((err) => console.log("err addPageEntity", err))
    }
};

export const getPageEntities = (page) => {
    return (dispatch) => {
        
        return axios.get(host + `/api/v1/secure/project/get/entitiesproject/${page.platform}/${page.id}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            // console.log('entities mtaaa page', res.data.data);
            let categories = res.data.data;

            if(categories.length > 0) {
                categories.map((cat,index) =>
                    cat.default === true && categories.splice(index,1)
                );
            };


            dispatch({
                type: 'GET_ENTITIES_OF_A_PAGE',
                payload: categories
            })
        })
        .catch((err) => console.log("err getPageEntities", err))
    }
};

// TEAM:

export const getTeamMembers = (Page) => {
    return (dispatch) => {

        return axios.get(host + `/api/v1/secure/membership/listUser/${Page.id}/${Page.platform}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            // console.log('membership/listUser/ Response api  => ', res.data.data);

            dispatch({
                type: 'GET_TEAM',
                payload: res.data.data
            })
        })
        .catch((err) => console.log("membership/listUser/ error =>", err))
    }
};

export const sendMailTeam = (Page, emailTeamMember, nameTeamMember, inviteToken) => {
    return (dispatch) => {
    
        // console.log("Page", Page);
        // console.log("Email", emailTeamMember);
        // console.log("Name", nameTeamMember);

        return axios.post(host + `/api/v1/secure/membership/sendMail/${Page.id}/${Page.platform}`, {
            email: emailTeamMember,
            nameUser: nameTeamMember,
            token: inviteToken,
        },
        {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('membership/sendMail/ Response api  => ', res.data.data)
        })
        .catch((err) => console.log("membership/sendMail/ error =>", err))
    }
};

export const inviteExistingMember = (page,member) => {
    return (dispatch) => {
        
        return axios.post(host + `/api/v1/secure/membership/addExistingMember/${page.id}/${page.platform}`, member, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        });
    }
};

export const inviteMember = (page,nameTeamMember) => {
    return (dispatch) => {
        
        return axios.get(host + `/api/v1/secure/membership/get/${page.id}/${page.platform}/${nameTeamMember}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
    }
};

export const deleteTeamMember = (page,idFacebook,role) => {
    return (dispatch) => {
       let typePage = page.platform;
       let idPage = page.id;

        return axios.post(host + `/api/v1/secure/membership/deleteMember/${role}`,{
            idFacebook,
            idPage,
            typePage,
        },{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('/membership/deleteMember/ response api', res.data.data);

            dispatch({
                type: 'GET_TEAM',
                payload: res.data.data
            })
        })
        .catch((err) => {
            console.log("/membership/deleteMember/ error api", err)
            popup.fire({
                title: 'Error while deleting the member',
                confirmButtonText: 'Retry',
            });
        })
    }
};


/* INSTAGRAM */
export const connectInstagramPage = (idPage) => {
    return (dispatch) => {

        let page = {
            id: idPage,
        };
        
        return axios.post(host + `/api/v1/secure/pagesInsta/connect/`,page,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        // .then(res => {
        //     console.log('retour de connect page insta', res.data);
            
        //     // dispatch({
        //     //     type: 'GET_ENTITIES_OF_A_PAGE',
        //     //     payload: res.data.data
        //     // })
        // })
        // .catch((err) => console.log("err connect page insta", err))
    }
};

export const disconnectInstagramPage = (idPage) => {
    return (dispatch) => {
     
        let page = {
            id: idPage,
        };
        
        return axios.post(host + `/api/v1/secure/pagesInsta/disconnect/disconnect`,page,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('retour de disconnect page insta', res.data);
            
            // dispatch({
            //     type: 'GET_ENTITIES_OF_A_PAGE',
            //     payload: res.data.data
            // })
        })
        .catch((err) => console.log("err disconnect page instagram", err))
    };
};

export const deleteInstagramPage = (idPage) => {
    return (dispatch) => {
     
        let page = {
            id: idPage,
        };
        
        return axios.post(host + `/api/v1/secure/pagesInsta/disconnect/delete`,page,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('retour de disconnect page insta', res.data);
            
            // dispatch({
            //     type: 'GET_ENTITIES_OF_A_PAGE',
            //     payload: res.data.data
            // })
        })
        .catch((err) => console.log("err disconnect page instagram", err))
    };
};

export const makeOwnerInstagramPage = (idPage,idFacebook) => {
    return (dispatch) => {
     
        let page = {
            id: idPage,
            idFacebook: idFacebook // idFacebook of the new owner
        };
        
        return axios.post(host + `/api/v1/secure/pagesInsta/disconnect/owner`,page,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('retour de owner page insta', res.data);
            
            // dispatch({
            //     type: 'GET_ENTITIES_OF_A_PAGE',
            //     payload: res.data.data
            // })
        })
        .catch((err) => console.log("err owner page instagram", err))
    };
};

/* FACEBOOK */
export const connectFacebookPage = (idPage) => {
    return (dispatch) => {
        
        let page ={
            id: idPage,
        };

        return axios.post(host + `/api/v1/secure/pages/connect/`,page,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        // .then(res => {
        //     console.log('retour de connect page facebook', res.data);
            
        //     // dispatch({
        //     //     type: 'GET_ENTITIES_OF_A_PAGE',
        //     //     payload: res.data.data
        //     // })
        // })
        // .catch((err) => console.log("err de connect page facebook", err))
    }
};

export const disconnectFacebookPage = (idPage) => {
    return (dispatch) => {

        let page = {
            id: idPage,
        };
        
        return axios.post(host + `/api/v1/secure/pages/disconnect/disconnect`,page,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        // .then(res => {
        //     console.log('retour de disconnect page facebok', res.data);
            
        //     // dispatch({
        //     //     type: 'GET_ENTITIES_OF_A_PAGE',
        //     //     payload: res.data.data
        //     // })
        // })
        // .catch((err) => console.log("err de disconnect page facebok", err))

    };
};

export const deleteFacebookPage = (idPage,idFacebook) => {
    return (dispatch) => {

        let page = {
            id: idPage,
        };
        
        return axios.post(host + `/api/v1/secure/pages/disconnect/delete`,page,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('retour de disconnect page facebok', res.data);
            
            // dispatch({
            //     type: 'GET_ENTITIES_OF_A_PAGE',
            //     payload: res.data.data
            // })
        })
        .catch((err) => console.log("err de disconnect page facebok", err))

    };
};

export const makeOwnerFacebookPage = (idPage,idFacebook) => {
    return (dispatch) => {
     
        let page = {
            id: idPage,
            idFacebook: idFacebook // idFacebook of the new owner
        };
        
        return axios.post(host + `/api/v1/secure/pages/disconnect/owner`,page,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('retour de owner page facebook', res.data);
            
            // dispatch({
            //     type: 'GET_ENTITIES_OF_A_PAGE',
            //     payload: res.data.data
            // })
        })
        .catch((err) => console.log("err owner page facebook", err))
    };
};



export const purgePages = (allPages, idPage) => {
    return async (dispatch) => {        
        console.log('idPage', idPage,'purge this =>', allPages ,);
        // allPages.filter(page => page.idPage !== idPage);
    
        dispatch({
            type: 'GET_ALL_PAGES',
            payload: allPages.filter(page => page.idPage !== idPage),
        })
    }
};

export const sycroPageWithWizard = (allPages,wizardPage) => {
    return async (dispatch) => {
        
        // console.log('Lets search for', wizardPage);
        // console.log('in', allPages);

        let found = allPages.filter((p) => p.idPage === wizardPage.id);
        let page = found[0];
        
        // console.log("Pagek ahaya =>", page);

        const selectedPage = {
            platform: page.platform,
            name: page.name,
            picture_url : page.imageUrl ? page.imageUrl : `https://graph.facebook.com/v8.0/${page.idPage}/picture?access_token=${page.access_token}`,
            id: page.idPage,
            accessToken: page.access_token,
            team: page.user,
            admins: page.admins,
            status: page.status,
        };
        
        // console.log("You just sync a page with wizard", selectedPage)

        dispatch({
            type: 'SELECT_SOCIAL_MEDIA_PAGE',
            payload: selectedPage
        })
    }
};

export const selectSocialMediaPage = (page,platform,status) => {
    return async (dispatch) => {
        /*
            ALL STATUS :
            "listPageConnectedOwner" => #E5007D" || "listPageInvite" => #139216" 
            "listPageInviteAdmin" => "#199EE3"  || "listPageConnectedOtherTeam" => #B4B4B4"
            "listPageNotConnected" => "No Color"
        */

        const selectedPage = {
            platform: platform === "fb" ? "facebook" : "instagram",
            name: page.name,
            picture_url : page.imageUrl ? page.imageUrl : `https://graph.facebook.com/v8.0/${page.idPage}/picture?access_token=${page.access_token}`,
            id: page.idPage,
            accessToken: page.access_token,
            team: page.user,
            admins: page.admins,
            status: status,
        };
        
        // console.log("u just selected a page", selectedPage)

        dispatch({
            type: 'SELECT_SOCIAL_MEDIA_PAGE',
            payload: selectedPage
        })
    }
};

export const getFbData = () => {
    return async (dispatch) => {
           
        let token = await localStorage.getItem('authtoken');

        return axios.get(host + '/api/v1/secure/pages/get/all/', {
            headers: {
                'authorization': 'Bearer ' + token
            }
        })
        .then(res => {
        
            let allFbPages = [];
            Object.entries(res.data.data).map( ([key, tab]) => 
                tab.map((page) => {
                    page.status = key;
                    allFbPages.push(page);
            }));

            allFbPages.sort((page,nextPage) =>  {
                let  nameA = page.name.toLowerCase(), nameB = nextPage.name.toLowerCase()
                //sort ascending 
                if (nameA < nameB) return -1; 

                if (nameA > nameB) return 1;
                
                return 0; // default return value (no sorting)
            });

            dispatch({
                type: 'GET_FB_DATA',
                payload: allFbPages,
                payload2: res.data.data,
            })
        })
        .catch((err) => {
            console.log("GetFbData err", JSON.stringify(err))
        })
    }
};

export const getInstaData = () => {
    return async (dispatch) => {

       let token = await localStorage.getItem('authtoken');
        
        return axios.get(host + '/api/v1/secure/pagesInsta/get/all/', {
            headers: {
                'authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            // console.log('Instagram pages ya haider =>', res.data.data)
            let allInstaPages = [];
            
            Object.entries(res.data.data).map( ([key, tab]) => 
                tab.map((page) => {
                    page.status = key;
                    allInstaPages.push(page);
                }
            ));

            allInstaPages.sort((page,nextPage) =>  {                
                let  nameA = page.name.toLowerCase(), nameB = nextPage.name.toLowerCase()
                //sort ascending 
                if (nameA < nameB) return -1; 

                if (nameA > nameB) return 1;
                
                return 0; // default return value (no sorting)
            });
            
            dispatch({
                type: 'GET_INSTA_DATA',
                payload: allInstaPages,
                payload2: res.data.data
            })
        })
        .catch((err) => {
            console.log("getInstaData error", JSON.stringify(err))
        })
    }
};


export const getAllPage = () => {
    return async (dispatch) => {

        let token = await localStorage.getItem('authtoken');

        dispatch({ type: 'RESET_ALL_PAGES' })
        
        return axios.get(host + '/api/v1/secure/pages/test/get/all/', {
            headers: {
                'authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            // console.log('getting all pages :D ===>', res.data.data)

            let apiResp = res.data.data;
            let allPages = [];

            // Push the Fb Data:
            Object.entries(apiResp.facebookPages).map( ([key, tab]) => 
                tab.map((page) => {
                    page.platform = "facebook"
                    page.status = key;
                    allPages.push(page);
            }));
            
            // Push the Insta Data:
            Object.entries(apiResp.instaPages).map( ([key, tab]) => 
                tab.map((page) => {
                    page.platform = "instagram"
                    page.status = key;
                    allPages.push(page);
            }));

            allPages.sort((page,nextPage) =>  {                
                let  nameA = page.name.toLowerCase(), nameB = nextPage.name.toLowerCase()
                //sort ascending 
                if (nameA < nameB) return -1; 

                if (nameA > nameB) return 1;
                
                return 0; // default return value (no sorting)
            });
            
            // console.log("All Pages for test are Sorted=>",allPages);

            dispatch({
                type: 'GET_ALL_PAGES',
                payload: allPages,
            })
        })
        .catch((err) => {
            console.log("getAllPage error ya nouuur", err)
        });

    }
};

export const getAllPageConnected = () => {
    return async (dispatch) => {

        let token = await localStorage.getItem('authtoken');
        
        dispatch({ type: 'RESET_ALL_PAGES' })
        

        return axios.get(host + '/api/v1/secure/pages/test/connect/get/all/', {
            headers: {
                'authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            // console.log('getAllPageConnected ===>', res.data.data)

            let apiResp = res.data.data;
            let allPages = [];

            // Push the Fb Data:
            Object.entries(apiResp.facebookPages).map( ([key, tab]) => 
                tab.map((page) => {
                    page.platform = "facebook"
                    page.status = key;
                    allPages.push(page);
            }));
            
            Object.entries(apiResp.instaPages).map( ([key, tab]) => 
                tab.map((page) => {
                    page.platform = "instagram"
                    page.status = key;
                    allPages.push(page);
            }));
            
            allPages.sort((page,nextPage) =>  {                
                let  nameA = page.name.toLowerCase(), nameB = nextPage.name.toLowerCase()
                //sort ascending 
                if (nameA < nameB) return -1; 

                if (nameA > nameB) return 1;
                
                return 0; // default return value (no sorting)
            });

            // console.log("All Pages Connected Pages for test are Sorted =>",allPages);

            dispatch({
                type: 'GET_ALL_PAGES',
                payload: allPages,
            })
        })
        .catch((err) => {
            console.log("getAllPageConnected error", JSON.stringify(err))
        });

    }
}

export const resetAllPages = () => {
    return (dispatch) => dispatch({ type: 'RESET_ALL_PAGES' });
};

export const resetDashboard = () => {
    return (dispatch) => dispatch({ type: 'RESET_DASHBOARD' });
};

export const resetSocialMediaSelections = () => {
    return (dispatch) => dispatch({ type: 'RESET_SM_SELECTIONS' });
};


