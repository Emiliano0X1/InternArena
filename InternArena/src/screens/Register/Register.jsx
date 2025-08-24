import register from '../../assets/register.png'
import { useNavigate } from 'react-router-dom'

function Register() {

    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 w-full h-full bg-[#282424] overflow-y-auto text-xl text-white">
            
            {/* Contenedor principal lado a lado */}
            <div className="flex min-h-screen">
                
                {/* Imagen rellena el lado izquierdo */}
                <div className="w-1/2 h-screen">
                    <img 
                        src={register} 
                        alt="Login Image" 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Espacio restante con login centrado */}
                <div className="w-1/2 flex items-center justify-center">
                    {/* Login box */}
                    <div className="bg-[#383434] p-8 rounded-2xl max-w-md w-full">
                        <h1 className="text-6xl py-5 text-center">
                            Register
                        </h1>

                        <p className="py-5 text-center">
                            Put in an email which hasnt been synced to an existing account
                        </p>

                        <label className='px-4'>
                            Email:
                            <input 
                            type="text" 
                            placeholder="examplemail@domain.com" 
                            className="w-full p-4 rounded-md text-white"
                        />
                        </label>

                        <label className='px-4'>
                            Password:
                            <input 
                            type="password" 
                            placeholder="example123" 
                            className="w-full p-4 rounded-md text-white"
                        />
                        </label>

                        <label className='px-4'>
                            Confirm Password
                            <input 
                            type="password" 
                            placeholder="example123" 
                            className="w-full p-4 rounded-md text-white"
                        />
                        </label>

                        <div className="flex flex-col items-center gap-4 mt-6">
                            <button 
                                className="rounded-xl bg-orange-500 px-8 py-4 
                                hover:bg-orange-400 transition-colors duration-200"
                                onClick={() => navigate('/')}
                            >
                                Register
                            </button>

                            <button 
                                className="rounded-xl bg-gray-600 px-8 py-4 
                                hover:bg-gray-500 transition-colors duration-200"
                                onClick={() => navigate('/')}
                            >
                                Return
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Register
