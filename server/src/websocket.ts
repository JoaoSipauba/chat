import { io } from './http';

interface RoomUser{
    username: string;
    room: string,
    socket_id: string
}

interface Message{
    room: string
    text: string
    created_at: Date
    username: string
}

const users: RoomUser[] = []
const messages: Message[] = []

io.on('connection', socket => {
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
    socket.on('select_room', data => {
        socket.join(data.room)
        console.log(`⚡user: ${data.username} just connected!`);
        
        const userInRoom = users.find(user => user.username === data.username && user.room === data.room);

        if (userInRoom) {
            userInRoom.socket_id = socket.id;
        }else {
            users.push({
                room: data.room,
                username: data.username,
                socket_id: socket.id
            })
        }
    })

    socket.on('message', data => {
        console.log(`⚡user: ${data.username} sent a message!`);
        const message: Message = {
            room: data.room,
            username: data.username,
            created_at: new Date(),
            text: data.message
        }

        messages.push(message);

        io.to(data.room).emit("message", message)
    })
})