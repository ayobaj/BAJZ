import { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase' 
import { Alert } from 'flowbite-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



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
        setImageFileUploadError(null);
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
                let errorMessage;
                switch (error.code) {
                    case 'storage/unauthorized':
                        errorMessage = 'Permission denied';
                        break;
                    case 'storage/canceled':
                        errorMessage = 'Upload Cancelled';
                        break;
                    case 'storage/unknown':
                        errorMessage = 'Unknown error occurred. Please try again.';
                        break;
                    default:
                        errorMessage = 'File size must be less than 2MB';
                        break;
                }
                setImageFileUploadError(errorMessage);
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
            },

            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setImageFileUploadProgress(null);
                })
            }
        )
    }



    return (
        <div className='max-w-sm mx-auto p-3 w-full'>

            <h1 className='my-7 text-center font-semibold text-xl'>
                PROFILE
            </h1>

            <form className='flex flex-col gap-4'>

                <input hidden type='file' accept='image/*' onChange={handleImageChange} ref={filePicker}/>
                
                <div className='relative w-32 h-30 self-center cursor-pointer shadow-md rounded-full overflow-hidden' onClick={()=> filePicker.current.click()}>

                    {imageFileUploadProgress && (<CircularProgressbar value={imageFileUploadProgress || 0}
                        text={`${imageFileUploadProgress}%`} 
                        strokeWidth={5} styles={{
                        root:{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0
                        },
                        path:{
                            stroke: `rgba(165, 180, 252, ${imageFileUploadProgress / 100})`,
                        }
                    }}
                    />)}

                    <img className= {`rounded-full w-full h-full border-8 border-slate-200 object-cover ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'} `} src={imageFileUrl || currentUser.profilePicture} alt='user image'/>

                </div>

                {imageFileUploadError && (<Alert color='failure'>{imageFileUploadError}</Alert>)}

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
