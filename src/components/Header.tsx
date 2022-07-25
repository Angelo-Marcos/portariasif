export function Header() {
    return (
        <div>
            <header className="w-full h-[179px] flex flex-col justify-center px-16 bg-green-500">
                <strong className="uppercase font-bold text-[32px]">Portarias</strong>
                <strong className="font-bold text-[32px] mt-[-12px]">Instituto Federal do Norte de Minas</strong>



            </header>

            <nav className="flex w-full h-[52px] justify-center px-16 bg-green-300">
                <ul className="flex justify-center flex-col lg:flex-row list-none lg:ml-auto">
                    <li className="nav-item">
                        <a href="#" className="pl-16 flex items-center font-medium text-[32px] leading-snug hover:opacity-75">Home</a>
                    </li>

                    <li className="nav-item">
                        <a href="#" className="pl-16 flex items-center font-medium text-[32px] leading-snug hover:opacity-75">Cadastro</a>
                    </li >

                    <li className="nav-item">
                        <a href="#" className="pl-16 flex items-center font-medium text-[32px] leading-snug hover:opacity-75">Busca</a>
                    </li>
                </ul>
            </nav>
        </div>

    );
}