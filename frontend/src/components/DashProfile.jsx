import { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase' 
import { Alert, Modal, Button } from 'flowbite-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutUserSuccess } from '../Redux/user/userSlice';
import { useDispatch } from 'react-redux';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {HiOutlineExclamationCircle} from 'react-icons/hi';
import {Link} from 'react-router-dom';



const DashProfile = () => {

    const {currentUser} = useSelector(state => state.user);
    
    const [imageFile, setImageFile] = useState(null);

    const [imageFileUrl, setImageFileUrl] = useState(null);

    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);

    const [imageFileUploadError, setImageFileUploadError] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const filePicker = useRef();

    const [formData, setFormData] = useState({});

    const dispatch = useDispatch();



    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if(file){
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file))
        }

    };

    useEffect(()=>{
        if(imageFile){
            uploadImage();
        }
    }, [imageFile]);

    {/*IMAGE UPLOAD FUNCTIONALITY TO FIREBASE WHICH TAKES EFFECT WITH THE USE EFFECT HOOK ABOVE*/}

        {/*RULES FROM FIREBASE 
        allow read;
        allow write: if
        request.resource.size * 2 * 1024 * 1024 
        && request.resource.contentType.matches('image/.*')
        */}


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
                setImageFileUploadProgress(progress.toFixed(0));
            }, 


            //HANDLED THE IMAGE UPLOAD ERROR TO FIREBASE WITH A SWITCH CASE
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
                    setFormData({...formData, profilePicture: downloadURL})
                })
            }
        )
    };


    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }



    const handleSubmit = async (e) => {

        e.preventDefault();

        const changesMade = Object.keys(formData).some((key) => formData[key]);

        if(!changesMade){
            toast.error('No changes made');
            return;
        }

        try{

            dispatch(updateStart());

            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),

            });

            const data = await res.json();

            if(!res.ok){
                dispatch(updateFailure(data.message));
                toast.error(data.message);
            }else{
                dispatch(updateSuccess(data));
                toast.success('Update successful!');
            }

        }catch(error){
            dispatch(updateFailure(error.message))
        }
    }


    // DELETE BUTTON FUNCTIONALITY

    const handleDeleteUser = async () => {
        
        setShowModal(false);

        try{
            
            dispatch(deleteUserStart());

            const res = await fetch(`/api/user/delete/${currentUser._id}`,{
                method: 'DELETE'
                }
            );

            const data =  await res.json();

            if(!res.ok){
                dispatch(deleteUserFailure(data.message))
            } else {
                dispatch(deleteUserSuccess(data));
            }

        } catch (error){
            dispatch(deleteUserFailure(error.message))
        }

    }


    // SIGN OUT USER FUNCTIONALITY

    const handleSignOut = async () => {

        try{

            const res = await fetch('/api/user/signout', {
                method: 'POST'
            })

            const data = await res.json();

            if(!res.ok){
                const errMsg = data.message || 'Signout failed. Please try again later';
                toast.error(errMsg);
            } else{
                dispatch(signoutUserSuccess());
                toast.success('Signed out successfully');
            }

        } catch(error){
            const errMsg = error.message || 'Signout failed. Please try again later';
            toast.error(errMsg);
        }
    };



    return (
        <div className='max-w-sm mx-auto p-3 w-full'>

            <h1 className='my-7 text-center font-semibold text-xl'>
                PROFILE
            </h1>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                <input hidden type='file' accept='image/*' onChange={handleImageChange} ref={filePicker}/>
                
                <div className='relative w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden' onClick={()=> filePicker.current.click()}>

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
                className='focus:outline-none rounded-lg'
                onChange={handleChange}/>

                <input type='email' id='email'
                placeholder='email'
                defaultValue={currentUser.email} 
                className='focus:outline-none rounded-lg'
                onChange={handleChange}/>

                <input type='password' id='password'
                placeholder='password' 
                className='focus:outline-none rounded-lg'
                onChange={handleChange}/>

                <button type='submit' className='update rounded-lg focus:outline-none'>
                    UPDATE
                </button>

                {
                    currentUser.isAdmin && (<Link to={'/create-post'}>
                    <button type='button' className='update rounded-lg focus:outline-none w-full'>
                        CREATE A POST
                    </button>
                    </Link>)
                }


            </form>

            <div className='text-red-500 flex justify-between mt-5'>
                <span onClick={()=> setShowModal(true) } className='cursor-pointer'>Delete</span>
                <span onClick={handleSignOut} className='cursor-pointer'>Sign Out</span>
            </div>


            {<ToastContainer/>}

            {/* MODAL FOR THE DELETE BUTTON */}
            <Modal 
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'>
                    <Modal.Header/>
                        
                    <Modal.Body>

                        <div className='text-center'>

                            <HiOutlineExclamationCircle className='h-12 w-14 text-slate-400 dark:text-gray-200 mt-4 mx-auto '/>

                            <h3 className='mb-5 text-lg text-slate-500 dark:text-gray-400'>Are you sure you want to delete your account?</h3>

                            <div className='flex justify-center gap-4'>
                                <Button color='failure' onClick={handleDeleteUser}>Yes I'm Sure</Button>

                                <Button onClick={()=> setShowModal(false)} color='gray'>No, Cancel</Button>
                            </div>

                        </div>

                    </Modal.Body>

                </Modal>

        </div>
    )
}

export default DashProfile
