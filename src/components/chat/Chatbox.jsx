import AgoraRTM from 'agora-rtm-sdk';
import { useState } from 'react';
const client = AgoraRTM.createInstance("432c04ed8fe74085997cde10212cdf1d", { enableLogUpload: false }); // Pass your App ID here.

function Chat(){
  const [message,setMessage]=useState();

  function messageHandler(event){
    setMessage(event.target.value)
  }
  function handleSend(event){
    console.log(message);
    event.preventDefault()
  }
  return(
    
    <form onSubmit={handleSend}>
      <input type="text" name="message" value={message} placeholder='Enter your message...' onChange={messageHandler} />
      <button>Send</button>
    </form>

  )
}
