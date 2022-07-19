export function Login() {
    return (
        <div className="flex min-h-screen justify-center items-center">
            <main className="w-[457px] h-[468px] bg-gray-100 rounded-lg">
                <div className="w-[445px] h-[5px] m-auto mt-[10px] bg-green-500"></div>
                <div className="px-[42px]">
                    <header className="flex justify-between pt-[14px]">
                        <div className="w-[170px] h-[176px] bg-green-300"></div>
                        <div className="w-[170px] h-[176px] bg-green-300"></div>
                    </header>

                    <form className="flex flex-col gap-4 w-full mt-6">
                        <input
                            className="bg-gray-300 font-semibold text-base text-black rounded px-5 h-9"
                            type="text"
                            placeholder="Usuário"
                        />
                        <input
                            className="bg-gray-300 font-semibold text-base text-black rounded px-5 h-9"
                            type="password"
                            placeholder="Senha"
                        />

                        <label className="flex font-semibold text-base text-black items-center mt-4" >
                            <input type="checkbox" className="w-[32px] h-[32px] mr-2" />
                            Permanecer conectado

                        </label>

                        <div className="flex items-center justify-between">
                            <a href="#" className="font-ligth text-sm text-black">Alterar senha</a>

                            <button
                                type="submit"
                                className="w-[121px] h-[38px] mt-2 bg-green-500 rounded font-medium text-base hover:bg-green-700 transition-colors disabled:opacity-50"

                            >
                                Acessar
                            </button>
                        </div>


                    </form>
                </div>


            </main>
        </div>
    );
}