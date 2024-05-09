import { useState } from 'react';
import bazsup_yvvqhb from '../assets/bazsup_yvvqhb.jpg';
import {Link, useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Spinner} from 'flowbite-react';

const SignUp = () => {

// TRACKING FORM CHANGES
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id ] : e.target.value})
    };
    console.log(formData); 


    // FORM SUBMISSION TO THE DATABASE
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            setErrorMsg(null);

            const res = await fetch('/api/authenticate/signup', {

                method: 'POST',

                headers: {'Content-Type' : 'application/json'},

                body: JSON.stringify(formData),
            });

            const data = await res.json();

            console.log(data);

            if(res.ok){
                setLoading(false)
                toast(data.message);
                navigate('/sign-in');

            } else if(data.success === false){
                setLoading(false);
                setErrorMsg(data.message);
                toast.error(data.message);
                return
            }


        } catch (error) {
            setLoading(false);
            setErrorMsg(error.message);
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

                <h1 className='pb-4 font-semibold text-lg'>Create Account</h1>

                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div>
                        <label className=''>Username</label>
                        <input placeholder='Username '
                        className='md:w-[450px] w-full md:p-3 p-2 rounded-lg'
                        id='username'
                        type='text'
                        onChange={handleChange}/>
        
                    </div>

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
                            ) : 'Create Account'}
                        </button>
                    </div>

                </form>
                <div className='text-sm mt-5'>
                    <span className='pr-2 '>Already have an account?</span>
                    <Link to='/sign-in' className='text-indigo-500'>Sign in</Link>
                </div>

            </div>

        </div>
        {<ToastContainer/>}
    </div>
    )
}

export default SignUp
