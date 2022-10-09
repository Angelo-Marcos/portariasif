import { Header } from "../components/Header";

export function Search() {
    return (
        
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-col items-center justify-center px-48">
                <span className="flex w-full mt-6 mb-7 font-medium justify-center text-xl text-red-900 border-b border-green-300">
                    Preencha os campos abaixo
                </span>
                <form className="w-full max-w-7xl">
                    <div className="justify-start">
                        <div className="flex">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Número:
                            </label>
                            <input className="appearance-none block w-[120px] h-[30px] px-2 ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div className="flex mt-4">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Data de início da vigência:
                            </label>
                            <input type="date" className="appearance-none block w-[170px] h-[30px] px-2 ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500" placeholder=" " />
                        </div>
                        <div className="flex mt-4">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Tipo:
                            </label>
                            <select className="appearance-none block w-[194px] h-[30px] px-2 ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500">
                                <option value="" className="text-gray-500 text-xl font-light"></option>
                                <option value="progression" className="text-gray-500 text-xl font-light">Progressão</option>
                                <option value="designation" className="text-gray-500 text-xl font-light">Designação</option>

                            </select>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex mt-4 ">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Data de encerramento da vigência:
                            </label>
                            <input type="date" className="appearance-none block w-[170px] h-[30px] px-2 ml-4 border-green-500 border-spacing-1 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div className="flex mt-4">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Assunto:
                            </label>
                            <input className="appearance-none block w-[300px] h-[30px] px-2 ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Membro:
                            </label>
                            <input className="appearance-none block w-[320px] h-[30px] px-2 ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div className="flex mt-4">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Função:
                            </label>
                            <select className="appearance-none block w-[216px] h-[30px] px-2 ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500">
                                <option value="" className="text-gray-500 text-xl font-light"></option>
                                <option value="teacher" className="text-gray-500 text-xl font-light">Docente</option>
                                <option value="TAE" className="text-gray-500 text-xl font-light">TAES</option>
                                <option value="student" className="text-gray-500 text-xl font-light">Discente</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end mb-4">
                        <button
                            type="submit"
                            className="flex justify-center items-center w-[140px] h-[50px] mt-14 leading-none bg-green-300 rounded font-medium text-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            Pesquisar
                        </button>
                    </div>



                </form>
            </div>

        </div>
    );
}