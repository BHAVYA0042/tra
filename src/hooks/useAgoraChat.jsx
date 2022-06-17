import { useState, useEffect } from 'react';
import AgoraRTM from 'agora-rtm-sdk';

export default function useAgoraChat(client){
  const [localVideoTrack, setLocalVideoTrack] = useState(undefined);
  const [localAudioTrack, setLocalAudioTrack] = useState(undefined);
  const [audio,setAudio]=useState();
  const [video,setVideo]=useState();
  const [joinState, setJoinState] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState([]);


  async function login (token) {
    // this.accountName = accountName
    return client.login({token })
  }
  
  async function logout () {
    return this.client.logout()
  }
  
  async function joinChannel (name) {
    console.log('joinChannel', name)
    const channel = await client.createChannel(name)
    // channel.subscribeChannelEvents(name)
    return channel.join()
  }
  
  // async function leaveChannel (name) {
  //   console.log('leaveChannel', name)
  //   if (!this.channels[name] ||
  //     (this.channels[name] &&
  //       !this.channels[name].joined)) return
  //   return this.channels[name].channel.leave()
  // }
  
  async function sendChannelMessage (text, channelName) {
    channel.sendMessage({ text })
    if (!this.channels[channelName] || !this.channels[channelName].joined) return
    return this.channels[channelName].channel.sendMessage({ text })
  }

  useEffect(() => {
    if (!client) return;
    setRemoteUsers(client.remoteUsers);

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
  }, [client]);

  return {
    localAudioTrack,
    localVideoTrack,
    joinState,
    leave,
    join,
    mute,
    videoOff,
    remoteUsers,
  };
}