import { Header } from "../components/Header";
import InputMask from "react-input-mask"
import {
    MemberType,
    OrdinanceType,
    useCreateMemberMutation,
    useCreateOrdinanceMemberMutation,
    useCreateUserAdminMutation,
    useDeleteMemberMutation,
    useDeleteOrdinanceMemberMutation,
    useDeleteOrdinanceMutation,
    useDeleteUserAdminMutation,
    useGetMembersByNameLazyQuery,
    useGetOrdinanceByNumberLazyQuery,
    useGetOrdinanceByNumberQuery,
    useGetOrdinancesAllQuery,
    useGetOrdinancesByDateLazyQuery,
    useGetOrdinancesByDateQuery,
    useGetOrdinancesByMemberMatriculaLazyQuery,
    useGetOrdinancesByMemberMatriculaQuery,
    useGetOrdinancesByMemberNameLazyQuery,
    useGetOrdinancesByMemberNameQuery,
    useGetOrdinancesByMemberTypeLazyQuery,
    useGetOrdinancesByMemberTypeQuery,
    useGetOrdinancesByTypeLazyQuery,
    useGetOrdinancesByTypeQuery,
    useGetOrdinancesQuery,
    useUpdateMemberMutation,
    useUpdateMemberOrdinanceDisconnectMutation,
    useUpdateOrdinanceAdminMutation,
    useUpdateOrdinanceMemberMutation,
    useUpdateOrdinanceMutation
} from "../graphql/generated";
import { useForm } from "react-hook-form";
import { OrdinanceSearch } from "../components/OrdinanceSearch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "../context/UserContext"
import { ClockClockwise, MagnifyingGlass, PlusCircle, Trash, WarningCircle, XCircle } from "phosphor-react";
import { useState } from "react";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import Modal from "react-modal"
import { Member } from "../components/Member";

interface IFormInputSearch {
    number: string,
    effectiveStartDate: Date,
    effectiveEndDate: Date,
    ordinanceType: OrdinanceType,
    member: string,
    matricula: string,
    memberType: MemberType
}

interface OrdinanceProps {
    id: string,
    number: string,
    effectiveStartDate: Date,
    ordinanceType: OrdinanceType,
    effectiveEndDate: Date,
    subject: string
}

interface MemberProps {
    id: string;
    name: string;
    matriculaSiape: number;
    ordinanceMember: {
        id: string;
        memberId: string;
        workload: number;
        memberType: 'vicePresident' | 'president' | 'member';
    }
}

interface MemberAutoCompleteProps {
    id: string;
    name: string;
    matriculaSiape: number
}

interface MemberDisconnectProps {
    idMember: string;
    idMemberOrdinance: string;
}

interface WorkloadsProps {
    id: string;
    memberId: string;
    workload: number;
    memberType: 'vicePresident' | 'president' | 'member';
}

const validationsForm = yup.object({
    number: yup.string().test('oneOfRequired',
        'Pelo menos um campo deve ser preenchido!',
        function (item) {
            return (this.parent.number || this.parent.ordinanceType || this.parent.member || this.parent.matricula || this.parent.memberType || this.parent.effectiveStartDate)
        }),
    ordinanceType: yup.string().test('oneOfRequired',
        'Pelo menos um campo deve ser preenchido!',
        function (item) {
            return (this.parent.number || this.parent.ordinanceType || this.parent.member || this.parent.matricula || this.parent.memberType || this.parent.effectiveStartDate)
        }),
    member: yup.string().test('oneOfRequired',
        'Pelo menos um campo deve ser preenchido!',
        function (item) {
            return (this.parent.number || this.parent.ordinanceType || this.parent.member || this.parent.matricula || this.parent.memberType || this.parent.effectiveStartDate)
        }),
    matricula: yup.string().test('oneOfRequired',
        'Pelo menos um campo deve ser preenchido!',
        function (item) {
            return (this.parent.number || this.parent.ordinanceType || this.parent.member || this.parent.matricula || this.parent.memberType || this.parent.effectiveStartDate)
        }),
    memberType: yup.string().test('oneOfRequired',
        'Pelo menos um campo deve ser preenchido!',
        function (item) {
            return (this.parent.number || this.parent.ordinanceType || this.parent.member || this.parent.matricula || this.parent.memberType || this.parent.effectiveStartDate)
        }),
    effectiveStartDate: yup.date().test('oneOfRequired',
        'Pelo menos um campo deve ser preenchido!',
        function (item) {
            return (this.parent.number || this.parent.ordinanceType || this.parent.member || this.parent.matricula || this.parent.memberType || this.parent.effectiveStartDate)
        }
    )
});

