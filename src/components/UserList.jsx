import "./Call.css";
import { useSelector,useDispatch } from "react-redux";
import User from "./User";
import CloseIcon from '@mui/icons-material/Close';
import {creds_action} from "../store/main"
function UserList(props){
  const users=useSelector((state)=>state.credentials.users);
  const showUsers=useSelector((state)=>state.credentials.showUserList);
  const dispatch=useDispatch()
  function closeModal(){
    dispatch(creds_action.toggleUserList())
  }
  return(
    <div>
      {showUsers && 
        <div className='modal'>
          <div className='messageBox'>

            <div className="info_box">
              <div className="first_line">
                <h3>People</h3>
                <CloseIcon onClick={closeModal} style={{cursor:"pointer"}}/>
              </div>
              <div className="second_line">
                <p>Messages can be seen only by people in the call and are deleted when the call ends</p>
              </div>
            </div>
          

            <div className="userBox">
              <User 
                name={props.name}
                audio={props.audio}
                host='true'
              />
              {users.map((user)=>{
                console.log("This will tell the value" ,user.audio)
                return(
                  <User 
                    name={user.name}
                    audio={user.audio}
                    host='false'
                  />
                )
              })
              }
            </div>

          </div>
        </div>
      }
      
    </div>



    
  )
}
export default UserList;