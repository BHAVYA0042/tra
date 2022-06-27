import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MessageIcon from '@mui/icons-material/Message';
import BrushIcon from '@mui/icons-material/Brush';
import {useState,useEffect} from "react";
import useAgora from '../hooks/useAgora';

function Toolbar(props){
  const [isconnected,setIsConnecetd]=useState(false);
  const [isMute,setIsMute]=useState(false);
  const [isVideoOff,setIsVideoOff]=useState(false);
  const [time,setTime]=useState(new Date().toLocaleTimeString(navigator.language,{
    hour:'2-digit',
    minute:'2-digit',
    hour24:true
  }));
  const {
    leave,showUsers,mute,videoOff,shareScreen,joinState, remoteUsers
  } = useAgora(props.client);

  useEffect(() => { 
    var timer = setInterval(()=>setTime(new Date().toLocaleTimeString(navigator.language,{
      hour:'2-digit',
      minute:'2-digit',
    })), 1000 )
    return function cleanup() {
        clearInterval(timer)
    }
  });
  console.log(props.client);

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
  function showMessages(event){

  }
  function showWhiteBoard(){

  }
  function showMembers(){
    console.log(props.client.uid);
    showUsers()
  }
  return(
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
                <p></p>
                <PeopleAltIcon className='extraIcon'style={{ fontSize: '30px' }} onClick={showMembers}/>
              </div>
              <div className='chat'>
                <MessageIcon className='extraIcon'style={{ fontSize: '30px' }} onClick={showMessages}/>
              </div>
              <div className='whiteboard'>
              <BrushIcon className='extraIcon'style={{ fontSize: '30px' }} onClick={showWhiteBoard}/>
              </div>
            </div>
        </div>
  )
}
export default Toolbar;