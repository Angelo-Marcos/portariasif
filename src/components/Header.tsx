import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"
import { ArrowCounterClockwise, FilePlus, HouseLine, List, MagnifyingGlassPlus, SignOut, Trash, UserCircleGear, X } from "phosphor-react";
import { useState } from "react";
import Modal from "react-modal"
import {
    useCreateUserAdminMutation,
    useDeleteUserAdminMutation,
    useGetUserAdminLazyQuery,
    useGetUserAdminsQuery,
    UserAdminType,
    useUpdateUserAdminMutation
} from "../graphql/generated";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Logo from '../assets/logo.svg'


interface UserProps {
    name: string,
    given_name: string,
    email: string,
    picture: string
}

interface IFormInputUser {
    email: string,
    userType: UserAdminType
}

const validationsForm = yup.object({
    email: yup.string().required("Campo obrigatório!"),
    userType: yup.string().required("Campo obrigatório!"),
}).required();

export function Header(props: UserProps) {
    const { logout } = useUser();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const { register: registerUser, handleSubmit: handleSubmitUser, getValues: getValuesUser, formState: { errors: errorsUser }, reset } = useForm<IFormInputUser>({
        resolver: yupResolver(validationsForm)
    });

    const { data: dataUserAdmins } = useGetUserAdminsQuery()

    const [modalIsOpenSidebar, setIsOpenSidebar] = useState(false);

    const [modalIsOpenManageUser, setIsOpenManageUser] = useState(false)

    const [activeTab, setActiveTab] = useState<"insert" | "update" | "delete" | "updating" | null>(null)

    const [deleteUser, setDeleteUser] = useState('')
    const [emailUser, setEmailUser] = useState('')
    const [userType, setUserType] = useState<UserAdminType>()

    const [loadAdmin, { data: dataUserAdmin }] = useGetUserAdminLazyQuery()

    const [createUserAdmin, { loading: loadingCreateUserAdmin, data: dataCreateUserAdmin }] = useCreateUserAdminMutation();
    const [deleteUserAdmin, { loading: loadingDeleteUserAdmin }] = useDeleteUserAdminMutation();
    const [updateUserAdmin, { loading: loadingUpdateUserAdmin }] = useUpdateUserAdminMutation();

    const onSubmitUser = async (data: IFormInputUser) => {
        await createUserAdmin({
            variables: {
                email: data.email,
                userType: data.userType
            }
        })

        notify("createUser")
        reset()
    }

    const handleOpenModalSidebar = async () => {
        setIsOpenSidebar(true);
    };

    const handleCloseModalSidebar = () => {
        setIsOpenSidebar(false);
    };

    const handleOpenModalManageUser = async () => {
        setIsOpenManageUser(true);
    };

    const handleCloseModalManageUser = () => {
        setIsOpenManageUser(false);
        setActiveTab(null)
        setDeleteUser('')
        setEmailUser('')
    };

    const handleUpdateUserAdmin = async (email: string) => {
        await updateUserAdmin({
            variables: {
                email: email,
                emailUpdate: emailUser === "" ? email : emailUser,
                userType: !userType ? dataUserAdmin?.userAdmin?.userAdminType as UserAdminType : userType as UserAdminType
            }
        })

        handleCloseModalManageUser()
        handleCloseModalSidebar()
        notify('updatedUser')
        reload()
    }

    const handleDeleteUser = async (idUser: string) => {
        await deleteUserAdmin({
            variables: {
                id: idUser
            }
        })

        handleCloseModalManageUser()
        handleCloseModalSidebar()
        notify("deletedUser")
        reload()
    }

    const notifyDeleteUser = (numberDelete: string, email: string) => {

        toast.warn(
            <div className="flex flex-col justify-between items-center">
                <span className="flex w-full mb-2 justify-center font-light text-lg text-center text-black">
                    Tem certeza que deseja excluir o usuário {email}?
                </span>
                <div className="flex flex-row justify-center items-center text-base text-white">
                    <button

                        onClick={() => handleDeleteUser(numberDelete)}
                        className="flex justify-center items-center w-[100px] h-[35px] mx-3 leading-none bg-green-700 rounded font-medium text-base hover:text-green-700 hover:bg-white hover:border hover:border-green-700 transition-colors disabled:opacity-50"
                    >
                        Confirmar
                    </button>
                </div>

            </div>,
            {
                autoClose: false,
                position: "top-center",
                closeOnClick: true,
                icon: false
            }
        )

        handleCloseModalManageUser()
        handleCloseModalSidebar()
    }

    const notify = (notify: string) => {
        if (notify === "updated")
            toast.success("Portaria atualizada com sucesso!", {
                autoClose: 3000
            }
            )
        else if (notify === "error")
            toast.error("Falha ao atualizar Portaria", {
                autoClose: 5000
            }
            )
        else if (notify === "deletedOrdinance")
            toast.success("Portaria excluída com sucesso!", {
                autoClose: 5000
            }
            )
        else if (notify === "deletedMember")
            toast.success("Membro excluído com sucesso!", {
                autoClose: 5000
            }
            )
        else if (notify === "loadingSearch")
            toast.promise(
                new Promise(resolve => setTimeout(resolve, 3000)), {
                pending: "Carregando...",
                success: "Busca concluída! 👌",
                error: "Algo deu errado! 🤯"
            }
            )
        else if (notify === "loadingUpadate")
            toast.promise(
                new Promise(resolve => setTimeout(resolve, 3000)), {
                pending: "Carregando...",
                error: "Algo deu errado! 🤯"
            }
            )
        else if (notify === "nameInvalid")
            toast.warning("Nome inválido! 🤯", {
                autoClose: false,
                position: "top-center",
                closeOnClick: true,
            }
            )
        else if (notify === "deletedUser")
            toast.success("Usuário excluído com sucesso!", {
                autoClose: 5000
            }
            )
        else if (notify === "createUser")
            toast.success("Usuário cadastrado com sucesso!", {
                autoClose: 5000
            }
            )
        else if (notify === "updatedUser")
            toast.success("Usuário atualizado com sucesso!", {
                autoClose: 3000
            }
            )
    }

    const reload = () => {
        setTimeout(() => {
            window.location.reload();
        }, 5000)
    }

    return (
        <div className="flex-col w-full fixed border-b border-white shadow">
            <ToastContainer />
            <header className="flex  h-24 py-2 items-center justify-center px-10 space-x-20 bg-green-700">
                <div className="w-0.5/3">
                    <span
                        className="flex h-[32px] w-[32px] justify-center items-center mr-4 text-white cursor-pointer hover:bg-white hover:text-green-700 transition-colors disabled:opacity-50"
                        onClick={handleOpenModalSidebar}
                    >
                        <List size={32} className="h-[32px] w-[32px]" />
                    </span>
                </div>

                <div className="flex w-2/3 justify-center items-center">
                    <img src={Logo} alt="Logo PortariasIF" className="h-20" />
                    <div className="flex flex-col h-full justify-center bg-green-700">
                        <strong className="uppercase font-bold text-3xl">PortariasIF</strong>
                        <strong className="font-light text-xl mt-[-4px]">Instituto Federal do Norte de Minas</strong>
                    </div>
                </div>

                <div className="flex flex-col mr-10 items-center w-0.5/3 justify-end">
                    <div className=" ">
                        <img src={props.picture} className="w-10 h-10 bg-white rounded-full" />
                    </div>
                    <span className="flex flex-col items-center text-sm m-0">
                        Bem vindo(a)
                        <p>{props.given_name}!</p>
                    </span>
                </div>

            </header>
            <div>

            </div>

            <Modal
                isOpen={modalIsOpenSidebar}
                onRequestClose={handleCloseModalSidebar}
                contentLabel="modal Sidebar"
                className="flex justify-start h-screen w-full z-50 rounded text-white text-base font-light "
            >

                <aside className="flex flex-col justify-between items-center w-64 h-screen text-white bg-green-700">
                    <div className="h-16 w-full text-2xl font-bold mb-6">
                        <span
                            onClick={handleCloseModalSidebar}
                            className="flex w-full justify-end"
                        >
                            <X size={32} className="h-8 w-8 m-4 text-white cursor-pointer hover:bg-white hover:text-green-700 transition-colors disabled:opacity-50" />
                        </span>
                        <img src={Logo} alt="Logo PortariasIF" className="h-20 w-full" />
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
                                <FilePlus size={32} />
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
                                        onClick={handleOpenModalManageUser}
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

            <Modal
                isOpen={modalIsOpenManageUser}
                onRequestClose={handleCloseModalManageUser}
                contentLabel="modal user"
                className="flex justify-end h-screen w-full z-50 rounded text-white text-base font-light "
            >

                <div className="flex flex-col w-full items-center p-4 bg-green-700">
                    <div className="flex w-full justify-end">
                        <button
                            onClick={handleCloseModalManageUser}
                            className="flex w-8 hover:bg-white hover:text-green-700 rounded-full"
                        >
                            <X size={32} />
                        </button>
                    </div>

                    <div className="flex text-2xl font-bold mb-9">
                        <img src="/src/assets/logo.svg" alt="Logo PortariasIF" className="h-[85px]" />
                    </div>
                    <div className="flex text-2xl font-bold mb-4">
                        <button
                            onClick={() => (setActiveTab("insert"))}
                            className="flex justify-center items-center w-28 h-[40px] ml-3 leading-none bg-white text-green-700 text-base font-medium rounded-3xl hover:bg-green-700 hover:text-white hover:border hover:border-white transition-colors disabled:opacity-50">
                            <UserCircleGear size={24} className="mr-1" />
                            Cadastrar
                        </button>

                        <button
                            onClick={() => (setActiveTab("update"))}
                            className="flex justify-center items-center w-28 h-[40px] ml-3 leading-none bg-white text-blue-700 text-base font-medium rounded-3xl hover:bg-blue-700 hover:text-white hover:border hover:border-white transition-colors disabled:opacity-50">
                            <ArrowCounterClockwise size={24} className="mr-1" />
                            Atualizar
                        </button>

                        <button
                            onClick={() => (setActiveTab("delete"))}
                            className="flex justify-center items-center w-28 h-[40px] ml-3 mx-auto leading-none bg-white text-red-700 text-base font-medium rounded-3xl hover:bg-red-700 hover:text-white hover:border hover:border-white transition-colors disabled:opacity-50">
                            <Trash size={24} className="mr-1" />
                            Excluir
                        </button>
                    </div>
                    {
                        activeTab === "insert" && (
                            <div
                                className="flex flex-col w-full justify-center items-center"
                            >
                                <span className="flex ml-[13px] mt-3 mb-3 font-normal text-xl text-white">
                                    Insira as informações do usuário!
                                </span>
                                <form
                                    onSubmit={handleSubmitUser(onSubmitUser)}
                                    className="flex flex-col w-[480px] h-[260px] justify-center items-center p-8 border bg-gray-400 border-white rounded-lg"
                                >
                                    <p className="text-red-800 text-sm">
                                        {errorsUser.email?.message}
                                    </p>
                                    <input
                                        {...registerUser("email")}
                                        placeholder="Digite um email institucional"
                                        className="appearance-none w-full h-[40px] px-4 mb-2 bg-white text-gray-500 text-lg font-light rounded-3xl outline-none border-none focus:outline-none focus:ring-1 focus:ring-green-500"

                                    />

                                    <p className="text-red-800 text-sm">
                                        {errorsUser.userType?.message}
                                    </p>
                                    <select
                                        {...registerUser("userType")}
                                        className="appearance-none w-full h-[40px] px-4 mb-6 bg-white text-gray-500 text-lg font-light rounded-3xl outline-none border-none focus:outline-none focus:ring-1 focus:ring-green-500"
                                    >
                                        <option value="" disabled className="text-zinc-500 text-lg font-light">Escolha o tipo do usuário</option>
                                        <option value="collaborator" className="text-gray-500 text-lg font-light">Colaborador</option>
                                        <option value="administrator" className="text-gray-500 text-lg font-light">Administrador</option>
                                    </select>


                                    <button
                                        type="submit"
                                        className="justify-center items-center w-[140px] h-[40px] ml-3 leading-none bg-green-700 text-white text-base font-medium rounded-3xl hover:bg-white hover:text-green-700 hover:border hover:border-green-700 transition-colors disabled:opacity-50"
                                    >
                                        Cadastrar
                                    </button>
                                </form>

                            </div>
                        )
                    }

                    {
                        activeTab === "update" && (
                            <div className="flex flex-col w-full items-center p-4 bg-green-700">
                                <div
                                    className="flex w-full justify-center"
                                >
                                    <input
                                        placeholder="Digite o email de um usuário"
                                        className="appearance-none w-[620px] h-[40px] px-4 ml-2 bg-gray-400 text-gray-500 text-lg font-light rounded-3xl outline-none border-none placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                        onChange={event => setDeleteUser(event.target.value)}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => loadAdmin({
                                            variables: {
                                                email: deleteUser
                                            }
                                        })}
                                        className="justify-center items-center w-[140px] h-[40px] ml-3 leading-none bg-blue-700 text-white text-base font-medium rounded-3xl hover:bg-white hover:text-blue-700 transition-colors disabled:opacity-50"
                                    >
                                        Pesquisar
                                    </button>
                                </div>

                                {
                                    dataUserAdmin?.userAdmin &&
                                    <div className="flex w-[620px] justify-between items-center p-2 mt-10 bg-gray-400 text-gray-500 sm:text-sm lg:text-base font-light rounded-full outline-none border-none">
                                        <div className="flex w-full  space-x-6 justify-center items-center bg-gray-400 text-gray-500 sm:text-sm lg:text-base font-light rounded-full outline-none border-none">
                                            <span className="flex flex-col justify-center items-center text-center pl-6">
                                                <p className="text-center font-medium text-sm text-black">Usuário</p>
                                                {dataUserAdmin?.userAdmin?.email}
                                            </span>
                                            <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                                <p className="text-center font-medium text-sm text-black">Tipo de usuário</p>
                                                {dataUserAdmin?.userAdmin?.userAdminType === "collaborator" ? "Colaborador" : "Administrador"}
                                            </span>

                                        </div>

                                        <div className="flex justify-center items-center text-center">
                                            <span
                                                className="flex justify-center items-center m-0 h-[40px] w-[40px] text-blue-700 rounded-full cursor-pointer hover:bg-blue-700 hover:text-white transition-colors disabled:opacity-50"
                                                onClick={() => setActiveTab("updating")}
                                            >
                                                <ArrowCounterClockwise size={32} />
                                            </span>
                                        </div>
                                    </div>
                                }

                            </div>
                        )
                    }

                    {
                        activeTab === "updating" && (
                            <div
                                className="flex flex-col w-full justify-center items-center"
                            >
                                <span className="flex ml-[13px] mt-3 mb-3 font-normal text-xl text-white">
                                    Atualize as informações do usuário!
                                </span>
                                <div
                                    className="flex flex-col w-[480px] h-[260px] justify-center items-center p-8 bg-gray-400 border border-white rounded-lg"
                                >
                                    <input
                                        value={dataUserAdmin?.userAdmin?.email}
                                        onChange={event => setEmailUser(event.target.value)}
                                        placeholder="Digite um email institucional"
                                        className="appearance-none w-full h-[40px] px-4 mb-2 bg-white text-gray-500 text-lg font-light rounded-3xl outline-none border-none focus:outline-none focus:ring-1 focus:ring-blue-700"

                                    />

                                    <select

                                        onChange={event => setUserType(event.target.value as UserAdminType)}
                                        className="appearance-none w-full h-[40px] px-4 mb-6 bg-white text-gray-500 text-lg font-light rounded-3xl outline-none border-none focus:outline-none focus:ring-1 focus:ring-blue-700"
                                    >
                                        <option value={dataUserAdmin?.userAdmin?.userAdminType} disabled selected className="text-zinc-500 text-lg font-light">{dataUserAdmin?.userAdmin?.userAdminType}</option>
                                        <option value="collaborator" className="text-gray-500 text-lg font-light">Colaborador</option>
                                        <option value="administrator" className="text-gray-500 text-lg font-light">Administrador</option>
                                    </select>

                                    <button
                                        onClick={() => handleUpdateUserAdmin(dataUserAdmin?.userAdmin?.email as string)}
                                        className="justify-center items-center w-[140px] h-[40px] ml-3 leading-none bg-blue-700 text-white text-base font-medium rounded-3xl hover:bg-white hover:text-blue-700 hover:border hover:border-blue-700 transition-colors disabled:opacity-50"
                                    >
                                        Atualizar
                                    </button>
                                </div>

                            </div>
                        )
                    }

                    {
                        activeTab === "delete" && (
                            <div className="flex flex-col w-full items-center p-4 bg-green-700">
                                <div
                                    className="flex w-full justify-center"
                                >
                                    <input
                                        placeholder="Digite o email de um usuário"
                                        className="appearance-none w-[620px] h-[40px] px-4 ml-2 bg-gray-400 text-gray-500 text-lg font-light rounded-3xl outline-none border-none placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-red-700"
                                        onChange={event => setDeleteUser(event.target.value)}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => loadAdmin({
                                            variables: {
                                                email: deleteUser
                                            }
                                        })}
                                        className="justify-center items-center w-[140px] h-[40px] ml-3 leading-none bg-red-700 text-white text-base font-medium rounded-3xl hover:bg-white hover:text-red-700 transition-colors disabled:opacity-50"
                                    >
                                        Pesquisar
                                    </button>
                                </div>

                                {

                                    deleteUser && dataUserAdmin?.userAdmin &&
                                    <div className="flex w-[620px] justify-between items-center p-2 mt-10 bg-gray-400 text-gray-500 sm:text-sm lg:text-base font-light rounded-full outline-none border-none">
                                        <div className="flex w-full  space-x-6 justify-center items-center bg-gray-400 text-gray-500 sm:text-sm lg:text-base font-light rounded-full outline-none border-none">
                                            <span className="flex flex-col justify-center items-center text-center pl-6">
                                                <p className="text-center font-medium text-sm text-black">Usuário</p>
                                                {dataUserAdmin?.userAdmin?.email}
                                            </span>
                                            <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                                <p className="text-center font-medium text-sm text-black">Tipo de usuário</p>
                                                {dataUserAdmin?.userAdmin?.userAdminType === "collaborator" ? "Colaborador" : "Administrador"}
                                            </span>

                                        </div>

                                        <div className="flex justify-center items-center text-center">
                                            <span
                                                className="flex justify-center items-center m-0 h-[40px] w-[40px] text-red-700 rounded-full cursor-pointer hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50"
                                                onClick={() => notifyDeleteUser(dataUserAdmin?.userAdmin?.id as string, dataUserAdmin?.userAdmin?.email as string)}
                                            >
                                                <Trash size={32} />
                                            </span>
                                        </div>
                                    </div>
                                }

                                {
                                    !deleteUser &&
                                    dataUserAdmins?.userAdmins.map(user => {
                                        return (
                                            <div key={user.id} className="flex w-[700px] justify-between items-center p-2 mt-10 bg-gray-400 text-gray-500 sm:text-sm lg:text-base font-light rounded-full outline-none border-none">
                                                <div className="flex w-full  space-x-6 justify-center items-center bg-gray-400 text-gray-500 sm:text-sm lg:text-base font-light rounded-full outline-none border-none">
                                                    <span className="flex flex-col justify-center items-center text-center pl-6">
                                                        <p className="text-center font-medium text-sm text-black">Usuário</p>
                                                        {user.email}
                                                    </span>
                                                    <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                                        <p className="text-center font-medium text-sm text-black">Tipo de usuário</p>
                                                        {user.userAdminType === "collaborator" ? "Colaborador" : "Administrador"}
                                                    </span>

                                                </div>

                                                <div className="flex justify-center items-center text-center">
                                                    <span
                                                        className="flex justify-center items-center m-0 h-[40px] w-[40px] text-red-700 rounded-full cursor-pointer hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50"
                                                        onClick={() => notifyDeleteUser(user.id as string, user.email as string)}
                                                    >
                                                        <Trash size={32} />
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        )
                    }




                </div>

            </Modal>
        </div>

    );
}