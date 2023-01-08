import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { io } from "socket.io-client";

import './index.css'

interface IMessage {
  room: string
  username: string
  created_at: Date
  text: string
}

const socket = io('http://localhost:3333');

function RoomPage() {
  const navigate = useNavigate();
  const query = useQuery();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {    
    socket.on('message', message => {      
      setMessages([...messages, message]);      
    })

  }, [])

  function useQuery() {
    const { search } = useLocation();
  
    return useMemo(() => new URLSearchParams(search), [search]);
  }

  function logout() {
    navigate('/login')
  }

  return (
    <>
    <header className="box-btn">
        <a className="btn" onClick={logout}>Logout</a>
        <div className="chat">
            <p id='welcome'>Olá <strong>{query.get('username')}</strong>. Seja bem vindo à sala <strong>{query.get('room')}</strong>.</p>
            <div id="text">
              {messages.map((message, index) => <p key={index}><strong>{message.username}</strong> {message.text} - 10/10 10:20</p>)}
            </div>
        </div>
    </header>
    <section className="box-search">
        <input className="search" type="text" name="Nome" placeholder="Digite sua mensagem" />
    </section>
    </>
  )
}

export default RoomPage
