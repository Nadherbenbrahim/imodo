import axios from 'axios'
import { host } from '../../config';
import Swal from 'sweetalert2/dist/sweetalert2.js'



export const reDisptachPage = (Page, history) => {
    return async (dispatch) => {

        if(history) {
            history.push('manage-products');
            dispatch({
                type: 'SELECT_SOCIAL_MEDIA_PAGE',
                payload: Page,
            });
        } else {
            dispatch({
                type: 'SELECT_SOCIAL_MEDIA_PAGE',
                payload: Page,
            });
        };

    };
};

export const removeSynonym = (synonymValue, product, indexSyn, Page, categorySelected) => {
    return (dispatch) => {
       
        let objectToSend = {
            index : indexSyn,
            id : product._id,
            synonym: synonymValue,
        }
        console.log("Let's removeSynonym to the product => ", objectToSend);

        let detectHost = Page.platform === "facebook" ? "/api/v1/secure/pages/removesyn/" : "/api/v1/secure/pagesInsta/removesyn/";
        let fullUrl = `${host}${detectHost}${Page.id}`;

        return axios.put(fullUrl,objectToSend,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log("removeSynonym response api =>", res.data.data);

            let categories = res.data.data;

            if(categories.length > 0) {
                categories.map((cat,index) =>
                    cat.default === true && categories.splice(index,1)
                );
            };

            dispatch({
                type: 'GET_CATEGORIES',
                payload: categories
            });

            // To update the existing products
            let findCategorySelected = categories.find((cat) => {
                return cat._id === categorySelected._id
            })

            if(findCategorySelected) {
                dispatch({
                    type: 'SELECT_CATEGORIE',
                    payload: findCategorySelected
                });
            };
        })
        .catch((err) => {
            console.log("removeSynonym error api =>", err)
        });
    };
};

export const addSynonym = (synonymValue, categorySelected, product, Page) => {
    return (dispatch) => {
        
        let objectToSend = {
            idEntity : categorySelected._id,
            idChildren : product._id,
            synonyms: synonymValue,
        }
        console.log("Let's addSynonym to the product => ", objectToSend);

        let detectHost = Page.platform === "facebook" ? "/api/v1/secure/pages/synonymssupdate/" : "/api/v1/secure/pagesInsta/synonymssupdate/";
        let fullUrl = `${host}${detectHost}${Page.id}`;

        return axios.put(fullUrl,objectToSend,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log("addSynonym response api =>", res.data.data);

            if(typeof(res.data.data) === "string") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: res.data.data,
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                let categories = res.data.data;
    
                if(categories.length > 0) {
                    categories.map((cat,index) =>
                        cat.default === true && categories.splice(index,1)
                    );
                };
    
                dispatch({
                    type: 'GET_CATEGORIES',
                    payload: categories
                });
    
                // To update the existing products
                let findCategorySelected = categories.find((cat) => {
                    return cat._id === categorySelected._id
                })
    
                if(findCategorySelected) {
                    dispatch({
                        type: 'SELECT_CATEGORIE',
                        payload: findCategorySelected
                    });
                };
            }
        })
        .catch((err) => {
            console.log("addSynonym error api =>", err)
        });
    };
};

export const removeProduct = (categorySelected, product, Page) => {
    return (dispatch) => {
        
        let objectToSend = {
            entity : categorySelected._id,
            id: product._id,
            productName: product.content
        }
        console.log("Let's removeProduct => ", objectToSend);

        let detectHost = Page.platform === "facebook" ? "/api/v1/secure/pages/contentremove/" : "/api/v1/secure/pagesInsta/contentremove/";
        let fullUrl = `${host}${detectHost}${Page.id}`;

        return axios.put(fullUrl,objectToSend,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log("removeProduct response api =>", res.data.data);

            let categories = res.data.data;

            if(categories.length > 0) {
                categories.map((cat,index) =>
                    cat.default === true && categories.splice(index,1)
                );
            };

            dispatch({
                type: 'GET_CATEGORIES',
                payload: categories
            });

            // To update the existing products
            let findCategorySelected = categories.find((cat) => {
                return cat._id === categorySelected._id
            })

            if(findCategorySelected) {
                dispatch({
                    type: 'SELECT_CATEGORIE',
                    payload: findCategorySelected
                });
            };
        })
        .catch((err) => {
            console.log("removeProduct error api =>", err)
        });
    };
};

