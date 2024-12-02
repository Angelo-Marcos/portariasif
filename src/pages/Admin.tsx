import { useState } from "react";
import { Header } from "../components/Header";
import { OrdinanceAdmin } from "../components/OrdinanceAdmin";
import { OrdinanceAside } from "../components/OrdinanceAside";
import { MemberType, OrdinanceType, useGetOrdinanceByNumberQuery, useGetOrdinancesAsideQuery, useGetOrdinancesByMemberMatriculaQuery, useGetOrdinancesByMemberNameQuery, useGetOrdinancesQuery, useUpdateMemberMutation, useUpdateMemberOrdinanceDisconnectMutation, useUpdateOrdinanceAdminMutation, useUpdateOrdinanceMemberMutation, useUpdateOrdinanceMutation } from "../graphql/generated";
import { ArrowsCounterClockwise, ClockClockwise, PlusCircle, Trash, XCircle } from "phosphor-react"
import { format } from "date-fns";
import { ErrorBoundary } from "react-error-boundary";
import { Search } from "./Search";
import { useForm } from "react-hook-form";
import Modal from "react-modal"
import InputMask from "react-input-mask"
import { Member } from "../components/Member";
import { string } from "yup";

interface IFormInputSearch {
    search: string
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

export function Admin() {

    const { register: registerSearch, handleSubmit: handleSubmitSearch, getValues: getValuesSearch, formState: { errors: errorsOrdinanceSearch, } } = useForm<IFormInputSearch>();

    async function onSubmitSearch(data: IFormInputSearch) {

    }

    const [number, setNumber] = useState('');
    const [effectiveStartDate, setEffectiveStartDate] = useState('');
    const [ordinanceType, setOrdinanceType] = useState<OrdinanceType>(OrdinanceType.Designation);
    const [effectiveEndDate, setEffectiveEndDate] = useState('');
    const [subject, setSubject] = useState('');

    const [name, setName] = useState('');
    const [memberType, setMemberType] = useState<MemberType>(MemberType.President);
    const [matriculaSiape, setMatriculaSiape] = useState('');
    const [workload, setworkload] = useState('')
    const [radio, setRadio] = useState('');


    const [members, setMembers] = useState<MemberProps[]>([]);
    const [membersDisconnect, setMembersDisconnect] = useState<MemberDisconnectProps[]>([]);
    const [workloads, setWorkloads] = useState<WorkloadsProps[]>([]);
    const [ordinances, setOrdinances] = useState<OrdinanceProps[]>([]);

    const [modalIsOpen, setIsOpen] = useState(false);
    const handleOpenModal = async () => {
        setIsOpen(true);
    };
    const handleCloseModal = () => {
        setIsOpen(false);
        setMembers([]);
    };

    const handleClickSearch = (number: string) => {


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



            dataOrdinancesByMemberMatricula.member?.ordinances.filter(numberOrdinance => numberOrdinance.number === number).map(ordinance => {

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
                    id: dataOrdinancesByMemberMatricula.member?.ordinanceMember.at(0)?.memberWorkload.at(0)?.id as string,
                    memberId: dataOrdinancesByMemberMatricula.member?.id as string,
                    workload: dataOrdinancesByMemberMatricula.member?.ordinanceMember.at(0)?.workload as number,
                    memberType: dataOrdinancesByMemberMatricula.member?.ordinanceMember.at(0)?.memberType as MemberType

                }
            }

            setMembers(oldState => [...oldState, dataMembers])
            handleOpenModal()

        } else {
            dataOrdinances?.ordinances.filter(numberOrdinance => numberOrdinance.number === number).map(ordinance => {
                setNumber(ordinance?.number as string)
                setEffectiveStartDate(ordinance?.effectiveStartDate)
                setOrdinanceType(ordinance?.ordinanceType as OrdinanceType)
                setEffectiveEndDate(ordinance?.effectiveEndDate)
                setSubject(ordinance?.subject as string)

                ordinance?.members.map(member => {
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
            })
        }
    }



    const handleAddNewMember = async () => {

        // if (dataOrdinancesByMemberMatricula?.member?.id.length != null) {
        //     const dataMembers: MemberProps = {
        //         id: dataOrdinancesByMemberMatricula.member?.id as string,
        //         name: dataOrdinancesByMemberMatricula.member?.name as string,
        //         matriculaSiape: Number(matriculaSiape),
        //     }

        //     createOrdinanceMember({
        //         variables: {
        //             memberId: dataMembers.id,
        //             workload: Number(workload),
        //             memberType: memberType
        //         }
        //     }).then(res => {
        //         const dataWorkloads: WorkloadsProps = {
        //             id: String(res.data?.createOrdinanceMember?.id),
        //             memberId: dataMembers.id,
        //             workload: workload,
        //             memberType: memberType
        //         }

        //         setWorkloads(oldState => [...oldState, dataWorkloads])
        //     })

        //     setMembers(oldState => [...oldState, dataMembers])
        // } else {
        //     await createMember({
        //         variables: {
        //             name: name,
        //             matriculaSiape: Number(matriculaSiape)
        //         }
        //     }).then(res => {
        //         const dataMembers: MemberProps = {
        //             id: String(res.data?.createMember?.id),
        //             name: name,
        //             matriculaSiape: Number(matriculaSiape),
        //         }

        //         createOrdinanceMember({
        //             variables: {
        //                 memberId: dataMembers.id,
        //                 workload: Number(workload),
        //                 memberType: memberType
        //             }
        //         }).then(res => {
        //             const dataWorkloads: WorkloadsProps = {
        //                 id: String(res.data?.createOrdinanceMember?.id),
        //                 memberId: dataMembers.id,
        //                 workload: workload,
        //                 memberType: memberType
        //             }

        //             setWorkloads(oldState => [...oldState, dataWorkloads])
        //         })

        //         setMembers(oldState => [...oldState, dataMembers])

        //     })
        // }

        // setName('');
        // setMatriculaSiape('')
        // setMemberType(MemberType.President)
        // setworkload('')
    }

    const handleRemoveMemberWorkload = (idMember: string, idWorkload: string) => {
        setMembers(oldState => oldState.filter(
            member => member.id != idMember
        ))

        setWorkloads(oldState => oldState.filter(
            workload => workload.id != idWorkload
        ))

        updateOrdinanceMemberDisconnect({
            variables: {
                number: number,
                memberDisconnect: idMember,
                ordinanceMemberDisconnect: idWorkload
            }
        })
    }

    const handleUpdateOrdinanceAdmin = (ordinanceId: string) => {

        updateOrdinanceAdmin({
            variables: {
                number: number,
                effectiveStartDate: effectiveStartDate,
                ordinanceType: ordinanceType,
                effectiveEndDate: effectiveEndDate,
                subject: subject
            }
        })'''

        members.length > 0 &&
            members.map((member) => {
                updateMember({
                    variables: {
                        idMember: member.id,
                        idOrdinance: ordinanceId
                    }
                })

                updateOrdinance({
                    variables: {
                        idMember: member.id,
                        idOrdinance: ordinanceId
                    }
                })

                updateOrdinanceMember({
                    variables: {
                        id: member.ordinanceMember.id,
                        ordinanceId: ordinanceId
                    }
                })
            })



        setMembers([]);
    }

    const [updateOrdinance, { loading: loadingOrdinanceUpdate }] = useUpdateOrdinanceMutation();
    const [updateMember] = useUpdateMemberMutation();
    const [updateOrdinanceMember, { loading: loadingOrdinanceMemberUpdate }] = useUpdateOrdinanceMemberMutation();
    const [updateOrdinanceAdmin, { loading: loadingUpdateOrdinanceAdmin }] = useUpdateOrdinanceAdminMutation();
    const [updateOrdinanceMemberDisconnect] = useUpdateMemberOrdinanceDisconnectMutation();

    const { data: dataOrdinances } = useGetOrdinancesQuery();

    const { data: dataOrdinanceByNumber } = useGetOrdinanceByNumberQuery({
        variables: {
            number: getValuesSearch('search')
        }
    })

    const { data: dataOrdinancesByMemberMatricula } = useGetOrdinancesByMemberMatriculaQuery({
        variables: {
            matriculaSiape: +getValuesSearch('search')
        }


    })

    const { data: dataOrdincesByMemberName } = useGetOrdinancesByMemberNameQuery({
        variables: {
            name: getValuesSearch('search')
        }
    })

    const completeOrdinanceSearch = () => {

    }

    console.log(ordinances)
    console.log(members)
    console.log(workloads)

    console.log(dataOrdinanceByNumber)

    console.log(dataOrdinancesByMemberMatricula)

    // console.log(getValuesSearch('search'))

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex flex-col pt-[130px] px-48 mt-10">
                <div className="flex w-full justify-center items-center mt-4 pb-7 border-b border-green-300">
                    <form
                        onSubmit={handleSubmitSearch(onSubmitSearch)}
                        className="flex w-full justify-center"
                    >
                        <input
                            placeholder="Digite uma matrícula ou número de portaria"
                            className="appearance-none w-[620px] h-[40px] px-4 ml-2 bg-gray-400 text-gray-500 text-lg font-light rounded-3xl outline-none border-none placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                            {...registerSearch("search")}
                        // onChange={event => setSearch(event.target.value)}
                        // value={matriculaSiape}
                        />
                        <button
                            // onClick={handleClickSearch}
                            type="submit"
                            className="justify-center items-center w-[140px] h-[40px] ml-3 leading-none bg-green-300 text-white text-base font-light rounded-3xl hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            Pesquisar
                        </button>
                    </form>

                </div>

                <ErrorBoundary
                    fallback={
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-center mt-5 mb-1 text-xl text-black font-medium">Something went wrong!</p>

                            <button>
                                <a href={'/admin'} className="h-10 mt-2 text-white bg-red-900 rounded-lg"> <ArrowsCounterClockwise size={32} className="flex justify-center items-center m-0 h-[40px] w-[40px] text-blue-700 rounded-full hover:bg-blue-700 hover:text-white transition-colors disabled:opacity-50" /></a>
                            </button>

                            <p className="text-center mt-2 mb-1 text-xl text-black font-medium">Try again</p>
                        </div>

                    }>
                    {
                        dataOrdinanceByNumber?.ordinance?.number.length as number >= 7 &&
                        <div className="flex space-x-6 justify-between items-center p-2 mt-10 bg-gray-400 text-gray-500 sm:text-sm lg:text-base font-light rounded-full outline-none border-none">
                            <div className="flex space-x-6 justify-center items-center p-2 bg-gray-400 text-gray-500 sm:text-sm lg:text-base font-light rounded-full outline-none border-none">
                                <span>
                                    <p className="flex flex-col justify-center items-center text-center font-medium mb-1 text-xs text-black">Número</p>
                                    {dataOrdinanceByNumber?.ordinance?.number}
                                </span>
                                <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                    <p className="mb-1 text-xs text-black font-medium">Tipo de portaria</p>
                                    {dataOrdinanceByNumber?.ordinance?.ordinanceType === 'designation' ? 'Designação' : 'Progressão'}
                                </span>
                                <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                    <p className="mb-1 text-xs text-black font-medium">Data início</p>
                                    {format(new Date(dataOrdinanceByNumber?.ordinance?.effectiveStartDate), "dd/MM/yyyy")}
                                </span>
                                <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                    <p className="mb-1 text-xs text-black font-medium">Data final</p>
                                    {dataOrdinanceByNumber?.ordinance?.effectiveEndDate === null ? "" : format(new Date(dataOrdinanceByNumber?.ordinance?.effectiveEndDate), "dd/MM/yyyy")}
                                </span>
                                <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                    <p className="mb-1 text-xs text-black font-medium">Membro(s)</p>
                                    {dataOrdinanceByNumber?.ordinance?.members.map(member => {
                                        return (
                                            <span className="flex flex-col justify-center items-center text-center">{member.name}</span>
                                        )
                                    })}
                                </span>
                            </div>

                            <div className="flex justify-center items-center text-center">
                                <span
                                    className="flex justify-center items-center m-0 h-[40px] w-[40px] text-red-700 rounded-full hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50"
                                >
                                    <Trash size={32} />
                                </span>
                                <span

                                    className="flex justify-center items-center m-0 h-[40px] w-[40px] text-blue-700 rounded-full hover:bg-blue-700 hover:text-white transition-colors disabled:opacity-50"
                                    onClick={handleOpenModal}
                                >
                                    <ClockClockwise size={32} />
                                </span>
                            </div>
                        </div>
                    }


                    {
                        dataOrdinancesByMemberMatricula?.member?.matriculaSiape as number === +getValuesSearch('search') &&
                        dataOrdinancesByMemberMatricula?.member?.ordinances.map(ordinance => {
                            return (
                                <div className="flex space-x-6 justify-between items-center p-2 mt-10 bg-gray-400 text-gray-500 sm:text-sm lg:text-base font-light rounded-full outline-none border-none">
                                    <div className="flex space-x-6 justify-center items-center p-2">
                                        <span className="flex flex-col justify-center items-center text-center">
                                            <p className="mb-1 text-xs text-black font-medium">Número</p>
                                            {ordinance?.number}
                                        </span>
                                        <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                            <p className="mb-1 text-xs text-black font-medium">Tipo de portaria</p>
                                            {ordinance?.ordinanceType === 'designation' ? 'Designação' : 'Progressão'}
                                        </span>
                                        <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                            <p className="mb-1 text-xs text-black font-medium">Data início</p>
                                            {format(new Date(ordinance?.effectiveStartDate), "dd/MM/yyyy")}
                                        </span>
                                        <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                            <p className="mb-1 text-xs text-black font-medium">Data final</p>
                                            {ordinance?.effectiveEndDate === null ? "" : format(new Date(ordinance?.effectiveEndDate), "dd/MM/yyyy")}
                                        </span>
                                        <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                            <p className="mb-1 text-xs text-black font-medium">Membro(s)</p>
                                            {dataOrdinancesByMemberMatricula?.member?.name}
                                        </span>
                                    </div>


                                    {/* <OrdinanceAdmin
                                        key={ordinance.id}
                                        number={ordinance.number}
                                        effectiveStartDate={ordinance.effectiveStartDate}
                                        ordinanceType={ordinance.ordinanceType}
                                        effectiveEndDate={ordinance.effectiveEndDate}
                                        subject={ordinance.subject}
                                        member={dataOrdinancesByMemberMatricula?.member?.name as string}
                                    /> */}



                                    <div className="flex justify-center items-center text-center">
                                        <span
                                            className="flex justify-center items-center m-0 h-[40px] w-[40px] text-red-700 rounded-full hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50"
                                        >
                                            <Trash size={32} />
                                        </span>
                                        <span
                                            className="flex justify-center items-center m-0 h-[40px] w-[40px] text-blue-700 rounded-full hover:bg-blue-700 hover:text-white transition-colors disabled:opacity-50"
                                            onClick={() => handleClickSearch(ordinance.number)}
                                        >
                                            <ClockClockwise size={32} />
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {
                        getValuesSearch('search') === '' &&
                        dataOrdinances?.ordinances.map(ordinance => {
                            return (
                                <div className="flex space-x-6 justify-between items-center p-2 mt-10 bg-gray-400 text-gray-500 sm:text-sm lg:text-base font-light rounded-full outline-none border-none">
                                    <div className="flex space-x-6 justify-center items-center p-2">
                                        <span className="flex flex-col justify-center items-center text-center">
                                            <p className="mb-1 text-xs text-black font-medium">Número</p>
                                            {ordinance?.number}
                                        </span>
                                        <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                            <p className="mb-1 text-xs text-black font-medium">Tipo de portaria</p>
                                            {ordinance?.ordinanceType === 'designation' ? 'Designação' : 'Progressão'}
                                        </span>
                                        <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                            <p className="mb-1 text-xs text-black font-medium">Data início</p>
                                            {format(new Date(ordinance?.effectiveStartDate), "dd/MM/yyyy")}
                                        </span>
                                        <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                            <p className="mb-1 text-xs text-black font-medium">Data final</p>
                                            {ordinance?.effectiveEndDate === null ? "" : format(new Date(ordinance?.effectiveEndDate), "dd/MM/yyyy")}
                                        </span>
                                        <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                            <p className="mb-1 text-xs text-black font-medium">Membro(s)</p>
                                            {ordinance.members.map(member => {
                                                return (
                                                    <span className="flex flex-col justify-center items-center text-center">{member.name}</span>
                                                )
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex justify-center items-center text-center">
                                        <span
                                            className="flex justify-center items-center m-0 h-[40px] w-[40px] text-red-700 rounded-full hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50"
                                        >
                                            <Trash size={32} />
                                        </span>
                                        <span
                                            className="flex justify-center items-center m-0 h-[40px] w-[40px] text-blue-700 rounded-full hover:bg-blue-700 hover:text-white transition-colors disabled:opacity-50"
                                            onClick={() => handleClickSearch(ordinance.number)}
                                        >
                                            <ClockClockwise size={32} />
                                        </span>
                                    </div>

                                </div>
                            )
                        })
                    }
                </ErrorBoundary>


                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="modal"
                    className="flex justify-center items-center h-screen w-full rounded"
                >
                    <div className="flex flex-col justify-center items-center h-[500px] w-[800px] bg-white border border-green-700 rounded-lg">
                        <strong className="flex justify-center my-4 text-red-900">Confirme as informações!</strong>

                        <form className="w-full max-w-7xl px-5">
                            <div className="flex flex-wrap justify-between">
                                <div className="flex">
                                    <label className="block tracking-wide font-light text-gray-500 text-base">
                                        Número:
                                    </label>
                                    <InputMask
                                        // value={ordinance.at(0)?.number}
                                        mask="999/9999"
                                        // {...registerUpdate("number")}
                                        className="appearance-none block w-[120px] h-[30px] px-2 ml-2 bg-gray-400 text-gray-500 text-base font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
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
                                        // value={ordinance.at(0)?.effectiveStartDate as unknown as string}
                                        // {...registerUpdate("effectiveStartDate")}
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
                                        // value={ordinance.at(0)?.ordinanceType}
                                        // {...registerUpdate("ordinanceType")}
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
                                        // value={ordinance.at(0)?.effectiveEndDate as unknown as string}
                                        // {...registerUpdate("effectiveEndDate")}
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
                                        // value={ordinance.at(0)?.subject}
                                        // {...registerUpdate("subject")}
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
                                    <div className="flex flex-col">
                                        <input
                                            // {...registerMember("name")}
                                            className="appearance-none block w-[320px] h-[30px] px-2 ml-2 bg-gray-400 text-gray-500 text-base font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                            onChange={event => setName(event.target.value)}
                                            value={name}
                                        />
                                        {/* {members.length <= 0 &&
                                    <p className="absolute mt-8 ml-2 text-red-800 text-sm">
                                        Nenhum membro inserido!
                                    </p>
                                } */}
                                        <div className="absolute z-10 w-[320px] max-h-xs ml-2 mt-[34px] mt bg-white rounded-md">
                                            {/* <div className="flex flex-col">
                                        {membersFilters?.length !== 0 && name !== '' &&
                                            membersFilters?.map(member => {
                                                return (
                                                    <a
                                                        className="mb-1 px-2 text-gray-500 text-xs font-light cursor-pointer border-b border-green-700 rounded-md hover:bg-green-700 hover:text-white"
                                                        onClick={() => handleClickAutoComplete(member)}
                                                    >
                                                        {member.name} / {member.matriculaSiape}
                                                    </a>
                                                )
                                            })}
                                    </div> */}

                                        </div>

                                    </div>
                                </div>
                                <div className="flex ml-4">
                                    <label className="block tracking-wide font-light text-gray-500 text-base">
                                        Matrícula/Siape:
                                    </label>
                                    <InputMask
                                        // {...registerMember("matriculaSiape")}
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
                                        // {...registerMember("memberType")}
                                        className="appearance-none block w-[180px] h-[30px] p-0 px-2 ml-2 border-none bg-gray-400 text-gray-500 text-base font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                        onChange={event => setMemberType(event.target.value as MemberType)}
                                    // value={memberType}
                                    >
                                        <option value="" className="text-gray-500 text-base font-light"></option>
                                        <option value="president" className="text-gray-500 text-base font-light">Presidente</option>
                                        <option value="vice-president" className="text-gray-500 text-base font-light">Vice-Presidente</option>

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

                                    // onChange={event => setSubject(event.target.value)}
                                    // value={subject}
                                    />
                                    {/* <p className="absolute mt-8 text-red-800 text-sm">
                                {errorsOrdinance.subject?.message}
                            </p> */}
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
                                        // const workloadFilter = workloads.filter((i) => i.memberId === member.id)

                                        return (

                                            <div className="flex flex-row text-sm h-6">
                                                <Member
                                                    key={member.id}
                                                    name={member.name}
                                                    matriculaSiape={member.matriculaSiape}
                                                    workload={member.ordinanceMember.workload}
                                                    type={member.ordinanceMember.memberType}
                                                />

                                                {/* <div className="flex space-x-6 justify-center items-center h-6 mt-3 p-2 bg-gray-400 text-gray-500 text-sm font-light rounded-full outline-none border-none">
                                                    <span>
                                                        
                                                        {member.name}
                                                    </span>
                                                    <span className="flex flex-col justify-center items-center text-center h-6 pl-6 border-l border-zinc-500">
                                                        
                                                        {member.matriculaSiape}
                                                    </span>
                                                    <span className="flex flex-col justify-center items-center text-center h-6 pl-6 border-l border-zinc-500">
                                                        
                                                        {member.ordinanceMember.workload}
                                                    </span>
                                                    <span className="flex flex-col justify-center items-center text-center h-6 pl-6 border-l border-zinc-500">
                                                        
                                                        {member.ordinanceMember.memberType}
                                                    </span>
                                                    
                                                </div> */}

                                                <button
                                                    // onClick={() => handleRemoveMemberWorkload(member.id, workloads.filter((i) => i.memberId === member.id).at(0)?.id as string)}
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
                                        // onChange={event => setNumberRevoked(event.target.value)}
                                        // value={numberRevoked}
                                        />
                                    </div>
                                    : <div></div>
                                }
                            </div>
                            {/* <div className="flex justify-center">
                        <button
                            type="submit"
                            // disabled={loadingCreate}
                            className="flex justify-center items-center w-[140px] h-[50px] mt-10 leading-none bg-green-300 rounded font-medium text-base hover:bg-green-700 transition-colors disabled:opacity-50"
                        // onClick={handleOpenModal}
                        >
                            Cadastrar Portaria
                        </button>
                    </div> */}
                        </form>

                        <div className="flex justify-between my-8">
                            <button
                                onClick={handleCloseModal}
                                className="flex justify-center items-center w-[130px] h-[35px] mx-3 leading-none bg-red-700 rounded font-medium text-base hover:bg-red-800 transition-colors disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleUpdateOrdinanceAdmin(ordinances.at(0)?.id as string)}
                                className="flex justify-center items-center w-[130px] h-[35px] mx-3 leading-none bg-green-300 rounded font-medium text-base hover:bg-green-700 transition-colors disabled:opacity-50"
                            >
                                Confirmar
                            </button>
                        </div>

                    </div>


                </Modal>

            </main>

        </div>

    );
}