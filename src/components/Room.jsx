import MediaPlayer from "./MediaPlayer";
import useAgora from '../hooks/useAgora';
import "./Call.css";
import { useState } from "react";
function Room(props){
  const [buttonClicked,setButtonClicked]=useState(false);
  function proceed(event){
    setButtonClicked(true)
    props.onTrigger(buttonClicked)
    event.preventDefault();
  }
  const {
    localAudioTrack, localVideoTrack, leave, join,mute,videoOff,joinState, remoteUsers
  } = useAgora(props.pers);
  console.log(localVideoTrack);
  return(
    <div className="room">
      <div className='local-player-wrapper'>
        <p className='local-player-text'>{props.video && `localTrack`}{joinState && props.video ? `(${props.pers.uid})` : ''}</p>
        <MediaPlayer videoTrack={props.video} audioTrack={undefined}></MediaPlayer>
      </div>
      <button onClick={proceed}>Join</button>
    </div>


    
  )
}
export default Room;