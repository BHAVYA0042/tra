import {createSlice} from "@reduxjs/toolkit"
const agora_slice=createSlice({
  name:'call',
  initialState:{
    users:[],
    creds:{
      rtcToken:"",
      rtmToken:"",
      userName:""
    },
    channelCreds:{
      appid:"432c04ed8fe74085997cde10212cdf1d",
      channelName:"movie"
    },
    messages:[],
    showMessageBox:'false',
    showUserList:'false'
  },
  reducers:{
    setCreds(state,action){
      const newData=action.payload;
      state.creds.rtcToken=newData.rtcToken;
      state.creds.rtmToken=newData.rtmToken;
      state.creds.userName=newData.userName;
    },
    setMessages(state,action){
      const newMessage=action.payload;
      state.messages.push(newMessage);
    },
    setUsers(state,action){
      const newUser=action.payload;
      const existingUser=state.users.find(user=>user.id===newUser.id)
      if(!existingUser){
        state.users.push(newUser);
      }else{
        existingUser.audio=newUser.audio
      }
      
    },
    toggleUserList(state){
      state.showUserList=!state.showUserList
    },
    toggleMessageBox(state){
      state.showMessageBox=!state.showMessageBox
    }
  }
})
export default agora_slice;