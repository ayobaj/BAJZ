import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './Pages/CreatePost'
import UpdatePost from './Pages/UpdatePost'
import PostPage from './Pages/PostPage'
import Search from './Pages/Search'




const App = () => {
return (
    <div className='font-tiltneon'>
        <NavBar/>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/sign-in' element={<SignIn/>} />
            <Route path='/sign-up' element={<SignUp/>} />
            <Route path='/search' element={<Search/>}/>

            <Route element={<PrivateRoute/>}>
                <Route path='/dashboard' element={<Dashboard/>} />
            </Route>

            <Route element={<OnlyAdminPrivateRoute/>}>
                <Route path='/create-post' element={<CreatePost/>} />
                <Route path='/update-post/:postId' element={<UpdatePost/>}/>
            </Route>

            <Route path='/projects' element={<Projects/>}/>

            <Route path='/post/:postSlug' element={<PostPage/>}/>

            
        </Routes>
        <Footer/>

    </div>
)
}

export default App
