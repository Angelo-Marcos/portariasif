import { Link, useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';
import { useUser } from "../context/UserContext"
import { HouseLine, List, MagnifyingGlassPlus, SignOut, UserCircleGear, UserCirclePlus, X } from "phosphor-react";
import { useState } from "react";
import Modal from "react-modal"
import { useGetUserAdminsQuery } from "../graphql/generated";


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

    const { data: dataUserAdmins } = useGetUserAdminsQuery()

    const [modalIsOpenSidebar, setIsOpenSidebar] = useState(false);

    const handleOpenModalSidebar = async () => {
        setIsOpenSidebar(true);
    };
    const handleCloseModalSidebar = () => {
        setIsOpenSidebar(false);
    };

    console.log(dataUserAdmins)


    return (
        <div className="flex-col w-full fixed border-b border-white shadow">
            <header className="flex w-0.5/3 h-24 py-2 items-center justify-center px-10 space-x-20 bg-green-700">
                <span
                    className="flex h-[32px] w-[32px] justify-center items-center mr-4 text-white cursor-pointer hover:bg-white hover:text-green-700 transition-colors disabled:opacity-50"
                    onClick={handleOpenModalSidebar}
                >
                    <List size={32} className="h-[32px] w-[32px]" />
                </span>
                <div className="flex w-2/3 justify-center items-center">
                    <img src="/src/assets/logo.svg" alt="Logo PortariasIF" className="h-20" />
                    <div className="flex flex-col h-full justify-center bg-green-700">
                        <strong className="uppercase font-bold text-3xl">PortariasIF</strong>
                        <strong className="font-light text-xl mt-[-4px]">Instituto Federal do Norte de Minas</strong>
                    </div>
                </div>

                <div className="flex flex-col mr-10 items-center w-0.5/3 justify-end">
                    <div className=" ">
                        <img src={props.picture} className="w-10 h-10 bg-white rounded-full" />
                    </div>
                    <span className="text-sm m-0">
                        Bem vindo(a) {props.given_name}!
                    </span>
                </div>

            </header>
            <div>

            </div>

            <Modal
                isOpen={modalIsOpenSidebar}
                onRequestClose={handleCloseModalSidebar}
                contentLabel="modal Sidebar"
                className="flex justify-start h-screen w-full rounded text-white text-base font-light "
            >

                <aside className="flex flex-col justify-between items-center w-64 h-screen text-white bg-green-700">
                    <div className="h-16 w-full text-2xl font-bold mb-6">
                        <span
                            onClick={handleCloseModalSidebar}
                            className="flex w-full justify-end"
                        >
                            <X size={32} className="h-8 w-8 m-4 text-white cursor-pointer hover:bg-white hover:text-green-700 transition-colors disabled:opacity-50" />
                        </span>
                        <img src="/src/assets/logo.svg" alt="Logo PortariasIF" className="h-20 w-full" />
                    </div>
                    <nav className="flex w-full flex-col items-center justify-end space-y-2">
                        <button

                            className="flex justify-center items-center m-0 space-x-3 w-full p-2 hover:bg-white hover:text-green-700">

                            <Link to={'/'} className="flex justify-center items-center m-0 space-x-3 w-full">
                                <HouseLine size={32} />
                                <span>Início</span>
                            </Link>
                        </button>
                        <button

                            className="flex justify-center items-center m-0 space-x-3 w-full p-2 hover:bg-white hover:text-green-700">

                            <Link to={'/register'} className="flex justify-center items-center m-0 space-x-3 w-full">
                                <UserCirclePlus size={32} />
                                <span>Cadastro</span>
                            </Link>
                        </button>
                        <button
                            className="flex justify-center items-center m-0 space-x-3 w-full p-2 hover:bg-white hover:text-green-700">

                            <Link to={'/search'} className="flex justify-center items-center m-0 space-x-3 w-full">
                                <MagnifyingGlassPlus size={32} />
                                <span>Pesquisar</span>
                            </Link>
                        </button>
                        {
                            dataUserAdmins?.userAdmins.some(
                                user =>
                                    user.email === props.email &&
                                    user.userAdminType === 'administrator'
                            ) && (
                                <>
                                    <button
                                        onClick={handleCloseModalSidebar}
                                        className="flex justify-center items-center m-0 space-x-3 w-full p-2 hover:bg-white hover:text-green-700">
                                        <UserCircleGear size={32} />
                                        <span>Gerenciar Usuários</span>
                                    </button>
                                </>
                            )
                        }

                    </nav>
                    <span
                        className="flex justify-end items-center m-0 w-full"
                        onClick={handleLogout}
                    >
                        <SignOut size={32} className="h-8 w-8 m-4 text-white cursor-pointer hover:bg-white hover:text-green-700 transition-colors disabled:opacity-50" />
                    </span>
                </aside>

            </Modal>
        </div>

    );
}