import { lazy, LazyExoticComponent } from 'react'
import { Route, Routes } from 'react-router-dom'
import { SuspenseComponent as Suspense } from '../../utils'
import Aside from '../../components/aside/Aside'
import NotFound from '../../pages/Dashboard/notFound/NotFound'

function DashboardRoutes() {
    const Home:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/home/Home'))
    const Explore:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/explore/Explore'))
    const Reels:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/reels/Reels'))
    const UserProfile:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/usersProfile/UsersProfile'))
    const MyProfile:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/myProfile/MyProfile'))
    const PostPage:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/postPage/PostPage'))
    const PostModal:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/postModal/PostModal'))
    const SavedPost:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/savedPost/SavedPost'))
    const CreatePost:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/createPost/CreatePost'))
    const EditProfile:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/editProfile/EditProfile'))
    const Notification:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/notificationPage/NotificationPage'))
    const Chats:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/chatPage/ChatPage'))
    const People:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/people/People'))
  return (
    <main className='grid grid-cols-12'>
        <Aside/>
        <div className='col-span-10'>
        <Routes>
            <Route path='/' element={<Suspense><Home/></Suspense>}/>
            <Route path='/explore' element={<Suspense><Explore/></Suspense>}/>
            <Route path='/people' element={<Suspense><People/></Suspense>}/>
            <Route path='/reels' element={<Suspense><Reels/></Suspense>}/>
            <Route path='/profile/:username' element={<Suspense><UserProfile/></Suspense>}/>
            <Route path='/my-profile' element={<Suspense><MyProfile/></Suspense>}/>
            <Route path='/post-page' element={<Suspense><PostPage/></Suspense>}/>
            <Route path='/post-modal' element={<Suspense><PostModal/></Suspense>}/>
            <Route path='/saved' element={<Suspense><SavedPost/></Suspense>}/>
            <Route path='/create' element={<Suspense><CreatePost/></Suspense>}/>
            <Route path='/edit' element={<Suspense><EditProfile/></Suspense>}/>
            <Route path='/notifications' element={<Suspense><Notification/></Suspense>}/>
            <Route path='/chats' element={<Suspense><Chats/></Suspense>}/>
            <Route path='*' element={<Suspense><NotFound/></Suspense>}/>
        </Routes>
        </div>
    </main>
  )
}

export default DashboardRoutes