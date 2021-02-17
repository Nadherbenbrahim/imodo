import axios from 'axios'
import { host,trainAgentHost } from '../../config';


// Step 4 train agent:
export const testAgent = (msg,intentType,selectedPage,selectedPost) => {
    return (dispatch) => {
        
        // Object to send
        let message = {
            message: { text: msg},
            idPost: intentType === "generic" ? selectedPage.id : selectedPost.id,
        };

        console.log("Test agent to send ya nadher", message);

       
        return axios.post(host + `/api/v1/secure/logEvent/test/wizard`,message,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('testAgent post APi Response =>', res.data.data);

            dispatch({
                type: 'RECEIVE_MSG_STEP_4',
                payload: res.data.data,
            });
        })
        .catch((err) => console.log("testAgent post Api error  =>", err) )
    }
};

export const trainAgentPost = (selectedIntents,idProject) => {
    return (dispatch) => {
        let intentsToStr = ''; 
        let entitiesToStr= '';

        selectedIntents.map( async (intent) => {
            intentsToStr += `${intent.name},`
            if(intent.products.length > 0) {
                await intent.products.map((product) => 
                    entitiesToStr += `${product.product},`
                );
            }
        });

        let objectToNlp = {
            intents: intentsToStr.slice(0,-1),
            entiti: entitiesToStr.slice(0,-1),
            idProject: idProject,
        }  
        console.log("Send Train agent Post to nadher =>", objectToNlp);

        return axios.post(trainAgentHost + `/trainagentpos`,objectToNlp,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
               console.log('Train Agent Post =>', res.data)
                
        }).catch((err) => console.log("ERRRROOOOR while train agent Post =>", err) )
    }
};

export const trainAgentPage = (selectedIntents,idProject) => {
    return (dispatch) => {
        let intentsToStr = ''; 
        let entitiesToStr= '';

        selectedIntents.map( async (intent) => {
            intentsToStr += `${intent.name},`
            if(intent.products.length > 0) {
                await intent.products.map((product) => 
                    entitiesToStr += `${product.product},`
                );
            }
        });

        let objectToNlp = {
            intents:  intentsToStr.slice(0,-1),
            entiti: entitiesToStr.slice(0,-1),
            idProject: idProject,
        }

        console.log("Train agent page to nadher =>", objectToNlp);

        return axios.post(trainAgentHost + `/trainagentpag`,objectToNlp,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('Train Agent Page =>', res.data) 
        }).catch((err) => console.log("ERRRROOOOR while train agent page =>", err) )
    }
};


// Step 3: config agent :
export const resetStep3Wizard = () => {
    return (dispatch) => {
        dispatch({ type: 'RESET_STEP_3' });
    }
};

export const resetWizardPostSelected = () => {
    return (dispatch) => {
        dispatch({ type: 'RESET_WIZARD_POST' });
    }
};

export const resetWizardPageSelected = () => {
    return (dispatch) => {
        dispatch({ type: 'RESET_WIZARD_PAGE' });
    }
};

