import './index.css'

interface IProps extends React.HTMLProps<HTMLDivElement>{
    username: string;
    text: string;
    created_at: Date;
    typeOfMessage: 'withUsername' | 'withoutUsername';
}

function Message(props: IProps) {
  return (
    <div className={`message ${props.typeOfMessage === 'withUsername' ? 'others' : 'self'}`}>
      {props.typeOfMessage === 'withUsername' && <h1 className='username'>{props.username}</h1>}
        <div className='content'>
            <p className='text'>{props.text}</p>
            <p className='time'>{`${props.created_at.getHours()}:${props.created_at.getMinutes()}`}</p>
        </div>
    </div>
  )
}

export default Message
