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
  function handleJoin(){
    
  }
  return(
    <div>
      <form onSubmit={handleJoin}>
        <input type='text' name='token' onChange={(event) => { setToken(event.target.value) }} placeholder="Token" />
        <input type='text' name='channel' onChange={(event) => { setChannel(event.target.value) }} placeholder="Channel Name" />
        <div className='button-group'>
          <button id='join' type='button' className='btn btn-primary btn-sm' disabled={joinState} onClick={handleJoin}>Join</button>
        </div>
      </form>
      <form onSubmit={handleSend}>
        <input type="text" name="message" value={message} placeholder='Enter your message...' onChange={messageHandler} />
        <button>Send</button>
      </form>
    </div>
    

  )
}
