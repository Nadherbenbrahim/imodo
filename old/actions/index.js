import axios from 'axios'
import { host, trainagenthost } from '../config'
import { showLoading, hideLoading } from 'react-redux-loading-bar'


export const loginAction = (token, owenProps) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.post(host + '/api/v1/auth/login/facebook', {
            token
        }).then(resdata => {
 //console.log("Hell Yeah access token :D", token);
            //console.log('action ', resdata)
            localStorage.setItem('authtoken', resdata.data.data.user.idFacebook)
            dispatch({
                type: 'LOGIN',
                user: resdata
            })
            owenProps.history.push('dachboard/')
            dispatch(hideLoading())
        }).catch(() => dispatch(hideLoading()))
    }
}

export const getAllPagesAction = () => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.get(host + '/api/v1/secure/pages/get/all/', {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {
                // console.log('pages ', res)
                dispatch({
                    type: 'GETALLPAGES',
                    pages: res
                })
                dispatch(hideLoading())
            }).catch(() => dispatch(hideLoading()))
    }
}

export const getAllInstaPagesAction = () => {
    return async (dispatch) => {
        dispatch(showLoading())
        const token = await localStorage.getItem('authtoken');

        console.log("Im calling the api instagram ....");

        return axios.get(host + '/api/v1/secure/pages-insta/get/all/', {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        // .then(res => {
        //     console.log('Instagram pages ya haider =>', res)
        //     // dispatch({
        //     //     type: 'GETALLPAGES',
        //     //     pages: res
        //     // })
        //     // dispatch(hideLoading())

        // }).catch((err) => {
        //     console.log("Api instagram error", err)
        //     // dispatch(hideLoading())
        // })
    }
}

export const fbdata = (fbdata) => {
    return {
        type: 'FBDATA',
        fbdata
    }
}

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
}


export const connectPage = (pageId) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.post(host + '/api/v1/secure/pages/connect/', pageId, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {
                //console.log('pages connected', res)
                // dispatch({
                //     type: 'UPDATEPAGE',
                //     page: res
                // })
                dispatch(hideLoading())
            }).catch(() => dispatch(hideLoading()))
    }
}

export const deconnectPage = (pageId) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.post(host + '/api/v1/secure/pages/disconnect/', pageId, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {
                //console.log('pages disconnected', res)
                // dispatch({
                //     type: 'UPDATEPAGE',
                //     page: res
                // })
                dispatch(hideLoading())
            }).catch(() => dispatch(hideLoading()))
    }
}

export const getAllEntity = (fbid) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.get(host + '/api/v1/secure/project/get/entitiesproject/' + fbid, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {
                //console.log('all entity', res)
                dispatch({
                    type: 'GETALLENTITYS',
                    entitys: res
                })
                dispatch(hideLoading())
            }).catch(() => dispatch(hideLoading()))
    }
}

export const getAllConnectedPages = () => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.get(host + '/api/v1/secure/pages/get/all/connect', {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {
               // console.log('all connected pages', res)
                dispatch({
                    type: 'GETALLCONNECTEDPAGES',
                    pages: res
                })
                dispatch(hideLoading())
            }).catch(() => dispatch(hideLoading()))
    }
}

export const getConnectedPagesProject = () => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.get(host + `/api/v1/secure/project/get/user`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {
                //console.log('all projects for this user', res)
                dispatch({
                    type: 'GETALLCONNECTEDPAGESPROJECTS',
                    projects: res
                })

                dispatch(hideLoading())
            }).catch(() => dispatch(hideLoading()))
    }
}

export const getConnectedPagesPosts = (idPage) => {
    return (dispatch) => {
        dispatch(showLoading())
        if(idPage !== null && idPage !== undefined) {
            return axios.get(host + `/api/v1/secure/post/get/${idPage}/all`, {
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('authtoken')
                }
            })
            .then(res => {
                // console.log('all posts for this page', res)
                dispatch({
                    type: 'GETALLCONNECTEDPAGESPOSTS',
                    posts: res
                })
                dispatch(hideLoading())
            }).catch(() => dispatch(hideLoading()))
        }
    }
}

export const selectedPage = (page) => {
    return {
        type: "MONIRATEDPAGE",
        page
    }
}

export const addProject = (post) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.post(host + `/api/v1/secure/project/add`, post, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {
                dispatch({
                    type: 'ADDPROJECTS',
                    posts: res
                })
                //console.log('projectadded', res)
                dispatch(hideLoading())
            }).catch(err => {
                dispatch(hideLoading())
            })
    }
}

export const removeProject = (post) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.put(host + `/api/v1/secure/project/remove/project`, post, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {

                dispatch(hideLoading())
            }).catch(err => {
                dispatch(hideLoading())
            })
    }
}


