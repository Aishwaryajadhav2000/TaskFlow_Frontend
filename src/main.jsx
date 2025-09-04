import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import CreateTask from './pages/CreateTask.jsx'
import { RouterProvider } from 'react-router-dom'
import Signin from './pages/Signin.jsx'
import CreateAdmin from './pages/CreateAdmin.jsx'
import { Provider } from 'react-redux'
import UpdateTask from './pages/UpdateTask.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Body from './components/Body.jsx'
import Loader from './components/Loader.jsx'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        path: '/addtask',
        element: <CreateTask></CreateTask>
      },
      {
        path: '/signup',
        element: <Signin></Signin>
      },
      {
        path: '/createadmin',
        element: <CreateAdmin></CreateAdmin>
      },
      {
        path: '/updatetask',
        element: <UpdateTask></UpdateTask>
      },
      {
        path: '/contact',
        element: <Footer></Footer>
      },
      {
        path: '/',
        element: <Suspense fallback={<Loader></Loader>}>
          <Body></Body>
        </Suspense>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Provider> */}
    {/* <Suspense fallback={<Loader></Loader>}> */}
    <RouterProvider router={appRouter}></RouterProvider>
    {/* </Suspense> */}
    {/* </Provider> */}
  </StrictMode>
)
