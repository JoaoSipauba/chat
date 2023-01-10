import { io } from "socket.io-client";

export var socket = io('http://localhost:3333');

interface ISelectRoom{
    username: string
    room: string
}
interface IMessage{
    username: string | null
    room: string | null
    message: string
}

export function connectSocket(){
    socket.open()
}

export function disconnectSocket(){
    socket.disconnect()
}

export function selectRoom(user: ISelectRoom) {
    socket.emit('select_room', {
        username: user.username, 
        room: user.room
    })
}

export function sendMessage(message: IMessage) {
    socket.emit('message', {
        username: message.username, 
        room: message.room,
        message: message.message
    })
}