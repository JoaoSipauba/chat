import { io } from "socket.io-client";

const socket = io('http://localhost:3333');

interface ISelectRoom{
    username: string
    room: string
}

export function selectRoom(user: ISelectRoom) {
    socket.emit('select_room', {
        username: user.username, 
        room: user.room
    })
}