export const getallIntents = (check) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.get(host + (check ? `/api/v1/intent/generiqueintent/all` : `/api/v1/intent/defaulintent/all`), {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {
                //console.log('get defaults intents', res)
                dispatch({
                    type: 'GETALLINTENTS',
                    intents: res
                })
                dispatch(hideLoading())
            }).catch(() => dispatch(hideLoading()))
    }
}

export const addproduct = (data, idproject) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.put(host + `/api/v1/secure/project/update/${idproject}`, data, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {
                //console.log('reponse project update', res)
                dispatch({
                    type: 'ADDPRODUCTINPROJECT',
                    product: res.data.data
                })
                dispatch(hideLoading())
            }).catch(() => dispatch(hideLoading()))
    }
}

export const checkProduct = (data, idproject) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.put(host + `/api/v1/secure/project/firstupdate/${idproject}`, data, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {
               // console.log('reponse project update', res)
                // return res;
               // console.log('changeeeeeeed')
                if (res.data.data === "not exist") {
                    dispatch(showCategoryPoppup())
                } else {
                    dispatch(hideCategoryPoppup())
                }
                dispatch(hideLoading())
            }).catch(() => dispatch(hideLoading()))
    }
}


export const removeProduct = (data, idproject) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.put(host + `/api/v1/secure/project/intents/remove/${idproject}`, data, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {

                dispatch({
                    type: 'REMOVEPRODUCTINPROJECT',
                    product: res.data.data
                })
                //console.log(res)
                dispatch(hideLoading())
            }).catch(() => dispatch(hideLoading()))
    }
}

export const updateproduct = (data, idproject) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.put(host + `/api/v1/secure/project/entitiesupdate/${idproject}`, data, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {
                //console.log('reponse product update', res)
                dispatch({
                    type: 'EDITPRODUCTINPROJECT',
                    product: res.data.data
                })
                dispatch(hideLoading())
            }).catch(() => dispatch(hideLoading()))
    }
}

export const updateReponseGeneric = (data, idproject) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.put(host + `/api/v1/secure/project/generiqueupdate/${idproject}`, data, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {
                //console.log('updateReponseGeneric ', res)
                // dispatch({
                //     type: 'EDITPRODUCTINPROJECT',
                //     product: res.data.data
                // })
                dispatch(hideLoading())
            }).catch(() => dispatch(hideLoading()))
    }
}

export const addReponseGeneric = (data, idproject) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.put(host + `/api/v1/secure/project/generiqueadd/${idproject}`, data, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {
               // console.log('addReponseGeneric ', res)
                // dispatch({
                //     type: 'EDITPRODUCTINPROJECT',
                //     product: res.data.data
                // })
                dispatch(hideLoading())
            }).catch(() => dispatch(hideLoading()))
    }
}

export const nlptest = (data, idproject) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.post(host + `/api/v1/secure/project/train`, data, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {

                // dispatch({
                //     type: 'REMOVEPRODUCTINPROJECT',
                //     product: res.data.data
                // })
               // console.log(res)
                dispatch(hideLoading())
            }).catch(() => dispatch(hideLoading()))
    }
}


export const trainagent = (data) => {
    return (dispatch) => {
        dispatch(showLoading())
       // console.log("data train", data.idPage === data.idPost, data.idPage, data.idPost)
        if (data.idPage === data.idPost) {
            return axios.post(trainagenthost + `/trainagentpag`, data, {
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('authtoken')
                }
            })
                .then(res => {
                    return axios.post(trainagenthost + `/publishagentpag`, data, {
                        headers: {
                            'authorization': 'Bearer ' + localStorage.getItem('authtoken')
                        }
                    }).then(() => {
                        dispatch({
                            type: 'AGENTTRAINED',
                            show: true
                        })
                       // console.log('ariving ', res)
                        dispatch(hideLoading())
                    })
                })
        } else {
            return axios.post(trainagenthost + `/trainagentpos`, data, {
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('authtoken')
                }
            })
                .then(res => {
                    return axios.post(trainagenthost + `/publishagentpos`, data, {
                        headers: {
                            'authorization': 'Bearer ' + localStorage.getItem('authtoken')
                        }
                    }).then(() => {
                        dispatch({
                            type: 'AGENTTRAINED',
                            show: true
                        })
                       // console.log(res)
                        dispatch(hideLoading())
                    })
                })
        }

    }
}


export const goLive = (data) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.put(host + `/api/v1/secure/project/agent/live`, data, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {

                // dispatch({
                //     type: 'EDITPRODUCTINPROJECT',
                //     product: res.data.data
                // })
               // console.log(res)
                dispatch(hideLoading())
            }).catch(() => dispatch(hideLoading()))
    }
}

