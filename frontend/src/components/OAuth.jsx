import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../Redux/user/userSlice";
import { useNavigate } from "react-router-dom";


const OAuth = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleGoogleClick = async () => {

        const auth = getAuth(app);
        
        const provider = new GoogleAuthProvider();

        provider.setCustomParameters({prompt: 'select_account'})

        try{

            const resultsFromGoogle = await signInWithPopup(auth, provider)

            const res = await fetch('/api/authenticate/google', {
                method: 'POST',

                headers: {'Content-Type': 'application/json'},

                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email:resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                })
            })

            const data = await res.json();

            if (res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }

        } catch(error) {
            console.error('Google sign-in error:', error);
        }

    }



    return (
        <div className="">
            <button onClick={handleGoogleClick} type="button" className="flex items-center justify-center gap-2 w-full p-3 text-white bg-red-500 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-red-600"><span><AiFillGoogleCircle className="text-2xl"/></span>Continue with google</button>
        </div>
    )
} 

export default OAuth;
