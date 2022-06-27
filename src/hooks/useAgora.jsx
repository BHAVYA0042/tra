import { useState, useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

export default function useAgora(client){
  const [localVideoTrack, setLocalVideoTrack] = useState(undefined);
  const [localAudioTrack, setLocalAudioTrack] = useState(undefined);
  const [audio,setAudio]=useState();
  const [video,setVideo]=useState();
  const [joinState, setJoinState] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [userList,setUserList]=useState([{
    name:client.uid
  }])

  async function createLocalTracks(audioConfig, videoConfig){
    const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks(audioConfig, videoConfig);
    setLocalAudioTrack(microphoneTrack);
    setLocalVideoTrack(cameraTrack);
    return [microphoneTrack, cameraTrack];
  }
  async function shareScreen(){
    await client.unpublish([localAudioTrack,localVideoTrack]);
    const sharedScreen= await AgoraRTC.createScreenVideoTrack({
      encoderConfig: "1080p_1",
      optimizationMode: "detail"
    })
    console.log("started screen sharing");
    await client.publish([localAudioTrack, sharedScreen]);
    window.client = client;
    window.videoTrack = sharedScreen;


    sharedScreen.on('track-ended',function(){
      client.unpublish([localAudioTrack, sharedScreen]);
      client.publish([localAudioTrack,localVideoTrack]);
    })
  }
  async function join(appid,channel,token,uid) {
    if (!client) return;
    await client.join(appid, channel, token,uid);
    const [microphoneTrack, cameraTrack] = await createLocalTracks();
    setAudio(microphoneTrack);
    setVideo(cameraTrack);
    

    await client.publish([microphoneTrack, cameraTrack]);
    window.client = client;
    window.videoTrack = cameraTrack;
    setJoinState(true);
  }

  async function leave() {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }
    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
    }
    setRemoteUsers([]);
    setJoinState(false);
    await client?.leave();
  }

  async function mute(val) {
    if (localAudioTrack) {
      localAudioTrack.setEnabled(!val)
    }
    console.log(audio);
  }
  async function videoOff(val) {
    if (localVideoTrack) {
      localVideoTrack.setEnabled(!val)
    }
    console.log(video);
  }
  function showUsers(){
    setUserList((prev)=>{
      return[
        ...prev,
      
      ]
    })
    console.log(remoteUsers)
    // remoteUsers.map((item)=>console.log(item.uid))
  }

  useEffect(() => {
    if (!client) return;
    setRemoteUsers(client.remoteUsers);
    console.log(remoteUsers)

    const handleUserPublished = async (user,mediaType) => {
      await client.subscribe(user, mediaType);
      // toggle rerender while state of remoteUsers changed.
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    }
    const handleUserUnpublished = (user) => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    }
    const handleUserJoined = (user) => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    }
    const handleUserLeft = (user) => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    }
    client.on('user-published', handleUserPublished);
    client.on('user-unpublished', handleUserUnpublished);
    client.on('user-joined', handleUserJoined);
    client.on('user-left', handleUserLeft);

    return () => {
      client.off('user-published', handleUserPublished);
      client.off('user-unpublished', handleUserUnpublished);
      client.off('user-joined', handleUserJoined);
      client.off('user-left', handleUserLeft);
    };
  }, [client,remoteUsers]);

  return {
    localAudioTrack,
    localVideoTrack,
    joinState,
    leave,
    join,
    mute,
    videoOff,
    shareScreen,
    remoteUsers,
  };
}