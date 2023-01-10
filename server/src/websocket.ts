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
    type: 'text' | 'connection'
}

const users: RoomUser[] = []
const messages: Message[] = []

io.on('connection', socket => {
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        const userInRoom = users.find(user => user.socket_id === socket.id);
        if (userInRoom) {
            const message: Message = {
                room: userInRoom.room,
                username: userInRoom.username,
                created_at: new Date(),
                text: `saiu da sala`,
                type: 'connection'
            }
            messages.push(message);
            io.to(message.room).emit("message", message)
        }
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

        const message: Message = {
            room: data.room,
            username: data.username,
            created_at: new Date(),
            text: `entrou na sala`,
            type: 'connection'
        }
        messages.push(message);
        io.to(message.room).emit("message", message)
    })

    socket.on('message', data => {
        console.log(`⚡user: ${data.username} sent a message!`);
        const message: Message = {
            room: data.room,
            username: data.username,
            created_at: new Date(),
            text: data.message,
            type: 'text'
        }

        messages.push(message);

        io.to(data.room).emit("message", message)
    })
})