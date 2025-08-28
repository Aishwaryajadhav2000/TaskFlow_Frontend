import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

function App() {

  return (
    <>
     <Header></Header>

     <Body></Body>

     <Footer></Footer>

     <Outlet/>
    </>
  )
}

export default App
