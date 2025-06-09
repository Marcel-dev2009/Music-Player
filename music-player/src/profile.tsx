import profile from './assets/Person.png';
function Profile() {
  return (
  <>
   <div>
      <img src={profile} alt="Character" style={{width: "12rem"}} loading='lazy'/>
   </div>
  </> 
  )
}
export default Profile;