import { useRoutes } from "react-router-dom"
import { SuspenseComponent as Suspense } from "../../utils"
import { lazy } from "react"


const Home = lazy(() => import('../../pages/Dashboard/home/index'))

const DashboardRoutes = () => {
    return useRoutes([
        {
            path: '/',
            element: <Suspense><Home/></Suspense>
        }
    ])
}

export default DashboardRoutes