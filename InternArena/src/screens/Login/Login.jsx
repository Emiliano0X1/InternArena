import login from '../../assets/login.png'
import { useNavigate } from 'react-router-dom'

function Login() {

    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 w-full h-full bg-[#282424] overflow-y-auto text-xl text-white">
            
            {/* Contenedor principal lado a lado */}
            <div className="flex min-h-screen">
                
                {/* Imagen rellena el lado izquierdo */}
                <div className="w-1/2 h-screen">
                    <img 
                        src={login} 
                        alt="Login Image" 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Espacio restante con login centrado */}
                <div className="w-1/2 flex items-center justify-center">
                    {/* Login box */}
                    <div className="bg-[#383434] p-8 rounded-2xl max-w-md w-full">
                        <h1 className="text-6xl py-5 text-center">
                            Log In
                        </h1>

                        <p className="py-5 text-center">
                            Put in the e-mail adress you have your account synced with
                        </p>

                        <input 
                            type="text" 
                            placeholder="examplemail@domain.com" 
                            className="w-full p-4 rounded-md text-white"
                        />

                        <div className="flex flex-col items-center gap-4 mt-6">
                            <button 
                                className="rounded-xl bg-orange-500 px-8 py-4 
                                hover:bg-orange-400 transition-colors duration-200"
                                onClick={() => navigate('/')}
                            >
                                Log In
                            </button>

                            <button 
                                className="rounded-xl bg-orange-500 px-8 py-4 
                                hover:bg-orange-400 transition-colors duration-200"
                                onClick={() => navigate('/register')}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Login
