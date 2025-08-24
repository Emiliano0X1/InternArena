import { FaCheckCircle } from "react-icons/fa";

function LeetcodeProblem() {
    return(

        <div className="h-fit w-fit text-white m-4">
            <div className="flex items-center my-5">
                <p>Problem Name</p>
                <div className="rounded-4xl bg-green-400 px-2 mx-2 w-fit ">
                    <p>Easy</p>
                </div>
                <FaCheckCircle color="green" className="ml-2"/>
            </div>

            {/*Quitar los que estan debajo del original para poder reutilizar
            Los de abajo son ejemplos de como se verian condificultad medium y hard
            */}

            <div className="flex items-center my-5">
                <p>Problem Name</p>
                <div className="rounded-4xl bg-orange-400 px-2 mx-2 w-fit">
                    <p>Medium</p>
                </div>
            </div>
            
            <div className="flex items-center my-5">
                <p>Problem Name</p>
                <div className="rounded-4xl bg-red-400 px-2 mx-2 w-fit">
                    <p>Hard</p>
                </div>
            </div>

        </div>
    )
}

export default LeetcodeProblem