export const getExistingProject = (idProject) => {
    return (dispatch) => {
        return axios.get(host + `/api/v1/secure/project/get/project/${idProject}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('getExistingProject response redux =>', res.data.data);

            if(res.data.data[0].intents.length > 0) {
                dispatch({
                    type: 'IS_EXISTING_PROJECT',
                    payload: res.data.data[0],
                    payload1: res.data.data[0].intents,
                });
            }
        })
        .catch(err => console.log("ERRRROOOOR while getExistingProject =>", err))
    }
};


export const addGenericResponse = (project, idproject) => {
    return (dispatch) => {
       
        return axios.put(host + `/api/v1/secure/project/generiqueadd/${idproject}`, project, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {  console.log('addReponseGeneric Redux =>', res.data) })
        .catch((err) => console.log("AddGenericResponse errorrr", err))
    }
};

export const updateGenericResponse = (project, idproject) => {
    return (dispatch) => {
        
        return axios.put(host + `/api/v1/secure/project/generiqueupdate/${idproject}`, project, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => console.log('updateReponseGeneric redux ', res.data))
        .catch((err) => console.log("Update GenericResponse err", err))
    }
};

export const addProject = (wizardSelectedPage,wizardSelectedPost) => {
    return (dispatch) => {

        let post;

        if(wizardSelectedPage.platform === "instagram") {
            post = {
                post : {
                    idPage: wizardSelectedPage.id,
                    name: wizardSelectedPage.name,
                    typePage: wizardSelectedPage.platform,
                    idPost: wizardSelectedPost !== null ? wizardSelectedPost.idPost : [],
                    picture: wizardSelectedPost !== null ? wizardSelectedPost.picture : null,
                    message: wizardSelectedPost !== null ? wizardSelectedPost.message : null,
                    status: wizardSelectedPost !== null ? wizardSelectedPost.type : null,
                    published: wizardSelectedPost !== null ? wizardSelectedPost.created_time : null,

                }
            };
        } else {
                post = {
                    post : {
                        idPage: wizardSelectedPage.id,
                        name: wizardSelectedPage.name,
                        typePage: wizardSelectedPage.platform,
                        idPost: wizardSelectedPost !== null ? wizardSelectedPost.id : [],
                        picture: wizardSelectedPost !== null ? wizardSelectedPost.picture : null,
                        message: wizardSelectedPost !== null ? wizardSelectedPost.message : null,
                        status: wizardSelectedPost !== null ? wizardSelectedPost.type : null,
                        published: wizardSelectedPost !== null ? wizardSelectedPost.created_time : null,
                    }
                };
        }

        return axios.post(host + `/api/v1/secure/project/add`,post,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('project added his id is =>', res.data.data);

            dispatch({
                type: 'ADD_ID_PROJECT',
                payload: res.data.data
            })
        }).catch(err => {
            console.log("addProject action", err);
        })
    }
};

export const getAllIntents = (intentType) => {
    return (dispatch) => {
        
        return axios.get(host + (intentType === "generic" ? `/api/v1/intent/generiqueintent/all` : `/api/v1/intent/defaulintent/all`), {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {
                // console.log(`get ${intentType} intents`, res.data.data);
                
                dispatch({
                    type: 'GET_ALL_WIZARD_INTENTS',
                    payload: res.data.data,
                })
               
            }).catch((err) => console.log("Get all intents action", err))
    }
};

export const getWizardActivePosts = (wizardPage) => {
    return (dispatch) => {

        return axios.get(host + `/api/v1/secure/project/get/activeproject/${wizardPage.id}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            // console.log("active posts ya nour", res.data.data);
            
            if(res.data.data !== "project not found") {
                dispatch({
                    type: 'GET_WIZARD_ACTIVE_POSTS',
                    payload: res.data.data
                });
            }
        }).catch((err) => console.log("getWizardPagesPosts ", err))
    }
};

export const getWizardPagesPosts = (wizardPage) => {
    return (dispatch) => {

        return axios.get(host + `/api/v1/secure/post/get/${wizardPage.id}/${wizardPage.platform}/all`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            // console.log("posts ya haaaaaiiderrr",res.data.data);

            res.data.data.sort(function(a,b){ return new Date(Date.parse(b.created_time)) - new Date(Date.parse(a.created_time)) });

            // console.log("Final", toSort);

            dispatch({
                type: 'GET_WIZARD_PAGE_POSTS',
                payload: res.data.data
            })
        }).catch((err) => console.log("getWizardPagesPosts ", err))
    }
};

export const setWizardSelectedPost = (post) => {
    return async (dispatch) => {
        dispatch({
            type: 'SELECT_WIZARD_POST', 
            payload: post,
        });
    }
};

export const setWizardIntentType = (intentType,navigation) => {
    return async (dispatch) => {

        dispatch({
            type: 'SELECT_WIZARD_INTENT_TYPE', 
            payload: intentType,
        });
        navigation.push('/home/auto-wizard')
    }
};

export const setWizardSelectedPage = (platform,pageName,picture,idPage,accessToken,status) => {
    return async (dispatch) => {

        const selectedPage = {
            platform: platform === "insta" ? "instagram" : "facebook",
            name: pageName,
            picture_url : picture !== null ? picture : `https://graph.facebook.com/v8.0/${idPage}/picture?access_token=${accessToken}`,
            id: idPage,
            accessToken: accessToken,
            status: status
        };

        dispatch({
            type: 'SELECT_WIZARD_PAGE', 
            payload: selectedPage,
        });
    }
};



export const resetStep4ReceivedMsg = () => {
    return async (dispatch) => {
        dispatch({
            type: 'RECEIVE_MSG_STEP_4',
            payload: null,
        });
    };
};

export const nextSpecificWizardStep = (step) => {
    return async (dispatch) => {
        dispatch({ type: 'NEXT_SPECIFIC_WIZARD_STEP',payload: step });
    }
};

export const nextWizardStep = () => {
    return async (dispatch) => {
        dispatch({ type: 'NEXT_WIZARD_STEP' });
    }
};

export const prevWizardStep = () => {
    return async (dispatch) => {
        dispatch({ type: 'PREV_WIZARD_STEP' });
    }
};

export const resetWizardStep = () => {
    return async (dispatch) => {
        dispatch({ type: 'RESET_WIZARD_STEP' });
    }
};

export const resetَAllWizard = () => {
    return async (dispatch) => {
        dispatch({ type: 'RESET_ALL_WIZARD' });
    }
};



