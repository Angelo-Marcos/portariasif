export function Form() {
    return (
        <form className="w-full max-w-7xl">
            <div className="flex flex-wrap justify-between">
                <div className="flex">
                    <label className="block tracking-wide font-light text-gray-500 text-xl">
                        Número:
                    </label>
                    <input className="appearance-none block w-[120px] h-[30px] ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md" />
                </div>
                <div className="flex">
                    <label className="block tracking-wide font-light text-gray-500 text-xl">
                        Data de início da vigência:
                    </label>
                    <input className="appearance-none block w-[140px] h-[30px] ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md" />
                </div>
                <div className="flex">
                    <label className="block tracking-wide font-light text-gray-500 text-xl">
                        Tipo:
                    </label>
                    <input className="appearance-none block w-[194px] h-[30px] ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md" />
                </div>
            </div>
            <div className="flex flex-wrap mt-[28px]">
                <div className="flex ">
                    <label className="block tracking-wide font-light text-gray-500 text-xl">
                        Data de encerramento da vigência:
                    </label>
                    <input className="appearance-none block w-[140px] h-[30px] ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md" />
                </div>
                <div className="flex ml-[45px]">
                    <label className="block tracking-wide font-light text-gray-500 text-xl">
                        Assunto:
                    </label>
                    <input className="appearance-none block w-[300px] h-[30px] ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md" />
                </div>
            </div>
            <div className="flex flex-wrap mt-[28px]">
                <div className="flex">
                    <label className="block tracking-wide font-light text-gray-500 text-xl">
                        Servidor:
                    </label>
                    <input className="appearance-none block w-[320px] h-[30px] ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md" />
                </div>
                <div className="flex ml-[89px]">
                    <label className="block tracking-wide font-light text-gray-500 text-xl">
                        Função:
                    </label>
                    <input className="appearance-none block w-[216px] h-[30px] ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md" />
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="flex justify-center items-center w-[140px] h-[50px] mt-14 leading-none bg-green-300 rounded font-medium text-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                    Cadastrar Portaria
                </button>
            </div>



        </form>
    )
}