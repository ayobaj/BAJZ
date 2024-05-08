import bazsup_yvvqhb from '../assets/bazsup_yvvqhb.jpg';
import {Link} from 'react-router-dom'

const SignUp = () => {
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

                <form className='flex flex-col gap-4 '>
                    <div>
                        <label className=''>Username</label>
                        <input placeholder='Username '
                        className='md:w-[450px] w-full md:p-3 p-2 rounded-lg'
                        id='username'
                        type='text'/>
        
                    </div>
                    <div>
                        <label className=''>Email</label>
                        <input placeholder='Email'
                        className='md:w-[450px] w-full md:p-3 p-2 rounded-lg'
                        id='email'
                        type='text'/>
                    </div>
                    <div>
                        <label className=''>Password</label>
                        <input placeholder='Password'
                        className='md:w-[450px] w-full md:p-3 p-2 rounded-lg'
                        id='password'
                        type='text'/>
                    </div>
                    <div>
                        <button className='w-full p-3 text-white bg-indigo-500 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-indigo-600'>
                            Create Account
                        </button>
                    </div>

                </form>
                <div className='text-sm mt-5'>
                    <span className='pr-2 '>Already have an account?</span>
                    <Link to='/sign-in' className='text-indigo-500'>Sign in</Link>
                </div>

            </div>

        </div>
    </div>
    )
}

export default SignUp
