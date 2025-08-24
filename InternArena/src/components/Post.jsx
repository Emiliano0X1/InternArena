import PostHeader from "./PostHeader"
import postimage from '../assets/profilebanner.png'

function Post() {
    
    return(
        <div className="flex justify-center items-center mb-10">
            <div className="w-fit h-fit bg-[#383434] text-white p-4 rounded-xl">
                <PostHeader/>

                <p className="max-w-3xl m-4">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, corrupti sit. Ex, incidunt exercitationem accusantium a ipsa nulla labore officiis placeat quisquam, obcaecati ut! Dolorum impedit labore cupiditate illo eligendi.
                </p>

                <img src={postimage} alt="Post Image" className='w-fit h-fit mx-auto block'/>
            </div>
        </div>
    )
}

export default Post