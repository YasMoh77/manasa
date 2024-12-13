import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Exports from './components/export/export';
import './App.css';




const {Nav,Home,Teachers,Teacher,Courses,Course,UserProvider,Register,Login,Profile,PdfViewer,Logout,Footer}=Exports;

function App() {
  
  return (
    <div dir='rtl'>
      <UserProvider>
          <Nav/>
              <Routes>
                {/* home loads automatically and on clicking (/home) */}
                <Route path='/'            element={<Home/>} />
                <Route path='/*'           element={<Home/>} />
                <Route path='/home'        element={<Home/>} />
                <Route path='/teacher'     element={<Teacher/>} />
                <Route path='/teachers'    element={<Teachers/>} />
                <Route path='/courses'     element={<Courses/>} />
                <Route path='/course'      element={<Course/>} />
                <Route path='/register'    element={<Register/>} />
                <Route path='/login'       element={<Login/>} />
                <Route path='/profile'     element={<Profile/>} />
                <Route path='/pdf'         element={<PdfViewer/>} />
                <Route path='/logout'      element={<Logout/>} />

              </Routes>
          <Footer/>
      </UserProvider>
    </div>
  );
}

export default App;
