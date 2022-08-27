import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
 const userid = 1;
 const navigate = useNavigate();
 const goToEditProfile = (e) => {
  e.preventDefault();
  navigate(`/user/edit-profile/${userid}`, { replace: false });
 };
 return (
  <div>
   <h1>Profile Details</h1>
   <Button variant="primary" type="submit" onClick={goToEditProfile}>
    Edit Profile
   </Button>
  </div>
 );
}
