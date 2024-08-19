import { useState } from 'react';
import bazsup_yvvqhb from '../assets/bazsup_yvvqhb.jpg';
import {Link, useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Spinner} from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../Redux/user/userSlice';
import OAuth from '../components/OAuth';


const SignIn = () => {

// TRACKING FORM CHANGES
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.user);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id ] : e.target.value})
    };



    // FORM SUBMISSION TO THE DATABASE
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            dispatch(signInStart());

            const res = await fetch('/api/authenticate/signin', {

                method: 'POST',

                headers: {'Content-Type' : 'application/json'},

                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if(res.ok){
                dispatch(signInSuccess(data))
                toast(data.message);
                navigate('/');

            } else if(data.success === false){
                dispatch(signInFailure(data.message));
                toast.error(data.message);
                return
            }


        } catch (error) {
            dispatch(signInFailure(error.message));
            toast.error(error.message);
        }
    };

return (
    <div className='min-h-screen md:mt-20'>

        <div className='flex flex-col p-3 max-w-4xl mx-auto md:flex-row md:items-center'>
            {/* left */}
            
            <div className='flex-1'>
                <img src={bazsup_yvvqhb} className=''/>
            </div>

            {/* right */}
            <div className='flex-1'>

                <h1 className='pb-4 font-semibold text-lg'>Sign in</h1>

                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

                    <div>
                        <label className=''>Email</label>
                        <input placeholder='Email'
                        className='md:w-[450px] w-full md:p-3 p-2 rounded-lg'
                        id='email'
                        type='email'
                        onChange={handleChange}/>
                    </div>

                    <div>
                        <label className=''>Password</label>
                        <input placeholder='Password'
                        className='md:w-[450px] w-full md:p-3 p-2 rounded-lg'
                        id='password'
                        type='password'
                        onChange={handleChange}/>
                    </div>

                    <div> 
                        <button disabled={loading} className='w-full p-3 text-white bg-indigo-500 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-indigo-600'>
                            {loading ? (
                                <>
                                    <Spinner size ='sm'/>
                                    <span className='pl-3'>Loading...</span>
                                </>
                            ) : 'SIGN IN'}
                        </button>
                    </div>
                    <OAuth/>
                </form>
                <div className='text-sm mt-5'>
                    <span className='pr-2 '>Don't have an account?</span>
                    <Link to='/sign-up' className='text-indigo-500'>Sign up</Link>
                </div>

            </div>

        </div>
        {<ToastContainer/>}
    </div>
    )
}

export default SignIn;
