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

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App></App>
  },
  {
    path: '/addtask',
    element: <CreateTask></CreateTask>
  },
  {
    path:'/signup',
    element:<Signin></Signin>
  },
  {
    path:'/createadmin',
    element:<CreateAdmin></CreateAdmin>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Provider> */}
      <Suspense>
        <RouterProvider router={appRouter}></RouterProvider>
      </Suspense>
    {/* </Provider> */}
  </StrictMode>
)
