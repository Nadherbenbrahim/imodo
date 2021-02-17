import axios from 'axios'
import { host,trainAgentHost } from '../../config';



export const answerComment = (Page,project,comment,answer,btns) => {
    return (dispatch) => {
        // console.log("Get from here", project);
    
        let objectToSend = {
            logs: comment,
            answer: answer,
            project: project, 
            buttons: btns,
        };

        console.log("im sending answerComment to nour", objectToSend);

        return axios.post(host + `/api/v1/secure/logEvent/answer/comment/${Page.platform}`,objectToSend,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        // .then(res => {
        //     console.log('answerComment post APi Response =>', res.data.data);
        // })
        .catch((err) => console.log("answerComment post Api error  =>", err))
    }
};


export const resetLogs = () => {
    return (dispatch) => {
        dispatch({
            type: 'RESET_LOGS_BY_PAGE',
        });
    }
};

export const getLogs = (idPostOrPage,Page) => {
    return (dispatch) => {
        // console.log("Get from here", project);


        return axios.get(host + `/api/v1/secure/logEvent/post/${idPostOrPage}/all`,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('getLogs post APi Response =>', res.data.data);

            let commentsMatched = [];
            let commentsNotMatched = []; 
            let allMatchedIntents = [];
            let allNotMatchedIntents = [];

            if(res.data.data[0].events) {
                res.data.data[0].events.map(comment => {
                    
                    if(comment.success) {
                        comment.intent.map((intent) => allMatchedIntents.push(intent.intent))
                        commentsMatched.push(comment);
                    } else {
                        comment.intent.map((intent) => allNotMatchedIntents.push(intent.intent));
                        commentsNotMatched.push(comment);
                    }
                });

                console.log("Matched =>", commentsMatched)
                console.log("Not Matched =>", commentsNotMatched)
            }

            dispatch({
                type: 'GET_LOGS_BY_PAGE',
                payload: res.data.data,
                payload1: commentsMatched.reverse(),
                payload2: commentsNotMatched.reverse(),
                payload3: [...new Set(allMatchedIntents)],
                payload4: [...new Set(allNotMatchedIntents)],
            });
            
        })
        .catch((err) => console.log("getLogs post Api error  =>", err))
    }
};

export const deleteProjectByPage = (projet) => {
    return (dispatch) => {

        let objectToSend = {
            project: projet,
        };

        return axios.put(host + `/api/v1/secure/project/remove/project`,objectToSend,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('deleteProjectByPage post APi Response =>', res.data.data);

            dispatch({
                type: 'GET_PROJECT_BY_PAGE',
                payload: res.data.data,
            });
        })
        .catch((err) => console.log("deleteProjectByPage post Api error  =>", err) )
    }
};

export const goToWizardConfig = (projet,Page,history) => {
    return (dispatch) => {
        // Detect intent Type 
        let intentDetection = projet.post.idPost === projet.post.page.idPage;

        // Because in the wizard variable Name is id not idPost :D sorry for that
        projet.post.id = projet.post.idPost;

        dispatch({
            type: 'FROM_MY_AGENTS_TO_STEP_3_WIZARD',
            payload: 2,
            payload1: projet._id,
            payload2: intentDetection ? "generic" : "default",
            payload3: Page,
            payload4: intentDetection ? null : projet.post,
        });

        history.push({
            pathname: '/home/auto-wizard',
            state: { imFrom : 'MyAgents' }
        });

        dispatch({
            type: 'SELECT_WIZARD_PAGE', 
            payload: Page,
        });
    }
};


export const setAgentsSelectedProject = (project,history) => {
    return (dispatch) => {
 
        dispatch({
            type: 'SET_AGENTS_PROJECT',
            payload: project,
        });
       
        history.push('/home/my-agents-messages');
    }
};

export const getProjectByPage = (Page) => {
    return (dispatch) => {
 
        return axios.get(host + `/api/v1/secure/pages/get/project/${Page.id}`,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log('getProjectByPage post APi Response =>', res.data.data);


            res.data.data.sort( (a,b) => {
                return new Date(b.createDate) - new Date(a.createDate);
            });

            dispatch({
                type: 'GET_PROJECT_BY_PAGE',
                payload: res.data.data,
            });
        })
        .catch((err) => console.log("getProjectByPage post Api error  =>", err) )
    }
};