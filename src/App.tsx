import { useContext } from "react"
import { Context } from "./context/Context"
import DashboardRoutes from "./router/Dashboard"
import LoginRoutes from "./router/Register"

function App() {
  const context = useContext(Context)
  return (
    <>
      {context?.token ? <DashboardRoutes/> : <LoginRoutes/>}
    </>
  )
}

export default App
