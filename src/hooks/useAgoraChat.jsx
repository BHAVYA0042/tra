
import { useState } from 'react';
// import Message from './message';
// import SendIcon from '@mui/icons-material/Send';
import {useDispatch, useSelector} from "react-redux";
import { creds_action } from '../store/main';

export default function useAgoraChat(client){

  const [mainChannel,setMainChannel]=useState();
  const channelCreds=useSelector((state)=>state.credentials.channelCreds);
  const channelName=channelCreds.channelName

  const dispatch=useDispatch();
  const messages=useSelector((state)=>state.credentials.messages)

  async function handleLogin(uid,token){
    await client.login({uid,token})
    console.log(client);
    let channel=await client.createChannel(channelName);
    await channel.join();
    channel.on('ChannelMessage',function(message,memberID){
      console.log(message);
      console.log(memberID);
      dispatch(creds_action.setMessages({
        id:Math.floor(Math.random()*10000),
        messageBody:message.text,
        sender:memberID
      }))
      // setMessages((prev)=>{
      //   return[
      //     ...prev,
      //     {
      //       id:Math.floor(Math.random()*10000),
      //       messageBody:message.text,
      //       sender:memberID
      //     }
      //   ]
      // })
    })
    setMainChannel(channel)
  }

  async function handleSend(messageContent,time){
    console.log(mainChannel)
    await mainChannel.sendMessage({text:messageContent})
    dispatch(creds_action.setMessages({
      id:Math.floor(Math.random()*10000),
      messageBody:messageContent,
      sender:"You",
      time:time
    }))
    // setMessages((prev)=>{
    //   return[
    //     ...prev,
    //     { 
    //       id:Math.floor(Math.random()*600),
    //       messageBody:messageContent,
    //       sender:"You"
    //     }
    //   ]
    // })
    console.log(messages);
  }


  return{
    handleSend,
    handleLogin
  };
}






// <div>
// <div>
//   <input type='text' name='token' onChange={(event) => { setToken(event.target.value) }} placeholder="Token" />
//   <input type='text' name='channel' onChange={(event) => { setChannelName(event.target.value) }} placeholder="Channel Name" />
//   <input type='text' name='uid' onChange={(event) => { setUid(event.target.value) }} placeholder="Enter Uid" />
//   <div className='button-group'>
//     <button id='join' type='button' className='btn btn-primary btn-sm'  onClick={handleLogin}>Login</button>
//   </div>
// </div>
// <div>
//   <input type="text" name="message" value={messageContent} placeholder='Enter your message...' onChange={(event)=>{setMessageContent(event.target.value)}} />
//   <button onClick={handleSend}>Send</button>
// </div>

// <div className='messageBox'>
//   {messages.length!==0 && messages.map((item)=>{
//     return(
//       <Message
//         key={item.id} 
//         from={item.sender}
//         body={item.messageBody}
//       />
//     )
//   })}
//   <div className='sendForm'>
//     <input type="text" name="message" value={messageContent} placeholder='Enter your message...' onChange={(event)=>{setMessageContent(event.target.value)}} />
//     <button onClick={handleSend}><SendIcon/></button>
//   </div>
// </div>


// </div>