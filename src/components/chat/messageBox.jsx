import SendIcon from '@mui/icons-material/Send';
import {useSelector,useDispatch} from 'react-redux';
import { useState } from 'react';
import Message from './message';
import CloseIcon from '@mui/icons-material/Close';
import { creds_action } from '../../store/main';

function MessageBox(props){
  const [messageContent,setMessageContent]=useState();
  const showMessages=useSelector((state)=>state.credentials.showMessageBox);
  const messages=useSelector((state)=>state.credentials.messages);
  const dispatch=useDispatch();
  function handleSendMessage(event){
    props.handleMessage(messageContent);
    setMessageContent("")
    event.preventDefault();
  }
  function closeModal(){
    dispatch(creds_action.toggleMessageBox())
  }
  
  return(
    <div>
      {showMessages && 
        <div className='modal'>
          <div className='messageBox'>
          <div className="info_box">
            <div className="first_line">
              <h3>In-Call Messages</h3>
              <CloseIcon onClick={closeModal} style={{cursor:"pointer"}}/>
            </div>
            <div className="second_line">
              <p>Messages can be seen only by people in the call and are deleted when the call ends</p>
            </div>
          </div>

            <div className="message_section">
              {messages.length!==0 && messages.map((item)=>{
                return(
                  <Message
                    key={item.id} 
                    from={item.sender}
                    body={item.messageBody}
                    time={item.time}
                  />
                )
              })}
            </div>
            
            <div className='sendForm'>
              <input type="text" name="message" value={messageContent} placeholder='Send a message to everyone' onChange={(event)=>{setMessageContent(event.target.value)}} />
              <SendIcon className='sendMessage' onClick={handleSendMessage}/>
            </div>

          </div>
        </div>
      }
      
    </div>
  )
}
export default MessageBox