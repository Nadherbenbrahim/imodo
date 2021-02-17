import io from 'socket.io-client';
import { host } from '../config'
import { chatAction, setsubmited } from '../actions';
import { store } from '..';


let socket = io.connect(host, { secure: true });

export function sendMessage(obj) {
    socket.emit("chat.message", obj)
}

// export function getMessage(chat, setsubmited) {

//     socket.on("chat.message", (message) => {
//         console.log('test message', message)
//         // chat({ ...message, id: Date.now() })
//         chat(message)
//         setsubmited(false)
//     })
// }

socket.on("chat.message", (message) => {
    console.log('test message', message)
    // chat({ ...message, id: Date.now() })
    store.dispatch(chatAction(message))
    store.dispatch(setsubmited(false))
})
export default socket