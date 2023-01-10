import moment from 'moment'
import './index.css'

interface IProps extends React.HTMLProps<HTMLDivElement>{
    username: string;
    text: string;
    created_at: Date;
    typeOfMessage: 'withUsername' | 'withoutUsername';
}

function getTime(time: Date): string {
  return moment(time).format('hh:mm')
}

function Message(props: IProps) {
  return (
    <div className={`message ${props.typeOfMessage === 'withUsername' ? 'others' : 'self'}`}>
      {props.typeOfMessage === 'withUsername' && <h1 className='username'>{props.username}</h1>}
        <div className='content'>
            <p className='text'>{props.text}</p>
            <p className='time'>{getTime(props.created_at)}</p>
        </div>
    </div>
  )
}

export default Message
