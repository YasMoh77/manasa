import { useContext } from 'react';
import { UserContext } from '../user/UserProvider'


const Logout = () => {
   const {logout} = useContext(UserContext) 

   logout()
}

export default Logout


