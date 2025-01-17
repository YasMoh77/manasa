import { useEffect,useState,useContext } from 'react';
import { UserContext } from '../user/UserProvider';
import { Link } from 'react-router-dom';
import  './nav.css';


const Nav = () => {
	const {loginData} = useContext(UserContext)
	//states
	const [userIconCont, setUserIconCont] = useState(false)
	const [showUserIcon, setShowUserIcon] = useState(false)
	//collapse user box
	const collapse=()=>{
		setUserIconCont(prev=>!prev)
	}

	//show icon 
	useEffect(() => {
		if(loginData){
			setShowUserIcon(true)
		}else{
			setShowUserIcon(false)
		}
		
	}, [loginData])

    return (
        <div>
             {/* Start top-navbar  */}
			 <div className='d-flex w-100  mx-auto  p-2 align-items-center justify-content-between fs-5'>
				<ul className=' list-unstyled list-inline m-0 p-0'>
					<li className='list-inline-item ms-3'> <Link to='/home'>من نحن</Link></li>
					<li className='list-inline-item ms-3'> <Link to='/teachers'>سؤال وجواب</Link></li>
					{
					showUserIcon 
					?
						(<li className='list-inline-item ms-3 position-relative'>
							<i onClick={collapse} className='bi bi-person-circle color-1 '></i>
							{userIconCont && 
							<div className='account-nav-cont position-absolute bg-light p-2 rounded-1 fs-6'>
								<Link className='d-block mb-2 ' to='/profile'> حسابي</Link>
								<Link className='d-block mb-2' to='/logout'> تسجيل الخروج</Link>
							</div>}
						</li>)
					: 
					   (<li className='list-inline-item ms-3'> <Link to='/login'> دخول</Link></li>)
					}
				</ul>
				<ul className='m-0 list-unstyled'>
				    <li className='list-inline-item me-4'><a href='https://wa.me/201020121073'>واتس اب <i className='bi bi-whatsapp text-success'></i></a> </li>
					<li className='list-inline-item me-4'>01020121073 <i className='bi bi-phone-fill color-1'></i></li>
					<li className='list-inline-item me-4'>hgq1100@yahoo.com <i className='bi bi-envelope-at-fill color-1'></i> </li>
				</ul>
			 </div>
			  {/* End navbar   */}
			  {/* Start bottom-navbar  */}
			  <div className=' mx-auto  bg-1  py-3  fs-5 d-flex align-items-center'>
				  <div className='w-25 px-3 fw-bold'><i className=" fs-1 bi bi-mortarboard"></i>منصتي  Manasaty</div>
				  <div>
					  <ul className='list-inline p-0 mb-0'>
							<li className='list-inline-item mx-4 '> <Link className='text-white text-decoration-none' to='/home'>الرئيسية</Link></li>
							<li className='list-inline-item mx-4'> <Link className='text-white text-decoration-none' to='/stages'>المراحل الدراسية</Link></li>
							<li className='list-inline-item  mx-4'> <Link className='text-white text-decoration-none' to='/teachers'>المعلمون</Link></li>
							<li className='list-inline-item mx-4'> <Link className='text-white text-decoration-none' to='/courses'>الدروس</Link></li>
							<li className='list-inline-item mx-4'> <Link className='text-white text-decoration-none' to='/pdf'>pdf</Link></li>
					   </ul>
				  </div>
			 </div>
             
		      {/* End bottom-navbar   */}
		
        </div>
    )
}

export default Nav
