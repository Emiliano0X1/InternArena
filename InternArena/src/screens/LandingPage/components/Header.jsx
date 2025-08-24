import joeswag from '../../../assets/joeswag.png';

function Header() {
    return(
        <div className="h-fit w-full flex items-center justify-between px-8 py-4 sticky top-0 z-50 bg-[#282424] text-white">
            {/*div para el logo y el intern arena*/}
            <div className="flex justify-between">
                <img src={joeswag} alt="Intern Arena Logo" className='h-16 w-16'/>
                <h1 className='text-5xl'>Leet Arena</h1>
            </div>

            {/*div para los botones y el perfil*/}
            <div className='flex justify-between'>
                {/*Boton para crear salas / lobbies*/} 
                <button className='text-2xl h-fit w-fit 
                flex items-center justify-center whitespace-nowrap 
                mr-4 rounded-sm border p-1'>
                    Create Lobby
                </button>

                {/*Boton para tienda???? */}
                <button className='text-2xl h-fit w-fit 
                flex items-center justify-center whitespace-nowrap 
                mr-4 rounded-sm border p-1'>
                    Shop
                </button>
                
                {/*Boton para ver perfil */}
                <button className='text-2xl h-fit w-fit 
                flex items-center justify-center whitespace-nowrap 
                mr-4 rounded-sm border p-1'>
                    <img src={joeswag} alt="Profile picture" className='h-8 w-8'/>
                    <p>Flavio Gonsales</p>
                </button>
            </div>
        </div>
    )
}

export default Header