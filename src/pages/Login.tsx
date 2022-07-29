export function Login() {
    return (
        <div className="flex min-h-screen justify-center items-center">
            <main className="w-[457px] h-[468px] bg-gray-100 rounded-lg">
                <div className="w-[445px] h-[5px] m-auto mt-[10px] bg-green-500"></div>
                <div className="px-[42px]">
                    <header className="flex justify-between pt-[14px]">
                        <img src="/src/assets/logo_ifnmg_salinas.png" alt="Logo IFNMG" className="w-[170px] h-[176px]" />
                        <img src="/src/assets/logo.svg" alt="Logo PortariasIF" className="w-[170px] h-[176px]" />
                    </header>

                    <form className="flex flex-col gap-4 w-full mt-6">
                        <input
                            className="bg-gray-300 font-light text-base text-black rounded px-2 h-9"
                            type="text"
                            placeholder="Usuário"
                        />
                        <input
                            className="bg-gray-300 font-light text-base text-black rounded px-2 h-9"
                            type="password"
                            placeholder="Senha"
                        />

                        <button
                            type="submit"
                            className="h-[38px] mt-2 bg-green-500 rounded font-medium text-base hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            Acessar
                        </button>



                    </form>
                </div>


            </main>
        </div>
    );
}