import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";


const PrivateRoute = () => {

    const {currentUser} = useSelector((state) => state.user)

    return (
        <div>

            {/*I made use of Outlet because it is an alternative instead of passing children into it*/}

            {currentUser ? <Outlet/> : <Navigate to='/sign-in'/> }
        </div>
    )
    }

export default PrivateRoute