export const updateProductName = (newProductName, categorySelected, product, Page) => {
    return (dispatch) => {
        
        let objectToSend = {
            name : newProductName,
            productName: categorySelected.name,
            id : categorySelected._id,
            idChildren : product._id,
        }
        
        let detectHost = Page.platform === "facebook" ? "/api/v1/secure/pages/contentupdate/" : "/api/v1/secure/pagesInsta/contentupdate/";
        let fullUrl = `${host}${detectHost}${Page.id}`;
        
        // console.log("Let's update the product => ", objectToSend, "with Page =>", Page, "with the full URL", fullUrl);

        return axios.put(fullUrl,objectToSend,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log("updateProductName response api =>", res.data.data);

            if(typeof(res.data.data) === "string") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: res.data.data,
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                let categories = res.data.data;
    
                if(categories.length > 0) {
                    categories.map((cat,index) =>
                        cat.default === true && categories.splice(index,1)
                    );
                };
    
                dispatch({
                    type: 'GET_CATEGORIES',
                    payload: categories
                });
    
                // To update the existing products
                let findCategorySelected = categories.find((cat) => {
                    return cat._id === categorySelected._id
                })
    
                if(findCategorySelected) {
                    dispatch({
                        type: 'SELECT_CATEGORIE',
                        payload: findCategorySelected
                    });
                };                
            } 

        })
        .catch((err) => {
            console.log("updateProductName error api =>", err)
        });
    };
};

export const updateCategoryName = (categorySelected,categoryName,Page) => {
    return (dispatch) => {
        
        let objectToSend = {
            id : categorySelected._id,
            name: categoryName,
        };
        // console.log("Let's update the category", objectToSend, 'id Page', Page.id);
        
        let detectHost = Page.platform === "facebook" ? "/api/v1/secure/pages/nameentiteupdate/" : "/api/v1/secure/pagesInsta/nameentiteupdate/";
        let fullUrl = `${host}${detectHost}${Page.id}`;
        
        return axios.put(fullUrl,objectToSend,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log("updateCategoryName response api =>", res.data.data);

            if(typeof(res.data.data) === "string") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: res.data.data,
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                let categories = res.data.data;
    
                if(categories.length > 0) {
                    categories.map((cat,index) =>
                        cat.default === true && categories.splice(index,1)
                    );
                };
    
                dispatch({
                    type: 'GET_CATEGORIES',
                    payload: categories
                });
            }

        })
        .catch((err) => {
            console.log("updateCategoryName error api =>", err)
        });
    };
};

export const addCategory = (Page, categoryName, allProducts,history) => {
    return (dispatch) => {

        let objectToSend = {
            idPage: Page.id,
            entity: {
                name: categoryName,
                values: allProducts,
            }
        };
        // console.log("add New category", objectToSend);

        let detectHost = Page.platform === "facebook" ? "/api/v1/secure/pages/entities/add/" : "/api/v1/secure/pagesInsta/entities/add/";
        let fullUrl = `${host}${detectHost}${Page.id}`;

        return axios.post(fullUrl,objectToSend,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log("addCategory response api =>", res.data.data);

            if(typeof(res.data.data) === "string") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: res.data.data,
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                let categories = res.data.data;
    
                if(categories.length > 0) {
                    categories.map((cat,index) =>
                        cat.default === true && categories.splice(index,1)
                    );
                };
    
                dispatch({
                    type: 'GET_CATEGORIES',
                    payload: categories
                });
    
                history.push('manage-products');
    
                dispatch({
                    type: 'SELECT_SOCIAL_MEDIA_PAGE',
                    payload: Page,
                });
            }

        })
        .catch((err) => {
            console.log("addCategory error api =>", err)
        });
    };
};

