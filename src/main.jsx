import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home.jsx'
import About from './Components/About/About.jsx'
import Services from './Components/Services/Services.jsx'
import Gallery from './Components/Gallery/Gallery.jsx'
import Contact from './Components/Contact/Contact.jsx'
import Signup from './Components/Signup/Signup.jsx'
import HostelSearch from './Components/HostelSearch/HostelSearch.jsx'
import Welcome from './Components/Signup/welcome.jsx'
import Student from './Components/Signup/Student.jsx'
import Owner from './Components/Signup/Owner.jsx'
import Admin from './Components/Signup/Admin.jsx'
import OwnerProfile from './Components/Signup/Owner-Profile.jsx'
// import OwnerPage from './Components/OwnerPage/OwnerPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
  <Route path='' element={<Home />} />
  <Route path='Services' element={<Services />} />
  <Route path='About' element={<About />} />
  <Route path='Gallery' element={<Gallery />} />
  <Route path='Contact' element={<Contact />} />
  <Route path='Signup' element={<Signup />} />
  <Route path='Student' element={<Student />} />
  <Route path='Owner' element={<Owner />} />
  <Route path='Admin' element={<Admin />} />
  <Route path='OwnerProfile' element={<OwnerProfile/>}/>
  {/* <Route path='OwnerPage' element={<OwnerPage/>}/> */}

  <Route path='HostelSearch' element={<HostelSearch />} />
  
  </Route>

  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
