import {useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComment from '../components/DashComment';
import DashboardComp from '../components/DashboardComp';



const Dashboard = () => {

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
    <div className='min-h-screen flex flex-col md:flex-row'>

        <div className='md:w-56'>
            <DashSidebar/>
        </div>

            {/* profile */}
            {tab === 'profile' && <DashProfile/>}

            {/* posts */}
            {tab === 'posts' && <DashPosts/>}

            {/* users */}
            {tab === 'users' && <DashUsers/>}

            {/* comments */}
            {tab === 'comments' && <DashComment/>}

            {/* dashboard Overview*/}
            {tab === 'overview' && <DashboardComp/>}

    </div>
    )
}

export default Dashboard
