import { useNavigate } from 'react-router-dom'
import './index.css'

function LoginPage() {
  const navigate = useNavigate();

  function login(e: any) {
    e.preventDefault();  
    navigate('/room')
  }

  return (
    <form onSubmit={login} id="form">
        <section className="form-field">
            <label>Digite a sala</label>
            <input className="input" type="text" placeholder="Selecione a sala"/>
        </section>
        <section className="form-field">
            <label>Digite seu usuário</label>
            <input className="input" type="text" placeholder="username"/>
        </section>
        <button type="submit" className="bnt">Entrar</button>
    </form>
  )
}

export default LoginPage
