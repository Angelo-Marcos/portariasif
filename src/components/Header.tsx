import { Link, useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';
import { useUser } from "../context/UserContext"
import { SignOut } from "phosphor-react";


interface UserProps {
    name: string,
    given_name: string,
    email: string,
    picture: string
}

export function Header(props: UserProps) {
    const { logout } = useUser();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redireciona para a página inicial
    };


    return (
        <div className="flex-col w-full fixed border-b border-white shadow">
            <header className="flex flex-1 w-full h-[100px] items-center justify-center px-48 bg-green-500">
                <img src="/src/assets/logo.svg" alt="Logo PortariasIF" className="h-[85px]" />
                <div className="w-full h-[100px] flex flex-col justify-center bg-green-500">
                    <strong className="uppercase font-bold text-5xl">Portarias</strong>
                    <strong className="font-light text-2xl mt-[-4px]">Instituto Federal do Norte de Minas</strong>
                </div>
                <div className="flex mr-36 justify-end items-center w-full">
                    <div className="w-10 h-10 rounded-full bg-white mr-2">
                        <img src={props.picture} className="rounded-full" />
                    </div>
                    <span>Bem vindo(a) {props.given_name}!</span>
                </div>

                <span
                    className="flex justify-center items-center m-0 -mr-36 h-[32px] w-[32px] text-white rounded-full cursor-pointer hover:bg-white hover:text-green-500 transition-colors disabled:opacity-50"
                    onClick={handleLogout}
                >
                    <SignOut size={32} />
                </span>


            </header>
            <div>

            </div>

            <nav className="flex h-[33px] justify-center items-center px-48 bg-green-300">
                <ul className="flex justify-center flex-col lg:flex-row list-none lg:ml-auto selection:">
                    <li className="nav-item">
                        <Link to={'/'} className="pr-4 flex items-center font-light text-xl leading-relaxed hover:opacity-75 focus-within:text-green-500">Início</Link>
                    </li>

                    <li className="nav-item">
                        <Link to={'/register'} className="px-4 flex items-center font-light text-xl leading-relaxed border-x border-gray-500 hover:opacity-75 focus-within:text-green-500">Cadastro</Link>
                        {/* <button onClick={}>Cadastro</button> */}
                    </li >

                    <li className="nav-item">
                        <Link to={'/search'} className="pl-4 flex items-center font-light text-xl leading-relaxed hover:opacity-75 focus-within:text-green-500">Busca</Link>
                    </li>
                </ul>
            </nav>
        </div>

    );
}