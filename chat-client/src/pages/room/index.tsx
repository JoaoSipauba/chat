import './index.css'

function RoomPage() {

  return (
    <>
    <header className="box-btn">
        <a className="btn">Logout</a>
        <div className="text">
            <p>Olá username - Sala</p>
            <p><strong>username</strong> texto - 10/10 10:20</p>
        </div>
    </header>
    <section className="box-search">
        <input className="search" type="text" name="Nome" placeholder="Digite sua mensagem" />
    </section>
    </>
  )
}

export default RoomPage