export function Search() {

    const { user } = useUser();

    const [number, setNumber] = useState('');
    const [effectiveStartDate, setEffectiveStartDate] = useState('');
    const [ordinanceType, setOrdinanceType] = useState<OrdinanceType>(OrdinanceType.Designation);
    const [effectiveEndDate, setEffectiveEndDate] = useState('');
    const [subject, setSubject] = useState('');
    const [numberRevoked, setNumberRevoked] = useState('');

    const [name, setName] = useState('');
    const [memberType, setMemberType] = useState<MemberType>(MemberType.Member);
    const [matriculaSiape, setMatriculaSiape] = useState('');
    const [workload, setworkload] = useState('')
    const [radio, setRadio] = useState('');

    const [createUser, setCreateUser] = useState('')
    const [deleteUser, setDeleteUser] = useState('')


    const [members, setMembers] = useState<MemberProps[]>([]);
    const [workloads, setWorkloads] = useState<WorkloadsProps[]>([]);
    const [ordinances, setOrdinances] = useState<OrdinanceProps[]>([]);

    const [showSuggestions, setShowSuggestions] = useState(false);

    const [modalIsOpen, setIsOpen] = useState(false);

    const handleOpenModal = async () => {
        setIsOpen(true);
    };
    const handleCloseModal = () => {
        setIsOpen(false);
        setMembers([]);
    };

    const { register, handleSubmit: handleSubmitSearch, getValues, formState: { errors: errorsOrdinance, } } = useForm<IFormInputSearch>({
        resolver: yupResolver(validationsForm)
    });

    async function onSubmit(data: IFormInputSearch) {

    }

    const [createMember, { loading: loadingCreateMember, data: dataCreateMember }] = useCreateMemberMutation();
    const [createOrdinanceMember, { loading: loadingCreateOrdinanceMember, data: dataCreateOrdianceMember }] = useCreateOrdinanceMemberMutation();
    const [createUserAdmin, { loading: loadingCreateUserAdmin, data: dataCreateUserAdmin }] = useCreateUserAdminMutation();
    const [updateOrdinance, { loading: loadingOrdinanceUpdate }] = useUpdateOrdinanceMutation();
    const [updateMember] = useUpdateMemberMutation();
    const [updateOrdinanceMember, { loading: loadingOrdinanceMemberUpdate }] = useUpdateOrdinanceMemberMutation();
    const [updateOrdinanceAdmin, { loading: loadingUpdateOrdinanceAdmin }] = useUpdateOrdinanceAdminMutation();
    const [updateOrdinanceMemberDisconnect] = useUpdateMemberOrdinanceDisconnectMutation();
    const [deleteOrdinance, { loading: loadingDeleteOrdinance }] = useDeleteOrdinanceMutation();
    const [deleteMember, { loading: loadingDeleteMember }] = useDeleteMemberMutation();
    const [deleteUserAdmin, { loading: loadingDeleteUserAdmin }] = useDeleteUserAdminMutation();
    const [deleteOrdinanceMember, { loading: loadingDeleteOrdinanceMember }] = useDeleteOrdinanceMemberMutation();

    const [loadMembers, { data: dataMembersByName }] = useGetMembersByNameLazyQuery();

    const [loadOrdinancesByMemberMatricula, { data: dataOrdinancesByMemberMatriculaLazyQuery }] = useGetOrdinancesByMemberMatriculaLazyQuery();

    const handleSearch = () => {
        if (name.trim()) {
            loadMembers({ variables: { name } });
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const { data: dataOrdinanceByNumber } = useGetOrdinanceByNumberQuery({
        skip: !getValues('number'),
        variables: {
            number: getValues('number')
        }
    })

    const { data: dataOrdinancesByMemberMatricula } = useGetOrdinancesByMemberMatriculaQuery({
        skip: !getValues("matricula"),
        variables: {
            matriculaSiape: +getValues('matricula')
        }
    })

    const { data: dataOrdincesByMemberName } = useGetOrdinancesByMemberNameQuery({
        skip: !getValues('member'),
        variables: {
            name: getValues('member')
        }
    })

    const { data: dataOrdinancesByDate } = useGetOrdinancesByDateQuery({
        skip: !getValues("effectiveStartDate"),
        variables: {
            dateStart: getValues('effectiveStartDate'),
            dateEnd: getValues('effectiveEndDate')
        }
    })

    const { data: dataOrdinancesByType } = useGetOrdinancesByTypeQuery({
        skip: !getValues("ordinanceType"),
        variables: {
            ordinanceType: getValues('ordinanceType')
        }
    })

    const { data: dataOrdinancesByMemberType } = useGetOrdinancesByMemberTypeQuery({
        skip: !getValues("memberType"),
        variables: {
            memberType: getValues('memberType')
        },
        fetchPolicy: "network-only",
    })

    const handleDeleteOrdinance = async (numberDelete: string) => {
        await deleteOrdinance({
            variables: {
                number: numberDelete
            }
        }).then(
            deleteOrdinanceMember
        )

        // handleCloseModal();
        reload()
        notify("deletedOrdinance")
    }

    const handleDeleteMember = async (idMember: string) => {
        await deleteMember({
            variables: {
                id: idMember
            }
        })

        // handleCloseModal();
        reload()
        notify("deletedMember")
    }

    const handleCreateUser = async (email: string) => {
        await createUserAdmin({
            variables: {
                email: email
            }
        })

        notify("createUser")
        setCreateUser('')
    }

    const handleDeleteUser = async (idUser: string) => {
        await deleteUserAdmin({
            variables: {
                id: idUser
            }
        })

        notify("deletedUser")
        reload()
    }

    const handleClickAutoComplete = (member: MemberAutoCompleteProps) => {

        setName(member.name)
        setMatriculaSiape(String(member.matriculaSiape))
        loadOrdinancesByMemberMatricula({ variables: { matriculaSiape: member.matriculaSiape } })
        setShowSuggestions(false);
    }

    const handleClickSearch = (numberSearch: string) => {

        if (dataOrdinanceByNumber?.ordinance?.number != null) {

            setNumber(dataOrdinanceByNumber?.ordinance?.number as string)
            setEffectiveStartDate(dataOrdinanceByNumber?.ordinance?.effectiveStartDate)
            setOrdinanceType(dataOrdinanceByNumber?.ordinance?.ordinanceType as OrdinanceType)
            setEffectiveEndDate(dataOrdinanceByNumber?.ordinance?.effectiveEndDate)
            setSubject(dataOrdinanceByNumber?.ordinance?.subject as string)

            dataOrdinanceByNumber.ordinance?.members.map(member => {
                const dataMembers: MemberProps = {
                    id: member.id,
                    name: member.name,
                    matriculaSiape: member.matriculaSiape,
                    ordinanceMember: {
                        id: member.ordinanceMember.filter(id => id.memberWorkload.at(0)?.id === member.id).at(0)?.id as string,
                        memberId: member.id,
                        workload: member.ordinanceMember.filter(id => id.memberWorkload.at(0)?.id === member.id).at(0)?.workload as number,
                        memberType: member.ordinanceMember.filter(id => id.memberWorkload.at(0)?.id === member.id).at(0)?.memberType as MemberType

                    }
                }

                setMembers(oldState => [...oldState, dataMembers])
            })

            handleOpenModal()

        } else if (dataOrdinancesByMemberMatricula?.member?.matriculaSiape != null) {

            dataOrdinancesByMemberMatricula.member?.ordinanceMember[0].ordinanceWorkload.filter(numberOrdinance => numberOrdinance?.number === numberSearch).map(ordinance => {

                setNumber(ordinance.number)
                setEffectiveStartDate(ordinance.effectiveStartDate)
                setOrdinanceType(ordinance.ordinanceType)
                setEffectiveEndDate(ordinance.effectiveEndDate)
                setSubject(ordinance.subject)

                const dataOrdinance: OrdinanceProps = {
                    id: ordinance?.id as string,
                    number: ordinance?.number as string,
                    effectiveStartDate: ordinance?.effectiveStartDate,
                    ordinanceType: ordinance?.ordinanceType as OrdinanceType,
                    effectiveEndDate: ordinance?.effectiveEndDate,
                    subject: ordinance?.subject as string
                }

                setOrdinances(oldState => [...oldState, dataOrdinance])

            })

            const dataMembers: MemberProps = {
                id: dataOrdinancesByMemberMatricula.member?.id as string,
                name: dataOrdinancesByMemberMatricula.member?.name as string,
                matriculaSiape: dataOrdinancesByMemberMatricula.member?.matriculaSiape as number,
                ordinanceMember: {
                    id: dataOrdinancesByMemberMatricula.member?.id as string,
                    memberId: dataOrdinancesByMemberMatricula.member?.id as string,
                    workload: dataOrdinancesByMemberMatricula.member?.ordinanceMember.at(0)?.workload as number,
                    memberType: dataOrdinancesByMemberMatricula.member?.ordinanceMember.at(0)?.memberType as MemberType

                }
            }

            setMembers(oldState => [...oldState, dataMembers])
            handleOpenModal()

        }
        //else {
        //     dataOrdinances?.ordinances.filter(numberOrdinance => numberOrdinance.number === numberSearch).map(ordinance => {
        //         setNumber(ordinance?.number as string)
        //         setEffectiveStartDate(ordinance?.effectiveStartDate)
        //         setOrdinanceType(ordinance?.ordinanceType as OrdinanceType)
        //         setEffectiveEndDate(ordinance?.effectiveEndDate)
        //         setSubject(ordinance?.subject as string)

        //         const dataOrdinance: OrdinanceProps = {
        //             id: ordinance?.id as string,
        //             number: ordinance?.number as string,
        //             effectiveStartDate: ordinance?.effectiveStartDate,
        //             ordinanceType: ordinance?.ordinanceType as OrdinanceType,
        //             effectiveEndDate: ordinance?.effectiveEndDate,
        //             subject: ordinance?.subject as string
        //         }

        //         setOrdinances(oldState => [...oldState, dataOrdinance])

        //         ordinance?.members.map(member => {
        //             const dataMembers: MemberProps = {
        //                 id: member.id,
        //                 name: member.name,
        //                 matriculaSiape: member.matriculaSiape,
        //                 ordinanceMember: {
        //                     id: member.ordinanceMember.filter(id => id.memberWorkload.at(0)?.id === member.id).at(0)?.id as string,
        //                     memberId: member.id,
        //                     workload: member.ordinanceMember.filter(id => id.memberWorkload.at(0)?.id === member.id).at(0)?.workload as number,
        //                     memberType: member.ordinanceMember.filter(id => id.memberWorkload.at(0)?.id === member.id).at(0)?.memberType as MemberType

        //                 }
        //             }

        //             setMembers(oldState => [...oldState, dataMembers])
        //         })

        //         handleOpenModal()
        //     })
        // }
    }

    const handleAddNewMember = async () => {

        if (dataOrdinancesByMemberMatriculaLazyQuery?.member?.id.length != null) {

            createOrdinanceMember({
                variables: {
                    memberId: dataOrdinancesByMemberMatriculaLazyQuery.member?.id as string,
                    workload: Number(workload),
                    memberType: memberType
                }
            }).then(res => {
                const dataMembers: MemberProps = {
                    id: dataOrdinancesByMemberMatriculaLazyQuery?.member?.id as string,
                    name: dataOrdinancesByMemberMatriculaLazyQuery?.member?.name as string,
                    matriculaSiape: Number(matriculaSiape),
                    ordinanceMember: {
                        id: String(res.data?.createOrdinanceMember?.id),
                        memberId: dataOrdinancesByMemberMatriculaLazyQuery?.member?.id as string,
                        workload: Number(workload),
                        memberType: memberType
                    }
                }

                setMembers(oldState => [...oldState, dataMembers])

            })

        } else if (name === '' || name.length < 4) {
            return notify("nameInvalid")
        } else {
            await createMember({
                variables: {
                    name: name,
                    matriculaSiape: Number(matriculaSiape)
                }
            }).then(res => {
                let id = String(res.data?.createMember?.id)

                createOrdinanceMember({
                    variables: {
                        memberId: id,
                        workload: Number(workload),
                        memberType: memberType
                    }
                }).then(res => {
                    const dataMembers: MemberProps = {
                        id: id,
                        name: name,
                        matriculaSiape: Number(matriculaSiape),
                        ordinanceMember: {
                            id: String(res.data?.createOrdinanceMember?.id),
                            memberId: id,
                            workload: Number(workload),
                            memberType: memberType
                        }
                    }

                    setMembers(oldState => [...oldState, dataMembers])
                })
            })
        }

        setName('');
        setMatriculaSiape('')
        setMemberType(MemberType.Member)
        setworkload('')
    }

    const handleRemoveMemberWorkload = (idMember: string, idWorkload: string) => {
        setMembers(oldState => oldState.filter(
            member => member.id != idMember
        ))

        updateOrdinanceMemberDisconnect({
            variables: {
                number: number,
                memberDisconnect: idMember,
                ordinanceMemberDisconnect: idWorkload
            }
        })
    }

    const handleUpdateOrdinanceAdmin = async (ordinanceId: string) => {

        updateOrdinanceAdmin({
            variables: {
                number: number,
                effectiveStartDate: effectiveStartDate,
                ordinanceType: ordinanceType,
                effectiveEndDate: effectiveEndDate,
                subject: subject
            }
        })

        updateOrdinance({
            variables: {
                idOrdinance: ordinanceId,
                connectionsMembers: members.map(idMember => ({ where: { id: idMember.id } })),
                connectionsOrdinanceMembers: workloads.map(idWorkload => ({ where: { id: idWorkload.id } }))
            }
        })

        notify("updated")
        handleCloseModal();
        setMembers([]);
        reload()
    }

    const calculateDateInterval = (end: any, start: any, ordinanceType: any, memberType: any) => {
        end = new Date(end).valueOf()
        start = new Date(start).valueOf()

        let intervalInTime = Math.abs(end - start)
        let intervalInDays = intervalInTime / 86400000

        if (ordinanceType == "designation" && memberType == "president") {
            if (intervalInDays >= 120) {
                return 6
            } else if (intervalInDays >= 60 && intervalInDays < 120) {
                return 4
            } else {
                return 2
            }
        } else if (ordinanceType == "designation" && memberType == "member") {
            if (intervalInDays >= 120) {
                return 3
            } else if (intervalInDays >= 60 && intervalInDays < 120) {
                return 2
            } else {
                return 1
            }
        }
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
    }

    const notifyDelete = (numberDelete: string) => {

        toast.warn(
            <div className="flex flex-col justify-between items-center">
                <span className="flex w-full mb-2 justify-center font-light text-lg text-center text-black">
                    Tem certeza que deseja excluir a portaria {numberDelete}?
                </span>
                <div className="flex flex-row justify-center items-center text-base text-white">
                    <button

                        onClick={() => handleDeleteOrdinance(numberDelete)}
                        className="flex justify-center items-center w-[100px] h-[35px] mx-3 leading-none bg-green-300 rounded font-medium text-base hover:bg-green-700 transition-colors disabled:opacity-50"
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
    }

    const notifyDeleteMember = (idMember: string) => {

        toast.warn(
            <div className="flex flex-col justify-between items-center">
                <span className="flex w-full mb-2 justify-center font-light text-lg text-center text-black">
                    Tem certeza que deseja excluir o membro?
                </span>
                <span className="flex w-full mb-2 justify-center font-light text-base text-center text-red-900">
                    Ao excluir um membro, ele será removido de todas as portarias ao qual esteja vinculado.
                </span>
                <div className="flex flex-row justify-center items-center text-base text-white">
                    <button

                        onClick={() => handleDeleteMember(idMember)}
                        className="flex justify-center items-center w-[100px] h-[35px] mx-3 leading-none bg-green-300 rounded font-medium text-base hover:bg-green-700 transition-colors disabled:opacity-50"
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
                        className="flex justify-center items-center w-[100px] h-[35px] mx-3 leading-none bg-green-300 rounded font-medium text-base hover:bg-green-700 transition-colors disabled:opacity-50"
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
    }

    const reload = () => {
        setTimeout(() => {
            window.location.reload();
        }, 3000)
    }

    let workloadTotal = dataOrdincesByMemberName?.members.reduce((acc, member) => {
        const sumMember = member.ordinanceMember.reduce((sum, workload) => sum + workload.workload, 0)
        return acc + sumMember;
    }, 0);

    if (!user) {
        return (
            <div className="flex min-h-screen justify-center items-center bg-gradient-to-r from-green-700 via-white to-green-700">
                <div className="flex flex-col justify-center items-center w-96 h-48 shadow-lg shadow-gray-500 bg-gray-100 rounded-lg">
                    <span className="font-medium justify-center text-center text-xl text-red-900 ">
                        <WarningCircle size={96} />
                    </span>
                    <span className="font-medium justify-center text-center text-xl text-black ">
                        <p>
                            Acesso negado! <br />
                            Por favor, faça <a href="/login" className="text-blue-600 italic">login</a>.
                        </p>
                    </span>
                </div>
            </div>

        )
    }

    return (

        <div className="flex flex-col min-h-screen">
            <ToastContainer />

            <Header
                name={user.name}
                given_name={user.given_name}
                email={user.email}
                picture={user.picture}
            />
            <main className="flex flex-col items-center justify-center pt-[130px] px-48">
                <span className="flex w-full mt-6 mb-7 font-medium justify-center text-xl text-red-900 border-b border-green-300">
                    Insira pelo menos uma das informações abaixo
                </span>
                <form onSubmit={handleSubmitSearch(onSubmit)} className="w-full max-w-7xl">
                    <div className="justify-start">
                        <div className="flex">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Número:
                            </label>
                            <InputMask
                                mask="999/9999"
                                {...register("number")}
                                className="appearance-none block w-[120px] h-[30px] px-2 ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            />

                        </div>
                        <div className="flex mt-4">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Tipo da portaria:
                            </label>
                            <select
                                {...register("ordinanceType")}
                                className="appearance-none block w-[194px] h-[30px] p-0 px-2 ml-4 border-none bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            >
                                <option value="" className="text-gray-500 text-xl font-light"></option>
                                <option value="progression" className="text-gray-500 text-xl font-light">Progressão</option>
                                <option value="designation" className="text-gray-500 text-xl font-light">Designação</option>
                            </select>
                        </div>
                        <div className="flex mt-4">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Data de início da vigência:
                            </label>
                            <input
                                {...register("effectiveStartDate")}
                                type="date"
                                className="appearance-none block w-[170px] h-[30px] px-2 ml-4 border-none bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500" placeholder=" "
                            />
                        </div>

                    </div>
                    <div className="">
                        <div className="flex mt-4 ">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Data de encerramento da vigência:
                            </label>
                            <input
                                {...register("effectiveEndDate")}
                                type="date"
                                className="appearance-none block w-[170px] h-[30px] px-2 ml-4 border-none bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Membro:
                            </label>
                            <input
                                {...register("member")}
                                className="appearance-none block w-[320px] h-[30px] px-2 ml-2 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    <div className="flex mt-4">
                        <label className="block tracking-wide font-light text-gray-500 text-xl">
                            Matrícula/Siape:
                        </label>
                        <input
                            {...register("matricula")}
                            className="appearance-none block w-[120px] h-[30px] px-2 ml-2 bg-gray-400 text-gray-500 text-xl font-light rounded-md outline-none border-none focus:outline-none focus:ring-1 focus:ring-green-500"
                            type="number"
                            pattern="[0-9]{6,7}"
                            title="6 to 7 numbers"
                        />
                    </div>
                    <div className="flex mt-4">
                        <label className="block tracking-wide font-light text-gray-500 text-xl">
                            Tipo do Membro:
                        </label>
                        <select
                            {...register("memberType")}
                            className="appearance-none block w-[194px] h-[30px] p-0 px-2 ml-2 border-none bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                        >
                            <option value="" className="text-gray-500 text-xl font-light"></option>
                            <option value="president" className="text-gray-500 text-xl font-light">Presidente</option>
                            <option value="vicePresident" className="text-gray-500 text-xl font-light">Vice-Presidente</option>
                            <option value="member" className="text-gray-500 text-xl font-light">Membro</option>
                        </select>
                    </div>
                    <div className="flex justify-between mb-4 mt-14">
                        <div>
                            <button
                                type="submit"
                                className="flex justify-center items-center w-[140px] h-[50px] leading-none bg-green-300 rounded font-medium text-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                            >
                                Pesquisar
                            </button>
                            <p className="flex justify-center items-center my-auto ml-2 text-red-800 text-sm">
                                {errorsOrdinance.number?.message}
                            </p>
                        </div>
                        {
                            dataOrdincesByMemberName?.members != null &&
                            <div className="flex justify-center items-center">
                                <span className="flex justify-center items-center w-full font-medium text-xl text-black">
                                    Carga horária total: {workloadTotal} horas
                                </span>
                            </div>
                        }
                    </div>
                </form>

                <div className="my-1">
                    {
                        (
                            dataOrdinanceByNumber?.ordinance != null || dataOrdinancesByMemberMatricula?.member != null || dataOrdincesByMemberName?.members != null
                            || dataOrdinancesByDate?.ordinances != null || dataOrdinancesByType?.ordinances != null || dataOrdinancesByMemberType?.ordinanceMembers != null
                        ) ?
                            <div>
                                {dataOrdinanceByNumber?.ordinance?.number &&
                                    <div className="flex space-x-6 justify-between items-center p-2 mt-2 bg-gray-400 text-gray-500 sm:text-sm lg:text-base font-light rounded-full outline-none border-none">
                                        <OrdinanceSearch
                                            key={dataOrdinanceByNumber?.ordinance?.id}
                                            number={dataOrdinanceByNumber?.ordinance?.number as string}
                                            ordinanceType={dataOrdinanceByNumber?.ordinance?.ordinanceType as OrdinanceType}
                                            effectiveStartDate={dataOrdinanceByNumber?.ordinance?.effectiveStartDate}
                                            effectiveEndDate={dataOrdinanceByNumber?.ordinance?.effectiveEndDate}
                                            members={dataOrdinanceByNumber?.ordinance?.members ?? []}
                                            workload={0}

                                        />

                                        <div className="flex justify-center items-center text-center">

                                            <span

                                                className="flex justify-center items-center m-0 h-[40px] w-[40px] text-blue-700 rounded-full cursor-pointer hover:bg-blue-700 hover:text-white transition-colors disabled:opacity-50"
                                                onClick={() => handleClickSearch(dataOrdinanceByNumber?.ordinance?.number as string)}
                                            >
                                                <ClockClockwise size={32} />
                                            </span>
                                            <span
                                                className="flex justify-center items-center m-0 h-[40px] w-[40px] text-red-700 rounded-full cursor-pointer hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50"
                                                onClick={() => notifyDelete(dataOrdinanceByNumber?.ordinance?.number as string)}
                                            >
                                                <Trash size={32} />
                                            </span>
                                        </div>
                                    </div>
                                }

                                {
                                    dataOrdinancesByMemberMatricula?.member?.ordinanceMember.map(ordinanceMember => {
                                        return (
                                            ordinanceMember.ordinanceWorkload.map(ordinance => {
                                                return (
                                                    <div className="flex space-x-6 justify-between items-center p-2 mt-10 bg-gray-400 text-gray-500 sm:text-sm lg:text-base font-light rounded-full outline-none border-none">
                                                        <OrdinanceSearch
                                                            key={ordinance?.id}
                                                            number={ordinance.number as string}
                                                            ordinanceType={ordinance.ordinanceType as OrdinanceType}
                                                            effectiveStartDate={ordinance.effectiveStartDate}
                                                            effectiveEndDate={ordinance.effectiveEndDate}
                                                            members={dataOrdinancesByMemberMatricula?.member ? [dataOrdinancesByMemberMatricula.member] : []}
                                                            workload={ordinanceMember.workload}

                                                        />
                                                        <div className="flex justify-center items-center text-center">

                                                            <span

                                                                className="flex justify-center items-center m-0 h-[40px] w-[40px] text-blue-700 rounded-full cursor-pointer hover:bg-blue-700 hover:text-white transition-colors disabled:opacity-50"
                                                                onClick={() => handleClickSearch(dataOrdinanceByNumber?.ordinance?.number as string)}
                                                            >
                                                                <ClockClockwise size={32} />
                                                            </span>
                                                            <span
                                                                className="flex justify-center items-center m-0 h-[40px] w-[40px] text-red-700 rounded-full cursor-pointer hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50"
                                                                onClick={() => notifyDelete(dataOrdinanceByNumber?.ordinance?.number as string)}
                                                            >
                                                                <Trash size={32} />
                                                            </span>
                                                        </div>
                                                    </div>

                                                )
                                            })
                                        )

                                    })

                                }

                                {
                                    dataOrdincesByMemberName?.members.map(member => {
                                        return (
                                            member.ordinanceMember.map(ordinance => {
                                                return (
                                                    <div className="flex space-x-6 justify-between items-center p-2 mt-10 bg-gray-400 text-gray-500 sm:text-sm lg:text-base font-light rounded-full outline-none border-none">
                                                        <OrdinanceSearch
                                                            key={ordinance.ordinanceWorkload[0]?.id}
                                                            number={ordinance.ordinanceWorkload[0]?.number}
                                                            ordinanceType={ordinance.ordinanceWorkload[0]?.ordinanceType as OrdinanceType}
                                                            effectiveStartDate={ordinance.ordinanceWorkload[0]?.effectiveStartDate}
                                                            effectiveEndDate={ordinance.ordinanceWorkload[0]?.effectiveEndDate}
                                                            members={member ? [member] : []}
                                                            workload={ordinance.workload}
                                                        />
                                                        {/* <div className="flex justify-center items-center text-center">

                                                            <span

                                                                className="flex justify-center items-center m-0 h-[40px] w-[40px] text-blue-700 rounded-full cursor-pointer hover:bg-blue-700 hover:text-white transition-colors disabled:opacity-50"
                                                                onClick={() => handleClickSearch(dataOrdinanceByNumber?.ordinance?.number as string)}
                                                            >
                                                                <ClockClockwise size={32} />
                                                            </span>
                                                            <span
                                                                className="flex justify-center items-center m-0 h-[40px] w-[40px] text-red-700 rounded-full cursor-pointer hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50"
                                                                onClick={() => notifyDelete(dataOrdinanceByNumber?.ordinance?.number as string)}
                                                            >
                                                                <Trash size={32} />
                                                            </span>
                                                        </div> */}
                                                    </div>
                                                )
                                            })
                                        )

                                    })
                                }

                                {
                                    dataOrdinancesByDate?.ordinances.map(ordinance => {
                                        return (
                                            <div className="flex space-x-6 justify-between items-center p-2 mt-10 bg-gray-400 text-gray-500 sm:text-sm lg:text-base font-light rounded-full outline-none border-none">
                                                <OrdinanceSearch
                                                    key={ordinance?.id}
                                                    number={ordinance.number as string}
                                                    ordinanceType={ordinance.ordinanceType as OrdinanceType}
                                                    effectiveStartDate={ordinance.effectiveStartDate}
                                                    effectiveEndDate={ordinance.effectiveEndDate}
                                                    members={ordinance?.members ?? []}
                                                    workload={0}
                                                />
                                                {/* <div className="flex justify-center items-center text-center">

                                                    <span

                                                        className="flex justify-center items-center m-0 h-[40px] w-[40px] text-blue-700 rounded-full cursor-pointer hover:bg-blue-700 hover:text-white transition-colors disabled:opacity-50"
                                                        onClick={() => handleClickSearch(dataOrdinanceByNumber?.ordinance?.number as string)}
                                                    >
                                                        <ClockClockwise size={32} />
                                                    </span>
                                                    <span
                                                        className="flex justify-center items-center m-0 h-[40px] w-[40px] text-red-700 rounded-full cursor-pointer hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50"
                                                        onClick={() => notifyDelete(dataOrdinanceByNumber?.ordinance?.number as string)}
                                                    >
                                                        <Trash size={32} />
                                                    </span>
                                                </div> */}
                                            </div>
                                        )
                                    })

                                }

                                {
                                    dataOrdinancesByType?.ordinances.map(ordinance => {
                                        return (
                                            <div className="flex space-x-6 justify-between items-center p-2 mt-10 bg-gray-400 text-gray-500 sm:text-sm lg:text-base font-light rounded-full outline-none border-none">
                                                <OrdinanceSearch
                                                    key={ordinance?.id}
                                                    number={ordinance.number as string}
                                                    ordinanceType={ordinance.ordinanceType as OrdinanceType}
                                                    effectiveStartDate={ordinance.effectiveStartDate}
                                                    effectiveEndDate={ordinance.effectiveEndDate}
                                                    members={ordinance?.members ?? []}
                                                    workload={0}
                                                />
                                                {/* <div className="flex justify-center items-center text-center">

                                                    <span

                                                        className="flex justify-center items-center m-0 h-[40px] w-[40px] text-blue-700 rounded-full cursor-pointer hover:bg-blue-700 hover:text-white transition-colors disabled:opacity-50"
                                                        onClick={() => handleClickSearch(dataOrdinanceByNumber?.ordinance?.number as string)}
                                                    >
                                                        <ClockClockwise size={32} />
                                                    </span>
                                                    <span
                                                        className="flex justify-center items-center m-0 h-[40px] w-[40px] text-red-700 rounded-full cursor-pointer hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50"
                                                        onClick={() => notifyDelete(dataOrdinanceByNumber?.ordinance?.number as string)}
                                                    >
                                                        <Trash size={32} />
                                                    </span>
                                                </div> */}
                                            </div>
                                        )
                                    })
                                }

                                {


                                    dataOrdinancesByMemberType?.ordinanceMembers.map(member => {
                                        return (
                                            member.memberWorkload.map(memberWorkload => {
                                                return (
                                                    memberWorkload.ordinances.map(ordinance => {
                                                        return (
                                                            <div className="flex space-x-6 justify-between items-center p-2 mt-10 bg-gray-400 text-gray-500 sm:text-sm lg:text-base font-light rounded-full outline-none border-none">
                                                                <OrdinanceSearch
                                                                    key={ordinance?.id}
                                                                    number={ordinance.number as string}
                                                                    ordinanceType={ordinance.ordinanceType as OrdinanceType}
                                                                    effectiveStartDate={ordinance.effectiveStartDate}
                                                                    effectiveEndDate={ordinance.effectiveEndDate}
                                                                    members={memberWorkload ? [memberWorkload] : []}
                                                                    workload={0}
                                                                />
                                                                {/* <div className="flex justify-center items-center text-center">

                                                                    <span

                                                                        className="flex justify-center items-center m-0 h-[40px] w-[40px] text-blue-700 rounded-full cursor-pointer hover:bg-blue-700 hover:text-white transition-colors disabled:opacity-50"
                                                                        onClick={() => handleClickSearch(dataOrdinanceByNumber?.ordinance?.number as string)}
                                                                    >
                                                                        <ClockClockwise size={32} />
                                                                    </span>
                                                                    <span
                                                                        className="flex justify-center items-center m-0 h-[40px] w-[40px] text-red-700 rounded-full cursor-pointer hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50"
                                                                        onClick={() => notifyDelete(dataOrdinanceByNumber?.ordinance?.number as string)}
                                                                    >
                                                                        <Trash size={32} />
                                                                    </span>
                                                                </div> */}
                                                            </div>
                                                        )

                                                    })
                                                )
                                            })
                                        )
                                    })
                                }
                            </div> :

                            <span className="flex w-full mt-6 mb-7 font-medium justify-center text-x text-red-900 border-b border-green-300">
                                Nenhuma portaria encontrada!!!
                            </span>
                    }



                    {/* {
                        (
                            dataOrdinanceByNumber?.ordinance != null || dataOrdinancesByMemberMatricula?.member != null || dataOrdincesByMemberName?.members != null
                            || dataOrdinancesByDate?.ordinances != null || dataOrdinancesByType?.ordinances != null || dataOrdinancesByMemberType?.ordinanceMembers != null
                        ) ?
                            <table className="w-full font-light text-md bg-green-300 dark:text-gray-400 ">
                                <thead className="bg-green-300 font-normal border-b dark:bg-green-300 dark:text-white">
                                    <tr>
                                        <th className="px-3">Número</th>
                                        <th>Tipo de Portaria</th>
                                        <th className="px-0">Data Início Vigência</th>
                                        <th className="px-0">Data Fim Vigência</th>
                                        <th>Membros</th>
                                        <th>Carga Horária</th>
                                    </tr>
                                </thead>
                                <tbody className="text-black text-center border-b dark:bg-white dark:border-gray-700">

                                    {
                                        Boolean(dataOrdinanceByNumber?.ordinance?.members?.length) &&
                                        <OrdinanceSearch
                                            key={dataOrdinanceByNumber?.ordinance?.id}
                                            number={dataOrdinanceByNumber?.ordinance?.number as string}
                                            ordinanceType={dataOrdinanceByNumber?.ordinance?.ordinanceType as OrdinanceType}
                                            effectiveStartDate={dataOrdinanceByNumber?.ordinance?.effectiveStartDate}
                                            effectiveEndDate={dataOrdinanceByNumber?.ordinance?.effectiveEndDate}
                                            members={dataOrdinanceByNumber?.ordinance?.members ?? []}
                                            workload={0}

                                        />
                                    }

                                    {
                                        dataOrdinancesByMemberMatricula?.member?.ordinanceMember.map(ordinanceMember => {
                                            return (
                                                ordinanceMember.ordinanceWorkload.map(ordinance => {
                                                    return (
                                                        <OrdinanceSearch
                                                            key={ordinance?.id}
                                                            number={ordinance.number as string}
                                                            ordinanceType={ordinance.ordinanceType as OrdinanceType}
                                                            effectiveStartDate={ordinance.effectiveStartDate}
                                                            effectiveEndDate={ordinance.effectiveEndDate}
                                                            members={dataOrdinancesByMemberMatricula?.member ? [dataOrdinancesByMemberMatricula.member] : []}
                                                            workload={ordinanceMember.workload}

                                                        />

                                                    )
                                                })
                                            )

                                        })


                                    }

                                    {
                                        dataOrdincesByMemberName?.members.map(member => {
                                            return (
                                                member.ordinanceMember.map(ordinance => {
                                                    return (
                                                        <OrdinanceSearch
                                                            key={ordinance.ordinanceWorkload[0]?.id}
                                                            number={ordinance.ordinanceWorkload[0]?.number}
                                                            ordinanceType={ordinance.ordinanceWorkload[0]?.ordinanceType as OrdinanceType}
                                                            effectiveStartDate={ordinance.ordinanceWorkload[0]?.effectiveStartDate}
                                                            effectiveEndDate={ordinance.ordinanceWorkload[0]?.effectiveEndDate}
                                                            members={member ? [member] : []}
                                                            workload={ordinance.workload}
                                                        />
                                                    )
                                                })
                                            )

                                        })
                                    }

                                    {getValues("effectiveStartDate") != undefined &&
                                        dataOrdinancesByDate?.ordinances.map(ordinance => {
                                            return (
                                                <OrdinanceSearch
                                                    key={ordinance?.id}
                                                    number={ordinance.number as string}
                                                    ordinanceType={ordinance.ordinanceType as OrdinanceType}
                                                    effectiveStartDate={ordinance.effectiveStartDate}
                                                    effectiveEndDate={ordinance.effectiveEndDate}
                                                    members={ordinance?.members ?? []}
                                                    workload={0}
                                                />
                                            )
                                        })

                                    }

                                    {getValues("ordinanceType")?.length >= 3 &&
                                        dataOrdinancesByType?.ordinances.map(ordinance => {
                                            return (
                                                <OrdinanceSearch
                                                    key={ordinance?.id}
                                                    number={ordinance.number as string}
                                                    ordinanceType={ordinance.ordinanceType as OrdinanceType}
                                                    effectiveStartDate={ordinance.effectiveStartDate}
                                                    effectiveEndDate={ordinance.effectiveEndDate}
                                                    members={ordinance?.members ?? []}
                                                    workload={0}
                                                />
                                            )
                                        })
                                    }


                                    {getValues("memberType")?.length >= 1 &&
                                        dataOrdinancesByMemberType?.ordinanceMembers.map(member => {
                                            return (
                                                member.memberWorkload.map(memberWorkload => {
                                                    return (
                                                        memberWorkload.ordinances.map(ordinance => {
                                                            return (
                                                                <OrdinanceSearch
                                                                    key={ordinance?.id}
                                                                    number={ordinance.number as string}
                                                                    ordinanceType={ordinance.ordinanceType as OrdinanceType}
                                                                    effectiveStartDate={ordinance.effectiveStartDate}
                                                                    effectiveEndDate={ordinance.effectiveEndDate}
                                                                    members={memberWorkload ? [memberWorkload] : []}
                                                                    workload={0}
                                                                />
                                                            )

                                                        })
                                                    )
                                                })
                                            )
                                        })
                                    }
                                </tbody>
                            </table> :

                            <span className="flex w-full mt-6 mb-7 font-medium justify-center text-x text-red-900 border-b border-green-300">
                                Nenhuma portaria encontrada!!!
                            </span>

                    } */}
                </div>


                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="modal"
                    className="flex justify-center items-center h-screen w-full rounded"
                >
                    <div className="flex flex-col justify-center items-center w-[800px] bg-white border border-green-700 rounded-lg">
                        <strong className="flex justify-center my-4 text-red-900">Atualize as informações!</strong>

                        <form className="w-full max-w-7xl px-5">
                            <div className="flex flex-wrap justify-between">
                                <div className="flex">
                                    <label className="block tracking-wide font-light text-gray-500 text-base">
                                        Número:
                                    </label>
                                    <InputMask
                                        mask="999/9999"
                                        className="appearance-none block w-[120px] h-[30px] px-2 ml-2 bg-gray-400 text-gray-500 text-base font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 disabled:opacity-50"
                                        onChange={event => setNumber(event.target.value)}
                                        value={number}
                                        disabled={true}
                                    />
                                    <p className="absolute mt-8 text-red-800 text-sm">
                                        {/* {errorsOrdinance.number?.message} */}
                                    </p>
                                </div>
                                <div className="flex">
                                    <label className="block tracking-wide font-light text-gray-500 text-base">
                                        Data de início:
                                    </label>
                                    <input
                                        type="date"
                                        className="appearance-none block w-[170px] h-[30px] px-2 ml-4 border-none bg-gray-400 text-gray-500 text-base font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500" placeholder=" "
                                        onChange={event => setEffectiveStartDate(event.target.value)}
                                        value={effectiveStartDate}
                                    />
                                    <p className="absolute mt-8 text-red-800 text-sm">
                                        {/* {errorsOrdinance.effectiveStartDate?.message} */}
                                    </p>
                                </div>
                                <div className="flex">
                                    <label className="block tracking-wide font-light text-gray-500 text-base">
                                        Tipo:
                                    </label>
                                    <select
                                        className="appearance-none block w-[194px] h-[30px] p-0 px-2 ml-4 border-none bg-gray-400 text-gray-500 text-base font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                        onChange={event => setOrdinanceType(event.target.value as OrdinanceType)}
                                        value={ordinanceType}
                                    >
                                        <option value="" className="text-gray-500 text-base font-light"></option>
                                        <option value="progression" className="text-gray-500 text-base font-light">Progressão</option>
                                        <option value="designation" className="text-gray-500 text-base font-light">Designação</option>
                                    </select>
                                    <p className="absolute mt-8 text-red-800 text-sm">
                                        {/* {errorsOrdinance.ordinanceType?.message} */}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between mt-3">
                                <div className="flex ">
                                    <label className="block tracking-wide font-light text-gray-500 text-base">
                                        Data de final:
                                    </label>
                                    <input
                                        type="date"
                                        className="appearance-none block w-[170px] h-[30px] px-2 ml-4 border-none bg-gray-400 text-gray-500 text-base font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                        onChange={event => setEffectiveEndDate(event.target.value)}
                                        value={effectiveEndDate}
                                    />
                                </div>
                                <div className="flex">
                                    <label className="block tracking-wide font-light text-gray-500 text-base">
                                        Assunto:
                                    </label>
                                    <input
                                        className="appearance-none block w-[300px] h-[30px] px-2 ml-4 bg-gray-400 text-gray-500 text-base font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                        onChange={event => setSubject(event.target.value)}
                                        value={subject}
                                    />
                                    <p className="absolute mt-8 text-red-800 text-sm">
                                        {/* {errorsOrdinance.subject?.message} */}
                                    </p>
                                </div>

                            </div>
                            <div className="flex flex-wrap mt-3">
                                <div className="flex">
                                    <label className="block tracking-wide font-light text-gray-500 text-base">
                                        Membro:
                                    </label>
                                    <div className="flex-col">
                                        <div className="flex">
                                            <input
                                                className="appearance-none block w-[320px] h-[30px] px-2 ml-2 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                                onChange={event => setName(event.target.value)}
                                                value={name}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleSearch}
                                                className="ml-1 text-green-300"
                                            >
                                                <MagnifyingGlass size={32} />
                                            </button>
                                        </div>
                                        <div className="absolute z-10 w-[320px] max-h-xs ml-2 mt-[34px] mt bg-white rounded-md">
                                            <div className="flex flex-col">
                                                {showSuggestions && dataMembersByName?.members?.map(member => {
                                                    return (
                                                        <a
                                                            className="mb-1 px-2 text-gray-500 text-xs font-light cursor-pointer border-b border-green-700 rounded-md hover:bg-green-700 hover:text-white"
                                                            onClick={() => handleClickAutoComplete(member)}
                                                        >
                                                            {member.name} / {member.matriculaSiape}
                                                        </a>
                                                    )
                                                })}
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div className="flex ml-2">
                                    <label className="block tracking-wide font-light text-gray-500 text-base">
                                        Matrícula/Siape:
                                    </label>
                                    <InputMask
                                        mask="999999"
                                        pattern="[0-9]{6,7}"
                                        title="6 to 7 numbers"
                                        className="appearance-none block w-[180px] h-[30px] px-2 ml-2 bg-gray-400 text-gray-500 text-base font-light rounded-md outline-none border-none focus:outline-none focus:ring-1 focus:ring-green-500"
                                        onChange={event => setMatriculaSiape(event.target.value)}
                                        value={matriculaSiape}
                                    />

                                </div>
                                <div className="flex mt-3">
                                    <label className="block tracking-wide font-light text-gray-500 text-base">
                                        Tipo:
                                    </label>
                                    <select
                                        className="appearance-none block w-[180px] h-[30px] p-0 px-2 ml-2 border-none bg-gray-400 text-gray-500 text-base font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                        onChange={event => setMemberType(event.target.value as MemberType)}
                                        value={memberType}
                                    >
                                        <option value="member" className="text-gray-500 text-base font-light"></option>
                                        <option value="president" className="text-gray-500 text-base font-light">Presidente</option>
                                        <option value="vicePresident" className="text-gray-500 text-base font-light">Vice-Presidente</option>

                                    </select>
                                </div>
                                <div className="flex ml-4 mt-3">
                                    <label className="block tracking-wide font-light text-gray-500 text-base">
                                        Carga horária/semana:
                                    </label>
                                    <InputMask
                                        mask="9"
                                        pattern="[0-9]{1}"
                                        onChange={event => setworkload(event.target.value)}
                                        className="appearance-none block w-[100px] h-[30px] px-2 ml-4 bg-gray-400 text-gray-500 text-base font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"

                                    />

                                    <span
                                        onClick={handleAddNewMember}
                                        className="items-center text-green-300 ml-2 rounded-full hover:bg-green-700 hover:text-white transition-colors disabled:opacity-50">
                                        <PlusCircle size={28} />
                                    </span>
                                </div>

                            </div>
                            <div>
                                <ul>
                                    {members.map((member) => {

                                        return (

                                            <div className="flex flex-row text-sm h-6">
                                                <Member
                                                    key={member.id}
                                                    name={member.name}
                                                    matriculaSiape={member.matriculaSiape}
                                                    workload={member.ordinanceMember.workload}
                                                    type={member.ordinanceMember.memberType}
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveMemberWorkload(member.id, member.ordinanceMember.id)}
                                                    className="flex justify-center items-center h-6 mt-4 ml-2 text-red-700 rounded-full hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50">

                                                    <XCircle size={22} />
                                                </button>
                                            </div>
                                        )

                                    })}
                                </ul>
                            </div>
                            <div className="flex flex-col mt-6">
                                <div className="flex">
                                    <label className="block tracking-wide font-bold text-gray-500 text-base">
                                        Esta portaria revoga outra portaria?
                                    </label>

                                    <label className="flex items-center tracking-wide ml-4 font-normal text-gray-500 text-base cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="yes"
                                            onChange={event => setRadio(event.target.value)}
                                            className="w-4 h-4 mr-1 text-green-300 border-gray-500 focus:ring-1 focus:ring-green-300 cursor-pointer"
                                        />
                                        Sim
                                    </label>

                                    <label className="flex items-center tracking-wide ml-4 font-normal text-gray-500 text-base cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="no"
                                            onChange={event => setRadio(event.target.value)}
                                            className="w-4 h-4 mr-1 text-green-300 border-gray-500 focus:ring-1 focus:ring-green-300 cursor-pointer"
                                        />
                                        Não
                                    </label>
                                </div>
                                {radio === 'yes'
                                    ? <div className="flex mt-3">
                                        <label className="block tracking-wide font-light text-gray-500 text-base">
                                            Digite o número da portaria a ser revogada:
                                        </label>
                                        <input
                                            // {...registerUpdate("numberRevoked")}
                                            // mask="999/9999"
                                            className="appearance-none block w-[120px] h-[30px] px-2 ml-4 bg-gray-400 text-gray-500 text-base font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                            onChange={event => setNumberRevoked(event.target.value)}
                                            value={numberRevoked}
                                        />
                                    </div>
                                    : <div></div>
                                }
                            </div>
                        </form>

                        <div className="flex justify-between my-8">
                            <button
                                onClick={handleCloseModal}
                                className="flex justify-center items-center w-[130px] h-[35px] mx-3 leading-none bg-red-700 rounded font-medium text-base hover:bg-red-800 transition-colors disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                disabled={loadingOrdinanceUpdate}
                                onClick={() => handleUpdateOrdinanceAdmin(ordinances.at(0)?.id as string)}
                                className="flex justify-center items-center w-[130px] h-[35px] mx-3 leading-none bg-green-300 rounded font-medium text-base hover:bg-green-700 transition-colors disabled:opacity-50"
                            >
                                Confirmar
                            </button>
                        </div>

                    </div>

                </Modal>
            </main >
        </div >
    );

}

