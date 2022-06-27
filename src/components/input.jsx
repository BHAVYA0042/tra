import {useDispatch,useSelector} from "react-redux";
import { useState } from "react";
import { creds_action } from "../store/main";
import './Call.css';
function FormInput(props){
  const [ rtmToken, setRtmToken ] = useState('');
  const [ userName, setUserName ] = useState('');
  const dispatch=useDispatch();
  const channel_credentials=useSelector((state)=>state.credentials.channelCreds);
  function handleInput(event){
    dispatch(creds_action.setCreds({
      rtmToken:rtmToken,
      userName:userName
    }))
    props.onLogin({
      rtmToken:rtmToken,
      userName:userName,
      rtcToken:channel_credentials.rtcToken,
      appId:channel_credentials.appid,
      channelName:channel_credentials.channelName
    })
    event.preventDefault()
  }
  return(
      <form className='call-form' onSubmit={handleInput}>
        <input type='text' name='rtmToken' onChange={(event) => { setRtmToken(event.target.value) }} placeholder="RTM Token" />
        <input type='text' name='userName' onChange={(event) => { setUserName(event.target.value) }} placeholder="User Name" />
        <div className='button-group'>
          <button id='join' type='submit' className='btn btn-primary btn-sm'  >Join</button>
        </div>
      </form>
  )
}

export default FormInput;