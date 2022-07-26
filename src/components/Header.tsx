export function Header() {
    return (
        <div>
            <header className="w-full h-[159px] flex flex-col justify-center px-48 bg-green-500">
                <strong className="uppercase font-bold text-5xl">Portarias</strong>
                <strong className="font-light text-2xl mt-[-4px]">Instituto Federal do Norte de Minas</strong>



            </header>

            <nav className="flex h-[33px] justify-center items-center px-48 bg-green-300">
                <ul className="flex justify-center flex-col lg:flex-row list-none lg:ml-auto">
                    <li className="nav-item">
                        <a href="#" className="pr-4 flex items-center font-medium text-xl leading-relaxed hover:opacity-75">Home</a>
                    </li>

                    <li className="nav-item">
                        <a href="#" className="px-4 flex items-center font-medium text-xl leading-relaxed border-x border-gray-500 hover:opacity-75">Cadastro</a>
                    </li >

                    <li className="nav-item">
                        <a href="#" className="pl-4 flex items-center font-medium text-xl leading-relaxed hover:opacity-75">Busca</a>
                    </li>
                </ul>
            </nav>
        </div>

    );
}