export const addentity = (data) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.post(host + `/api/v1/secure/profile/entities/add`, data, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {

                dispatch({
                    type: 'ADDENTITY',
                    entitys: res.data.data.entity
                })
                //console.log(res)
                dispatch(hideLoading())
            })
            .catch(err => dispatch(hideLoading()))
    }
}


export const addSynonym = (uId, data) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.put(host + `/api/v1/secure/project/synonymssupdate/${uId}`, data, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {

                // dispatch({
                //     type: 'ADDENTITY',
                //     entitys: res.data.data.entity
                // })
               // console.log(res)
                dispatch(hideLoading())
            })
            .catch(err => dispatch(hideLoading()))
    }
}

export const addValue = (uId, data) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.put(host + `/api/v1/secure/profile/valuesadd/${uId}`, data, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {

                // dispatch({
                //     type: 'ADDENTITY',
                //     entitys: res.data.data.entity
                // })
              //  console.log('addvalue ', res)
                dispatch(hideLoading())
            })
            .catch(err => dispatch(hideLoading()))
    }
}

export const removeSynonym = (uId, data) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.put(host + `/api/v1/secure/profile/removesyn/${uId}`, data, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {

                // dispatch({
                //     type: 'ADDENTITY',
                //     entitys: res.data.data.entity
                // })
                console.log('remove synonym', res)
                dispatch(hideLoading())
            })
            .catch(err => dispatch(hideLoading()))
    }
}

export const removeEntity = (uId, data) => {
    console.log('removing')
    return (dispatch) => {
        dispatch(showLoading())
        return axios.put(host + `/api/v1/secure/profile/entiteremove/${uId}`, data, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {

                // dispatch({
                //     type: 'ADDENTITY',
                //     entitys: res.data.data.entity
                // })
                console.log('remove entity', res)
                dispatch(hideLoading())
            })
            .catch(err => { console.log('remove entity'); dispatch(hideLoading()) })
    }
}

export const getComments = (id) => {
    console.log('removing')
    return (dispatch) => {
        dispatch(showLoading())
        return axios.get(host + `/api/v1/secure/logEvent/post/${id}/all`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {

                dispatch({
                    type: 'GETCOMMENTS',
                    payload: res.data.data
                })
                dispatch(hideLoading())
            })
            .catch(err => { console.log('err request'); dispatch(hideLoading()) })
    }
}

export const answerComment = (data) => {
    console.log('removing')
    return (dispatch) => {
        dispatch(showLoading())
        return axios.post(host + `/api/v1/secure/logEvent/answer/comment`, data, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {

                console.log('answer ', res)
                dispatch(hideLoading())
            })
            .catch(err => { console.log('err request'); dispatch(hideLoading()) })
    }
}

export const updateContent = (data) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.put(host + `/api/v1/secure/profile/contentupdate`, data, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {
                dispatch(hideLoading())
            })
            .catch(err => { console.log('err request'); dispatch(hideLoading()) })
    }
}

export const updateEntityName = (data) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.put(host + `/api/v1/secure/profile/nameentiteupdate`, data, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {
                dispatch(hideLoading())
            })
            .catch(err => { console.log('err request'); dispatch(hideLoading()) })
    }
}

export const removeContent = (id, data) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.put(host + `/api/v1/secure/profile/contentremove/${id}`, data, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {
                dispatch(hideLoading())
            })
            .catch(err => { console.log('err request'); dispatch(hideLoading()) })
    }
}

export const removeEntityProject = (id, data) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.put(host + `/api/v1/secure/project/${id}/remove/entity`, data, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(res => {
                dispatch(hideLoading())
            })
            .catch(err => { console.log(err); dispatch(hideLoading()) })
    }
}

export const pageIntents = (id) => {
    return (dispatch) => {
        dispatch(showLoading())
        return axios.get(host + `/api/v1/secure/project/pageintent/${id}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
            .then(data => {
                dispatch({
                    type: "PAGEINTENTS",
                    data
                })
                dispatch(hideLoading())
            })
            .catch(err => { console.log(err); dispatch(hideLoading()) })
    }
}

export const chatAction = (message) => {
    console.log('message ', message)
    return { type: "ADDMESSAGE", message }
}

export const removechatAction = () => {
    return { type: "REMOVEMESSAGE", }
}

export const unTrained = () => {
    return { type: "AGENTNOTTRAINED", show: false }
}

export const togglePopup = (toggle) => {
    return { type: "TOGGLEPOPPUP", toggle }
}

export const toggleIntent = (toggle) => {
    return { type: "TOGGLEINTENT", toggle }
}

export const emptyToggleIntent = () => {
    return { type: "EMPTYTOGGLEINTENT", }
}

export const showCategoryPoppup = () => {
    return { type: "SHOW", }
}

export const hideCategoryPoppup = () => {
    return { type: "HIDE", }
}

export const setsubmited = (submit) => {
    return { type: "SUBMITD", submit }
}

