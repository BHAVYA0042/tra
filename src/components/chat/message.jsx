function Message(props){
  return(
    <div className="message">
      <span><p className="sender">{props.from}</p><p className="message_time">{props.time}</p></span>
      <p>{props.body}</p>
    </div>
  )
}

export default Message;