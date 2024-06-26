import { useEffect, useState } from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import PostCard from '../components/PostCard';
import Skeleton from "../components/Skeleton";


const Search = () => {

    const [sideBarData, setSideBarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
    });

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();


    
    

    useEffect(()=> {

        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm') || '';
        const sortFromUrl = urlParams.get('sort') || '';
        const categoryFromUrl = urlParams.get('category') || '';

        if(searchTermFromUrl || sortFromUrl || categoryFromUrl){

            setSideBarData({
                ...sideBarData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl
            })

        }

        const fetchPosts = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getposts?${searchQuery}`);

            if(!res.ok){
                setLoading(false);
                return;
            }

            if(res.ok){
                const data = await res.json();
                setPosts(data.posts);
                setLoading(false);

                if(data.posts.length === 9){
                    setShowMore(true);
                }else{
                    setShowMore(false);
                }
            }
        }
        fetchPosts();
    }, [location.search]);


    const handleChange = (e) => {
        if(e.target.id === 'searchTerm'){
            setSideBarData({...sideBarData, searchTerm: e.target.value})
        }
        if(e.target.id === 'sort'){
            const order = e.target.value || 'desc';
            setSideBarData({...sideBarData, sort: order})
        }
        if(e.target.id === 'category'){
            const category = e.target.value || 'uncategorized';
            setSideBarData({...sideBarData, category})
        }
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const urlParams = new URLSearchParams(location.search);

        urlParams.set('searchTerm', sideBarData.searchTerm);
        urlParams.set('sort', sideBarData.sort);
        urlParams.set('category', sideBarData.category);

        const searchQuery = urlParams.toString();

        navigate(`/search?${searchQuery}`);

    }

    const handleShowMore = async () => {
        const numberofPosts = posts.length;
        const startIndex = numberofPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`)

        if(!res.ok){
            return;
        }

        if(res.ok){
            const data = await res.json();
            setPosts([...posts, ...data.posts]);
            if(data.posts.length === 9){
                setShowMore(true);
            } else {
                setShowMore(false)
            }
        }
    }


return (
    <div className="flex flex-col md:flex-row mt-4">

        <div className="p-7 border-b md:border-r md:min-h-screen border-indigo-300">

            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>

                <div className="flex items-center gap-2">
                    <label className="whitespace-nowrap font-semibold">Search:</label>
                    <input placeholder="Search..."
                    id="searchTerm" type="text"
                    value={sideBarData.searchTerm}
                    onChange={handleChange} className="shadow-md"/>
                </div>

                <div className="gap-2 flex items-center">
                    <label className="font-semibold">Sort:</label>

                    <select onChange={handleChange} value={sideBarData.sort}
                    id="sort" className="rounded-sm focus:outline-none shadow-md">

                        <option className="" value='desc'>Latest</option>
                        <option className="" value='asc'>Oldest</option>
                        
                    </select>
                </div>

                <div className="gap-2 flex items-center">
                    <label className="font-semibold">Category:</label>

                    <select onChange={handleChange} value={sideBarData.category}
                    id="category" className="rounded-sm focus:outline-none shadow-md">

                        <option className="" value='uncategorized'>Uncategorized</option>
                        <option className="" value='technology'>Technology</option>
                        <option className="" value='entertainment'>Entertainment</option>
                        <option className="" value='fashion'>Fashion</option>

                    </select>
                </div>

                <button type="submit" className="btn">
                    Search
                </button>

            </form>

        </div>

        <div>
            <h1></h1>

            <div className="p-7 flex flex-wrap gap-2 justify-center">
                {!loading && posts.length === 0 && (
                    <p className="text-center text-xl text-slate-500">No Post Yet!</p>
                )}

                {loading && <Skeleton/>}

                {!loading && posts && posts.map((post)=> <PostCard key={post._id} post={post}/>)}

                {
                    showMore && <button onClick={handleShowMore} className="text-indigo-400 hover:underline p-7 w-full">
                        Show More
                    </button>
                }
            </div>
        </div>

    </div>
    )
}

export default Search
