import { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux';
import {getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase' 



const DashProfile = () => {

    const {currentUser} = useSelector(state => state.user);
    
    const [imageFile, setImageFile] = useState(null);

    const [imageFileUrl, setImageFileUrl] = useState(null);

    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);

    const [imageFileUploadError, setImageFileUploadError] = useState(null);

    const filePicker = useRef();

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if(file){
            setImageFile(e.target.files[0]);
            setImageFileUrl(URL.createObjectURL(file))
        }

    };

    useEffect(()=>{
        if(imageFile){
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadProgress(progress.toFixed());
            }, 

            (error) => {
                setImageFileUploadError('Could not upload image(File size must be less than 2MB)')
            },
            
            
        )
    }

    console.log(imageFile, imageFileUrl)

    return (
        <div className='max-w-sm mx-auto p-3 w-full'>

            <h1 className='my-7 text-center font-semibold text-xl'>
                PROFILE
            </h1>

            <form className='flex flex-col gap-4'>

                <input hidden type='file' accept='image/*' onChange={handleImageChange} ref={filePicker}/>
                
                <div className='w-32 h-30 self-center cursor-pointer shadow-md rounded-full overflow-hidden' onClick={()=> filePicker.current.click()}>
                    <img className='rounded-full w-full h-full border-8 border-indigo-300 object-cover' src={imageFileUrl || currentUser.profilePicture} alt='user image'/>
                </div>

                <input type='text' id='username'
                placeholder='username'
                defaultValue={currentUser.username} 
                className='focus:outline-none rounded-lg'/>

                <input type='email' id='email'
                placeholder='email'
                defaultValue={currentUser.email} 
                className='focus:outline-none rounded-lg'/>

                <input type='password' id='password'
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
