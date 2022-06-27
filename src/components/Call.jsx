import React, { useState,useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import AgoraRTM from 'agora-rtm-sdk';
import useAgora from '../hooks/useAgora';
import useAgoraChat from '../hooks/useAgoraChat';
import MediaPlayer from './MediaPlayer';
import UserList from './UserList';
import MessageBox from './chat/messageBox';
import { useDispatch, useSelector } from 'react-redux';
import { creds_action } from '../store/main';
import './Call.css';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MessageIcon from '@mui/icons-material/Message';
import BrushIcon from '@mui/icons-material/Brush';
import FormInput from './input';




const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });
const chat_client = AgoraRTM.createInstance("432c04ed8fe74085997cde10212cdf1d",{ enableLogUpload: false });
function Call() {
  // const credentials=useSelector((state)=>state.credentials.creds);
  const showUsers=useSelector((state)=>state.credentials.showUserList);
  const showMessages=useSelector((state)=>state.credentials.showMessageBox);
  const [isconnected,setIsConnecetd]=useState(false);
  const [isMute,setIsMute]=useState(false);
  const [isVideoOff,setIsVideoOff]=useState(false);
  const dispatch=useDispatch();
  const {
    localAudioTrack, localVideoTrack,join,joinState, remoteUsers,leave,mute,videoOff,shareScreen,
  } = useAgora(client);
  const{handleSend,handleLogin}=useAgoraChat(chat_client);

  const [time,setTime]=useState(new Date().toLocaleTimeString(navigator.language,{
    hour:'2-digit',
    minute:'2-digit',
    hour24:true
  }));
  useEffect(() => { 
    var timer = setInterval(()=>setTime(new Date().toLocaleTimeString(navigator.language,{
      hour:'2-digit',
      minute:'2-digit',
    })), 1000 )
    return function cleanup() {
        clearInterval(timer)
    }

  });

  useEffect(() => { 
    if(remoteUsers.length!==0){
      console.log(remoteUsers[remoteUsers.length-1]);
      dispatch(creds_action.setUsers({
        // key:Math.floor(Math.random()*500),
        id:remoteUsers[remoteUsers.length-1]._uintid,
        name:remoteUsers[remoteUsers.length-1].uid,
        audio:remoteUsers[remoteUsers.length-1].hasAudio
      }))
    }
  },[remoteUsers,dispatch]);
  
  function handleJoin(data){
    join(data.appId, data.channelName, data.rtcToken,data.userName);
    handleLogin(data.userName,data.rtmToken)
    console.log(localVideoTrack);
    console.log(localAudioTrack);
    setIsConnecetd(true);
  }
  function handleLeave(event){
    setIsConnecetd(false)
    leave()
    event.preventDefault()
  }

  function auidoOff(event){
    mute(!isMute)
    setIsMute(!isMute)
    event.preventDefault()
  }
  function videoClose(event){
    videoOff(!isVideoOff)
    setIsVideoOff(!isVideoOff)
    event.preventDefault()
  }
  function handleShare(event){
    shareScreen()
    event.preventDefault();
  }
  function showMessageBox(event){
    dispatch(creds_action.toggleMessageBox())
  }
  function showWhiteBoard(){

  }
  function showMembers(){
    dispatch(creds_action.toggleUserList())
  }
  function sendMessage(text){
    handleSend(text,time)
  }
  return (
    <div className='call'>
      
      {!isconnected ?
        <div>
          <FormInput onLogin={handleJoin}/>
        </div>
        :
        <div>
        {showUsers && <UserList name={client.uid} audio={client.hasAudio}/> }
        {showMessages && <MessageBox handleMessage={sendMessage}/>}
            <div className='player-container'>
              <div className='videos'>
                <div className='local-player-wrapper'>
                  <p className='local-player-text'>{joinState && localVideoTrack ? `You` : ''}</p>
                  <MediaPlayer videoTrack={localVideoTrack} audioTrack={undefined}></MediaPlayer>
                </div>
                {remoteUsers.map(user => (<div className='remote-player-wrapper' key={user.uid}>
                    <p className='remote-player-text'>{`${user.uid}`}</p>
                    <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer>
                  </div>))}
              </div>

              <div className="toolbar">
                <div className='time'>
                  <p>{time}</p>
                  <p className='vl'></p>
                  <p>Meeting Code</p>
                </div>

                <div className='controls'>
                  <div className="endButton">
                    {isMute ? <MicOffIcon className="buttonIcon" onClick={auidoOff}/>:
                    <MicIcon className="buttonIcon" onClick={auidoOff}/>}
                  </div>

                  <div className="endButton">
                    {isVideoOff ? <VideocamOffIcon className="buttonIcon" onClick={videoClose}/>:
                      <VideocamIcon className="buttonIcon" onClick={videoClose}/>}
                  </div>
                  <div className= "endButton">
                    <ScreenShareIcon className="buttonIcon" onClick={handleShare}/>
                  </div>
                  <div className="endButton"> 
                    <CallEndIcon className="buttonIcon" onClick={handleLeave}/>
                  </div>
                </div> 

                <div className='extra'>
                  <div className='member'>
                    {/* <p>{remoteUsers.length}</p> */}
                    <PeopleAltIcon className='extraIcon'style={{ fontSize: '30px' }} onClick={showMembers}/>
                  </div>
                  <div className='chat'>
                    <MessageIcon className='extraIcon'style={{ fontSize: '30px' }} onClick={showMessageBox}/>
                  </div>
                  <div className='whiteboard'>
                  <BrushIcon className='extraIcon'style={{ fontSize: '30px' }} onClick={showWhiteBoard}/>
                  </div>
                  
                  
                </div>
              </div>
          
            </div>
        </div>}
    </div>
  );
}

export default Call;





// 006432c04ed8fe74085997cde10212cdf1dIABgJatAFskdkLK7cdXsvv2NA+7TOkdHBdIuFHQQAXNR92/yXh0AAAAAEADllefeOnSwYgEA6AM6dLBi
// `remoteVideo(${user.uid})`