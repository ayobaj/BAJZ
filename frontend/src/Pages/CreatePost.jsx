import {Alert, Button, FileInput} from 'flowbite-react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate} from 'react-router-dom';





const CreatePost = () => {

    const [file, setFile] = useState(null);

    const [imageUploadProgress, setImageUploadProgress] = useState(null);

    const [imageUploadError, setImageUploadError] = useState(null);

    const [formData, setFormData] = useState({});

    const [publishError, setPublishError] = useState(null);

    const navigate = useNavigate();

    const handleUploadImage = async() => {
        try{
            setImageUploadError('Please select an image')
            if(!file){
                return;
            }
            
            setImageUploadError(null);
            const storage = getStorage(app)
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
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
                        errorMessage = 'Image Upload Failed';
                        break;
                }
                    setImageUploadError(errorMessage);
                    setImageUploadProgress(null);
                },

                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({...formData, image:downloadURL});
                    });
                }
            );

        }catch(error){
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
        }
    }



    const handleSubmit = async (e) => {

        e.preventDefault();

        try{

            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if(data.success === false){
                setPublishError('Please check your fields and try again');
                return
            }

            if(res.ok){
                setPublishError(null)
                setFormData(null)
                navigate(`/post/${data.slug}`)
            }



        }catch(error){
            setPublishError('something went wrong');
        }
    };


    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            
            <h1 className="text-center font-semibold text-3xl my-7">CREATE A POST</h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                <div className="flex flex-col sm:flex-row justify-between gap-4">

                    <input type='text' placeholder='Title' required id='title' className='flex-1 rounded-lg' onChange={(e) => setFormData({...formData, title: e.target.value})}/>
                    
                    <select className='rounded-lg' onChange={(e) => setFormData({...formData, category: e.target.value })}>
                        <option value='uncategorized'>Select a category</option>
                        <option value='technology'>Technology</option>
                        <option value='fashion'>Fashion</option>
                        <option value='entertainment'>Entertainment</option>
                    </select>

                </div>

                <div className="flex gap-4 items-center justify-between border-4 rounded-lg border-indigo-400 border-solid p-3">

                    <FileInput type='file' accept='image/*' onChange={(e)=> setFile(e.target.files[0])}/>

                    <Button disabled={imageUploadProgress} type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleUploadImage}>
                        {
                            imageUploadProgress ? (
                                <div className='w-16 h-16'>
                                    <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`}/>
                                </div>
                            ) : (
                                'Upload Image'
                            )
                        }
                    </Button>

                </div>

                {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
                    
                    {formData.image && (
                        <img 
                            src={formData.image}
                            alt='upload'
                            className='w-full h-[500px] object-cover'
                        />
                    )}

                <ReactQuill onChange={(value) => {setFormData({...formData, content: value})} } required  theme='snow' placeholder='Write Something....' className='h-72 mb-12 '/>

                <Button type='submit' gradientDuoTone='purpleToBlue' className='my-4'>PUBLISH</Button>

                {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}

            </form>

        </div>
    )
}

export default CreatePost
