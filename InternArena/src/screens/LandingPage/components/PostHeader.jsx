import joeswag from '../../../assets/joeswag.png';

function PostHeader(){
    return(
        <div className="w-fit h-fit text-white m-4">
            <div className='flex'>
                <img src={joeswag} alt="Profile picture" className='h-8 w-8'/>
                <p>Flavio Gonsales</p>
            </div>
            <div>
                <p>2 hours ago</p>
            </div>
        </div>
    )
}

export default PostHeader