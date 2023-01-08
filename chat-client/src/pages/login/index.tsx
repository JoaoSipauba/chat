import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { selectRoom } from '../../service/socket';
import './index.css'

function LoginPage() {
  const navigate = useNavigate();

  const [room, setRoom] = useState('')
  const [username, setUsername] = useState('')

  function login(e: any) {
    e.preventDefault();  
    selectRoom({username: username, room: room})
    navigate(`/room?username=${username}&room=${room}`)
  }

  return (
    <form onSubmit={login} id="form">
        <section className="form-field">
            <label>Digite a sala</label>
            <input onChange={e => setRoom(e.target.value)} className="input" type="text" placeholder="Selecione a sala"/>
        </section>
        <section className="form-field">
            <label>Digite seu usuário</label>
            <input onChange={e => setUsername(e.target.value)} className="input" type="text" placeholder="username"/>
        </section>
        <button type="submit" className="bnt">Entrar</button>
    </form>
  )
}

export default LoginPage
