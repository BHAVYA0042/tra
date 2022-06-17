
import React, { useRef, useEffect,useState } from "react";
import "./Call.css"
function MediaPlayer(props){
  const [isEmpty,setIsEmpty]=useState(false);
  const container = useRef();
  useEffect(() => {
    if (!container.current){
      setIsEmpty(true);
      console.log("no video from remote user");
    };
    props.videoTrack?.play(container.current);
    return () => {
      props.videoTrack?.stop();
    };
  }, [container, props.videoTrack]);
  useEffect(() => {
    if(props.audioTrack){
      props.audioTrack?.play();
    }
    return () => {
      props.audioTrack?.stop();
    };
  }, [props.audioTrack]);
  return (
    <div ref={container}  className="video-player"></div>
  );
}

export default MediaPlayer;