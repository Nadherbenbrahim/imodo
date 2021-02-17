import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css';
import './App.css';
import 'sweetalert2/src/sweetalert2.scss';
import 'react-simple-keyboard/build/css/index.css';
import "slick-carousel/slick/slick.scss"; 
import "slick-carousel/slick/slick-theme.scss";
import 'react-calendar/dist/Calendar.css';

// import 'owl.carousel/dist/assets/owl.carousel.css';



import App from './App';

// Redux
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
    
    
// import persistor from './redux/store';
// import { PersistGate } from 'redux-persist/integration/react';
// ReactDOM.render(
//     <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//             <App />
//         </PersistGate>
//     </Provider>, 
//     document.getElementById('root')
// );