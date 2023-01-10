import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import Message from '../../components/message';
import { sendMessage, socket } from '../../service/socket';

import './index.css'

interface IMessage {
  room: string
  username: string
  created_at: Date
  text: string
}

function RoomPage() {
  const navigate = useNavigate();
  const query = useQuery();
  
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState('')
  
  useEffect(() => {    
    socket.on('message', message => {  
      message.created_at = new Date(message.created_at);    
      setMessages([...messages, message]);  
      setText('')    
    })
  }, [messages])

  function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  }

  function logout() {
    navigate('/login')
  }

  function handleKeyPress(event: any){
    if(event.key === 'Enter'){
      sendMessage({
        message: text,
        username: query.get('username'),
        room: query.get('room')
      })
    }
  }

  return (
    <div className='container'>
      <header className="header">
          <a className="btn" onClick={logout}>Logout</a>
          <p id='welcome'>Olá <strong>{query.get('username')}</strong>. Seja bem vindo à sala <strong>{query.get('room')}</strong>.</p>
      </header>
      <div className="chat">
        {messages.map((message, index) => message.username === query.get('username') ? 
          <Message key={index} className='self-message' username={message.username} text={message.text} created_at={message.created_at} typeOfMessage='withoutUsername'/> : 
          <Message key={index} className='other-message' username={message.username} text={message.text} created_at={message.created_at} typeOfMessage='withUsername'/>
        )}
      </div>
      <input className="input" type="text" name="Nome" placeholder="Digite sua mensagem" onKeyPress={handleKeyPress} onChange={e => setText(e.target.value)} value={text}/>
    </div>
  )
}

export default RoomPage
