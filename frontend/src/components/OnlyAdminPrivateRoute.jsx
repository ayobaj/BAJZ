import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";


const OnlyAdminPrivateRoute = () => {

    const {currentUser} = useSelector((state) => state.user)

    return (
        <div>
            {currentUser && currentUser.isAdmin ? <Outlet/> : <Navigate to='/sign-in'/> }
        </div>
    )
    }

export default OnlyAdminPrivateRoute
