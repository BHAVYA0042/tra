import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';
import PersonIcon from '@mui/icons-material/Person';
function User(props){
  return(
    <div className='user'>
      <div className='avatar'><PersonIcon /></div>
      <div className="name">
        {props.host==='true' ? 
          <h3>{props.name}(You)</h3>:
          <h3>{props.name}</h3>
        }
      </div>
      <div className="mic">
        {props.audio ? <MicIcon />: <MicOffIcon/>}
      </div>
      
    </div> 

  )
}
export default User;