export const addProductInCategory = (category,Page,newProductName) => {
    return (dispatch) => {
     
        let objectToSend = {
            id: category._id,
            entity: {
                // Nadher changes this to empty array
                // synonyms: [newProductName],
                synonyms: [],
                content: newProductName,
            },
        };
        // console.log("add New Product in category", objectToSend);

        let detectHost = Page.platform === "facebook" ? "/api/v1/secure/pages/valuesadd/" : "/api/v1/secure/pagesInsta/valuesadd/";
        let fullUrl = `${host}${detectHost}${Page.id}`;

        return axios.put(fullUrl,objectToSend,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log("addProductInCategory response api =>", res.data.data);

            if(typeof(res.data.data) === "string") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: res.data.data,
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                let categories = res.data.data;
    
                if(categories.length > 0) {
                    categories.map((cat,index) =>
                        cat.default === true && categories.splice(index,1)
                    );
                };
    
                dispatch({
                    type: 'GET_CATEGORIES',
                    payload: categories
                });
    
                // To update the existing products
                let findCategorySelected = categories.find((cat) => {
                    return cat._id === category._id
                })
    
                if(findCategorySelected) {
                    dispatch({
                        type: 'SELECT_CATEGORIE',
                        payload: findCategorySelected
                    });
                };
            }
        })
        .catch((err) => {
            console.log("addProductInCategory error api =>", err)
        });
    };
};

export const deleteCategory = (category,Page) => {
    return (dispatch) => {
        // console.log("Rak bech tfasakh l category hedhu =>", category);
        // console.log("Rak bech tfasakh l category men page hedhi =>", Page);
        
        let objectToSend = {
            id: category._id
        };

        let detectHost = Page.platform === "facebook" ? "/api/v1/secure/pages/entiteremove/" : "/api/v1/secure/pagesInsta/entiteremove/";
        let fullUrl = `${host}${detectHost}${Page.id}`;

        return axios.put(fullUrl,objectToSend,{
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            console.log("deleteCategory response api =>", res.data.data);

            
            let categories = res.data.data;

            if(typeof(categories) === "string") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: res.data.data,
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                if(categories.length > 0) {
                    categories.map((cat,index) =>
                        cat.default === true && categories.splice(index,1)
                    );
                };

                dispatch({
                    type: 'GET_CATEGORIES',
                    payload: categories
                });
            };
        })
        .catch((err) => {
            console.log("deleteCategory error api =>", err)
        });
    };
};

export const selectProduct = (product) => {
    return (dispatch) => {
        console.log("Redux selected Product =>", product);
        
        dispatch({
            type: 'SELECT_PRODUCT',
            payload: product,
        });
    };
};

export const selectCategory = (category,history) => {
    return (dispatch) => {
        // console.log("Redux selected Category! =>", category);
        
        dispatch({
            type: 'SELECT_CATEGORIE',
            payload: category
        });
        history.push('update-products');
    };
};

export const getCategories = (page) => {
    return (dispatch) => {
        
        return axios.get(host + `/api/v1/secure/project/get/entitiesproject/${page.platform}/${page.id}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('authtoken')
            }
        })
        .then(res => {
            // console.log("all Categories of this page => =>", res.data.data);

            let categories = res.data.data;

            if(categories.length > 0) {
                categories.map((cat,index) =>
                    cat.default === true && categories.splice(index,1)
                );
            };
            dispatch({
                type: 'GET_CATEGORIES',
                payload: categories
            });
        })
        .catch((err) => console.log("err getCategories", err))
    }
};