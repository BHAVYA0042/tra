import AgoraRTM from 'agora-rtm-sdk';
import { useState } from 'react';
import Message from './message';
import SendIcon from '@mui/icons-material/Send';

function Chat(){
  const [messageContent,setMessageContent]=useState("");
  const [channelName,setChannelName]=useState();
  const [channel,setChannel]=useState();
  const [token,setToken]=useState();
  const [uid,setUid]=useState();

  const [messages,setMessages]=useState([]);
  const client = AgoraRTM.createInstance("432c04ed8fe74085997cde10212cdf1d",{ enableLogUpload: false });

  async function handleLogin(event){
    await client.login({uid,token})
    console.log(client);
    let channel=await client.createChannel(channelName);
    await channel.join();
    channel.on('ChannelMessage',function(message,memberID){
      console.log(message);
      console.log(memberID);

      setMessages((prev)=>{
        return[
          ...prev,
          {
            id:Math.floor(Math.random()*10000),
            messageBody:message.text,
            sender:memberID
          }
        ]
      })
    })
    setChannel(channel)

    event.preventDefault();
  }

  async function handleSend(event){
    await channel.sendMessage({text:messageContent})
    setMessages((prev)=>{
      return[
        ...prev,
        { 
          id:Math.floor(Math.random()*600),
          messageBody:messageContent,
          sender:"You"
        }
      ]
    })
    event.preventDefault();
  }


  return(
    <div>
      <div>
        <input type='text' name='token' onChange={(event) => { setToken(event.target.value) }} placeholder="Token" />
        <input type='text' name='channel' onChange={(event) => { setChannelName(event.target.value) }} placeholder="Channel Name" />
        <input type='text' name='uid' onChange={(event) => { setUid(event.target.value) }} placeholder="Enter Uid" />
        <div className='button-group'>
          <button id='join' type='button' className='btn btn-primary btn-sm'  onClick={handleLogin}>Login</button>
        </div>
      </div>
      <div>
        <input type="text" name="message" value={messageContent} placeholder='Enter your message...' onChange={(event)=>{setMessageContent(event.target.value)}} />
        <button onClick={handleSend}>Send</button>
      </div>
      
      <div className='messageBox'>
        {messages.length!==0 && messages.map((item)=>{
          return(
            <Message
              key={item.id} 
              from={item.sender}
              body={item.messageBody}
            />
          )
        })}
        <div className='sendForm'>
          <input type="text" name="message" value={messageContent} placeholder='Enter your message...' onChange={(event)=>{setMessageContent(event.target.value)}} />
          <button onClick={handleSend}><SendIcon/></button>
        </div>
      </div>

      
    </div>
  )
}
export default Chat;