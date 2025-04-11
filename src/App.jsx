import React from "react"
import Header from "./Components/Header/Header"
import { Outlet } from "react-router-dom"
import Footer from "./Components/Footer/Footer"
import Signup from "./Components/Signup/Signup"
import HostelSearch from "./Components/HostelSearch/HostelSearch"



function App() {

  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  
  );
}


export default App
