import { Fragment, useContext } from "react"
import { Context } from "./context/Context"
import DashboardRoutes from "./router/Dashboard"
import LoginRoutes from "./router/Register"

function App() {
  const context = useContext(Context)
  return (
    <Fragment>
      {context?.token ? <DashboardRoutes/> : <LoginRoutes/>}
    </Fragment>
  )
}

export default App
