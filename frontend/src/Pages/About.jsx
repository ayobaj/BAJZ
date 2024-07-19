import abtt from '../assets/abtt.jpg'
import ist from '../assets/ist.jpg'

const About = () => {
return (
    <div className='bg-white'>
        <h1 className="text-reveal h-[300px] text-white font-bold md:text-4xl text-2xl  md:p-[70px] p-[80px] mx-auto " style={{ backgroundImage: `url(${abtt})`, backgroundSize: 'cover', backgroundPosition: 'center', }}></h1>

            <div className=' border-indigo-200 '>
                <h1 className='text-center bg-indigo-300 animate-text-left-to-right border-indigo-200 sm:w-[500px] mt-8 text-2xl mx-auto'>Our fundamental identity revolves around continual growth, 
                    <br/>flexibility, and promoting good content.</h1>


                    <p className='p-1 pt-5 md:p-6 text-reveal'>Providing insightful content to bajzers, and potential bajzer to move the blog forward.
                        Our enduring dedication to conducting business ethically and fostering a cooperative 
                        approach has yielded sustained prosperity, enabling us to provide outstanding benefits to our clients and potential on a wide scale.</p>
            </div>

            <div className='mt-5 lg:flex-row-reverse lg:flex space-y-7 p-3 text-reveal'>
                <img src={ist} className=' mx-auto h-[290px] '/>
                <div>
                <h1 className='p-3 sm:w-[300px] mx-auto text-2xl text-center font-bold border-indigo-200  bg-indigo-300'>Our Values</h1>
                <p className='p-1 md:p-6' ><span className='font-bold'>Storytelling</span> Sharing a compelling brand story engages readers emotionally, fostering a deeper connection and establishing trust
                    <span className='font-bold'> Customer-Centric-Approach</span>  Demonstrating a customer-centric approach by focusing on how your brand serves its audience builds trust and credibility.
                    <span className='font-bold'> Social Proof</span> Highlighting testimonials, reviews, and case studies gives helpful social proof of your brand’s credibility and reliability.
                    </p>
                </div>
            </div>
    </div>

    
    )
}

export default About
