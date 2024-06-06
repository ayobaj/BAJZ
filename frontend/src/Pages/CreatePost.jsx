import {Button, FileInput} from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';




const CreatePost = () => {
    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            
            <h1 className="text-center font-semibold text-3xl my-7">CREATE A POST</h1>

            <form className="flex flex-col gap-4">

                <div className="flex flex-col sm:flex-row justify-between gap-4">

                    <input type='text' placeholder='Title' required id='title' className='flex-1 rounded-lg'/>
                    
                    <select className='rounded-lg'>
                        <option value='uncategorized'>Select a category</option>
                        <option value='technology'>Technology</option>
                        <option value='fashion'>Fashion</option>
                        <option value='entertainment'>Entertainment</option>
                    </select>

                </div>

                <div className="flex gap-4 items-center justify-between border-4 rounded-lg border-indigo-400 border-solid p-3">

                    <FileInput type='file' accept='image/*'/>

                    <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>Upload Image</Button>

                </div>

                <ReactQuill required  theme='snow' placeholder='Write Something....' className='h-72 mb-12 '/>

                <Button type='submit' gradientDuoTone='purpleToBlue' className='my-4'>PUBLISH</Button>

            </form>

        </div>
    )
}

export default CreatePost
