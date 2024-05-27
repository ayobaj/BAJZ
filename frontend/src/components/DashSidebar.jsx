import {Sidebar} from 'flowbite-react';
import {HiArrowSmRight, HiUser} from 'react-icons/hi';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';



const DashSidebar = () => {

    const location = useLocation();

    const [tab, setTab ] = useState('');

    useEffect(()=> {
        const urlParams = new URLSearchParams(location.search)

        const tabFromUrl = urlParams.get('tab')

        if(tabFromUrl){
            setTab(tabFromUrl);
        }
    },[location.search])

    return (
        <Sidebar className='w-full md:w-56'>
            
            <Sidebar.Items>

                
                <Sidebar.ItemGroup>

                
                    <Sidebar.Item as={Link}
                        to={'/dashboard?tab=profile'}
                        active={tab === 'profile'}
                        icon={HiUser} label={'user'} 
                        labelColor='dark' >
                        Profile
                    </Sidebar.Item>
                

                    <Sidebar.Item icon={HiArrowSmRight} className = 'cursor-pointer' >
                        Sign Out
                    </Sidebar.Item>

                </Sidebar.ItemGroup>

            </Sidebar.Items>

        </Sidebar>
    )
}

export default DashSidebar
