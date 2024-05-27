import {useSelector} from 'react-redux';



const DashProfile = () => {

    const {currentUser} = useSelector(state => state.user) 

    return (
        <div className='max-w-sm mx-auto p-3 w-full'>

            <h1 className='my-7 text-center font-semibold text-xl'>
                PROFILE
            </h1>

            <form className='flex flex-col gap-4'>
                
                <div className='w-32 h-30 self-center cursor-pointer shadow-md rounded-full overflow-hidden'>
                    <img className='rounded-full w-full h-full border-8 border-indigo-300 object-cover' src={currentUser.profilePicture} alt='user image'/>
                </div>

                <input type='text' id='username'
                placeholder='username'
                defaultValue={currentUser.username} 
                className='focus:outline-none rounded-lg'/>

                <input type='email' id='email'
                placeholder='email'
                defaultValue={currentUser.email} 
                className='focus:outline-none rounded-lg'/>

                <input type='password' id='username'
                placeholder='password' 
                className='focus:outline-none rounded-lg'
                />

                <button type='submit' className='update rounded-lg focus:outline-none'>
                    UPDATE
                </button>


            </form>

            <div className='text-red-500 flex justify-between mt-5'>
                <span className='cursor-pointer'>Delete</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>

        </div>
    )
}

export default DashProfile
