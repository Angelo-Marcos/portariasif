import { FormEvent, useState } from "react";
import InputMask from "react-input-mask"
import { Header } from "../components/Header";
import {
    MemberType,
    OrdinanceType,
    useCreateMemberMutation,
    useCreateOrdinanceMutation,
    useDeleteMemberMutation,
    useDeleteOrdinanceMutation,
    useGetMembersQuery,
    usePublishMemberMutation,
    usePublishOrdinanceMutation,
    useUpdateMemberMutation,
    useUpdateOrdinanceMutation,
    useUpdateOrdinanceSituationMutation
} from "../graphql/generated";
import Modal from "react-modal"
import { Member } from "../components/Member";
import { PlusCircle, XCircle } from "phosphor-react"
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { getVariableValues } from "graphql";
import { format } from "date-fns";

interface MemberProps {
    id: string;
    name: string;
    memberType: 'student' | 'teacher' | 'TAE';
    matriculaSiape: number;
}

interface IFormInputOrdinance {
    number: string,
    effectiveStartDate: Date,
    ordinanceType: OrdinanceType,
    effectiveEndDate: Date,
    subject: string,
    numberRevoked: string,
}

const validationsForm = yup.object({
    number: yup.string().required("Campo obrigatório!"),
    // effectiveStartDate: yup.date().required("Campo obrigatório!"),
    ordinanceType: yup.string().required("Campo obrigatório!"),
    subject: yup.string().required("Campo obrigatório!"),
    numberRevoked: yup.string(),
}).required();

export function Register() {
    const { register: registerOrdinance, handleSubmit: handleSubmitOrdinance, getValues: getValuesOrdinance, formState: { errors: errorsOrdinance } } = useForm<IFormInputOrdinance>({
        resolver: yupResolver(validationsForm)
    });
    const onSubmitOrdinance = async (data: IFormInputOrdinance) => {
        if (members.length > 0) {
            String(data.effectiveEndDate) === '' ?
                await createOrdinance({
                    variables: {
                        number: data.number,
                        effectiveStartDate: data.effectiveStartDate,
                        ordinanceType: data.ordinanceType,
                        subject: data.subject
                    },

                }) : await createOrdinance({
                    variables: {
                        number: data.number,
                        effectiveStartDate: data.effectiveStartDate,
                        ordinanceType: data.ordinanceType,
                        subject: data.subject,
                        effectiveEndDate: data.effectiveEndDate,
                    },

                })

            radio === 'yes'
                && await updateOrdinanceSituation({
                    variables: {
                        number: data.numberRevoked
                    }
                })

            handleOpenModal()
        }
    };


    const [name, setName] = useState('');
    const [memberType, setMemberType] = useState<MemberType>(MemberType.Student);
    const [matriculaSiape, setMatriculaSiape] = useState('');
    const [radio, setRadio] = useState('');

    const [members, setMembers] = useState<MemberProps[]>([])

    // Mutations Graphql
    const [createOrdinance, { loading: loadingCreate, data: dataCreateOrdinance }] = useCreateOrdinanceMutation();
    const [createMember, { loading: loadingCreateMember, data: dataCreateMember }] = useCreateMemberMutation();
    const [updateOrdinance, { loading: loadingOrdinanceUpdate }] = useUpdateOrdinanceMutation();
    const [updateOrdinanceSituation] = useUpdateOrdinanceSituationMutation();
    const [updateMember, { loading: loadingMemberUpdate }] = useUpdateMemberMutation();
    const [publishOrdinance, { loading: loadingPublishOrdinance }] = usePublishOrdinanceMutation();
    const [publishMember, { loading: loadingPublishMember }] = usePublishMemberMutation();
    const [deleteOrdinance, { loading: loadingDeleteOrdinance }] = useDeleteOrdinanceMutation();
    const [deleteMember, { loading: loadingDeleteMember }] = useDeleteMemberMutation();

    const { data: dataMembers } = useGetMembersQuery();

    console.log(dataMembers)

    const membersFilters = dataMembers?.members.filter((member) => member.name.toLowerCase().startsWith(name.toLocaleLowerCase()))

    const handleClickAutoComplete = (member: MemberProps) => {
        const dataMembers: MemberProps = {
            id: member.id,
            name: member.name,
            memberType: member.memberType,
            matriculaSiape: member.matriculaSiape
        }

        setMembers(oldState => [...oldState, dataMembers])
        setName('')
    }

    const [modalIsOpen, setIsOpen] = useState(false);
    const handleOpenModal = () => { setIsOpen(true) };
    const handleCloseModal = () => { setIsOpen(false) };

    // async function handleCreateOrdinance(event: FormEvent) {
    //     event.preventDefault();

    //     getValuesOrdinance("effectiveEndDate") === null ?
    //         await createOrdinance({
    //             variables: {
    //                 number: getValuesOrdinance("number"),
    //                 effectiveStartDate: getValuesOrdinance("effectiveStartDate"),
    //                 ordinanceType: getValuesOrdinance("ordinanceType"),
    //                 subject: getValuesOrdinance("subject")
    //             },

    //         }) : await createOrdinance({
    //             variables: {
    //                 number: getValuesOrdinance("number"),
    //                 effectiveStartDate: getValuesOrdinance("effectiveStartDate"),
    //                 ordinanceType: getValuesOrdinance("ordinanceType"),
    //                 effectiveEndDate: getValuesOrdinance("effectiveEndDate"),
    //                 subject: getValuesOrdinance("subject")
    //             },

    //         })

    //     radio === 'yes'
    //         && await updateOrdinanceSituation({
    //             variables: {
    //                 number: getValuesOrdinance("numberRevoked")
    //             }
    //         })
    // }

    const handleUpdateMemberOrdinance = () => {
        members.length > 0 &&
            members.map((member) => {
                updateMember({
                    variables: {
                        idMember: member.id,
                        idOrdinance: dataCreateOrdinance?.createOrdinance?.id as string
                    }
                })
                updateOrdinance({
                    variables: {
                        idMember: member.id,
                        idOrdinance: dataCreateOrdinance?.createOrdinance?.id as string
                    }
                })
            })

        // setNumber('');
        // setEffectiveStartDate('');
        // setOrdinanceType(OrdinanceType.Designation);
        // setEffectiveEndDate('');
        // setSubject('');
        // setRadio('');
        // setNumberRevoked('');

        // setName('');
        // setMatriculaSiape(0)
        // setMemberType(MemberType.Student)

        setMembers([])

        handleCloseModal();
    }

    const handleAddNewMember = async () => {
        await createMember({
            variables: {
                name: name,
                memberType: memberType,
                matriculaSiape: Number(matriculaSiape)
            }
        }).then(res => {
            const dataMembers: MemberProps = {
                id: String(res.data?.createMember?.id),
                name: name,
                memberType: memberType,
                matriculaSiape: Number(matriculaSiape)
            }

            setMembers(oldState => [...oldState, dataMembers])
        })

        setName('');
        setMatriculaSiape('')
        setMemberType(MemberType.Student)
    }

    const handleRemoveMember = (id: string) => {
        // deleteMember({
        //     variables: {
        //         id: id,
        //     }
        // }).then(res => {
        setMembers(oldState => oldState.filter(
            member => member.id != id
        ))
        // })
    }

    const handlePublishOrdinance = () => {
        handleUpdateMemberOrdinance();

        publishOrdinance({
            variables: {
                id: dataCreateOrdinance?.createOrdinance?.id,
                number: dataCreateOrdinance?.createOrdinance?.number,
            }
        })

        const publishMembers = () => {
            members.map((id) => {
                publishMember({
                    variables: {
                        id: id.id,
                    }
                })
            })
        }

        publishMembers();

        // setNumber('');
        // setEffectiveStartDate('');
        // setOrdinanceType(OrdinanceType.Designation);
        // setEffectiveEndDate('');
        // setSubject('');
        // setName('');
        // setMemberType(MemberType.Student);
        // setRadio('');
        // setNumberRevoked('');

        handleCloseModal();
    }

    const handleDeleteOrdinance = async () => {
        await deleteOrdinance({
            variables: {
                id: dataCreateOrdinance?.createOrdinance?.id
            }
        })

        // const deleteMembers = () => {
        //     members.map((id) => {
        //         deleteMember({
        //             variables: {
        //                 id: id.id
        //             }
        //         })
        //     })
        // }

        // deleteMembers();

        handleCloseModal();
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-col items-center justify-center px-48">
                <span className="flex w-full mt-6 mb-7 font-medium justify-center text-xl text-red-900 border-b border-green-300">
                    Preencha os campos abaixo
                </span>
                <form onSubmit={handleSubmitOrdinance(onSubmitOrdinance)} className="w-full max-w-7xl">
                    <div className="flex flex-wrap justify-between">
                        <div className="flex">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Número:
                            </label>
                            <InputMask
                                mask="999/9999"
                                {...registerOrdinance("number")}
                                className="appearance-none block w-[120px] h-[30px] px-2 ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            // onChange={event => setNumber(event.target.value)}
                            // value={number}
                            />
                            <p className="absolute mt-8 text-red-800 text-sm">
                                {errorsOrdinance.number?.message}
                            </p>
                        </div>
                        <div className="flex">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Data de início da vigência:
                            </label>
                            <input
                                {...registerOrdinance("effectiveStartDate")}
                                type="date"
                                className="appearance-none block w-[170px] h-[30px] px-2 ml-4 border-none bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500" placeholder=" "
                            // onChange={event => setEffectiveStartDate(event.target.value)}
                            // value={effectiveStartDate}
                            />
                            <p className="absolute mt-8 text-red-800 text-sm">
                                {errorsOrdinance.effectiveStartDate?.message}
                            </p>
                        </div>
                        <div className="flex">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Tipo:
                            </label>
                            <select
                                {...registerOrdinance("ordinanceType")}
                                className="appearance-none block w-[194px] h-[30px] p-0 px-2 ml-4 border-none bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            // onChange={event => setOrdinanceType(event.target.value as OrdinanceType)}
                            // value={ordinanceType}
                            >
                                <option value="" className="text-gray-500 text-xl font-light"></option>
                                <option value="progression" className="text-gray-500 text-xl font-light">Progressão</option>
                                <option value="designation" className="text-gray-500 text-xl font-light">Designação</option>
                            </select>
                            <p className="absolute mt-8 text-red-800 text-sm">
                                {errorsOrdinance.ordinanceType?.message}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between mt-[28px]">
                        <div className="flex ">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Data de encerramento da vigência:
                            </label>
                            <input
                                {...registerOrdinance("effectiveEndDate")}
                                type="date"
                                className="appearance-none block w-[170px] h-[30px] px-2 ml-4 border-none bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            // onChange={event => setEffectiveEndDate(event.target.value)}
                            // value={effectiveEndDate}
                            />
                        </div>
                        <div className="flex">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Assunto:
                            </label>
                            <input
                                {...registerOrdinance("subject")}
                                className="appearance-none block w-[300px] h-[30px] px-2 ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            // onChange={event => setSubject(event.target.value)}
                            // value={subject}
                            />
                            <p className="absolute mt-8 text-red-800 text-sm">
                                {errorsOrdinance.subject?.message}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap mt-[28px]">
                        <div className="flex">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Membro:
                            </label>
                            <div className="flex flex-col">
                                <input
                                    // {...registerMember("name")}
                                    className="appearance-none block w-[320px] h-[30px] px-2 ml-2 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                    onChange={event => setName(event.target.value)}
                                    value={name}
                                />
                                {members.length <= 0 &&
                                    <p className="absolute mt-8 ml-2 text-red-800 text-sm">
                                        Nenhum membro inserido!
                                    </p>
                                }
                                <div className="absolute z-10 w-[320px] max-h-xs ml-2 mt-[34px] mt bg-white rounded-md">
                                    <div className="flex flex-col">
                                        {membersFilters?.length !== 0 && name !== '' &&
                                            membersFilters?.map(member => {
                                                return (
                                                    <a
                                                        className="mb-1 px-2 text-gray-500 text-xs font-light cursor-pointer border-b border-green-700 rounded-md hover:bg-green-700 hover:text-white"
                                                        onClick={() => handleClickAutoComplete(member)}
                                                    >
                                                        {member.name} / {member.memberType === 'student' ? 'Discente' : member.memberType === 'teacher' ? 'Docente' : 'TAE'} / {member.matriculaSiape}
                                                    </a>
                                                )
                                            })}
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="flex ml-4">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Tipo:
                            </label>
                            <select
                                // {...registerMember("memberType")}
                                className="appearance-none block w-[120px] h-[30px] p-0 px-2 ml-2 border-none bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                onChange={event => setMemberType(event.target.value as MemberType)}
                            // value={memberType}
                            >
                                <option value="" className="text-gray-500 text-xl font-light"></option>
                                <option value="teacher" className="text-gray-500 text-xl font-light">Docente</option>
                                <option value="TAE" className="text-gray-500 text-xl font-light">TAES</option>
                                <option value="student" className="text-gray-500 text-xl font-light">Discente</option>
                            </select>
                        </div>
                        <div className="flex ml-4">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Matrícula/Siape:
                            </label>
                            <InputMask
                                // {...registerMember("matriculaSiape")}
                                mask="999999"
                                pattern="[0-9]{6,7}"
                                title="6 to 7 numbers"
                                className="appearance-none block w-[120px] h-[30px] px-2 ml-2 bg-gray-400 text-gray-500 text-xl font-light rounded-md outline-none border-none focus:outline-none focus:ring-1 focus:ring-green-500"
                                onChange={event => setMatriculaSiape(event.target.value)}
                                value={matriculaSiape}
                            />
                            <span
                                onClick={handleAddNewMember}
                                className="h-[30px] items-center text-green-300 ml-2 rounded-lg hover:bg-green-700 hover:text-white transition-colors disabled:opacity-50">
                                <PlusCircle size={28} />
                            </span>
                        </div>

                    </div>
                    <div>
                        <ul>
                            {members.map((member) => {
                                return (
                                    <div className="flex flex-wrap">
                                        <Member
                                            key={member.id}
                                            name={member.name}
                                            type={member.memberType}
                                            matriculaSiape={member.matriculaSiape}
                                        />
                                        <button
                                            onClick={() => handleRemoveMember(member.id)}
                                            className="flex justify-center items-center mt-[10px] ml-2 text-red-700 rounded-lg hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50">
                                            <XCircle size={28} />
                                        </button>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="flex flex-col mt-[28px]">
                        <div className="flex">
                            <label className="block tracking-wide font-bold text-gray-500 text-xl">
                                Esta portaria revoga outra portaria?
                            </label>

                            <label className="flex items-center tracking-wide ml-4 font-normal text-gray-500 text-xl cursor-pointer">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="yes"
                                    onChange={event => setRadio(event.target.value)}
                                    className="w-4 h-4 mr-1 text-green-300 border-gray-500 focus:ring-1 focus:ring-green-300 cursor-pointer"
                                />
                                Sim
                            </label>

                            <label className="flex items-center tracking-wide ml-4 font-normal text-gray-500 text-xl cursor-pointer">
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
                            ? <div className="flex mt-[14px]">
                                <label className="block tracking-wide font-light text-gray-500 text-xl">
                                    Digite o número da portaria a ser revogada:
                                </label>
                                <input
                                    {...registerOrdinance("numberRevoked")}
                                    // mask="999/9999"
                                    className="appearance-none block w-[120px] h-[30px] px-2 ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                // onChange={event => setNumberRevoked(event.target.value)}
                                // value={numberRevoked}
                                />
                            </div>
                            : <div></div>
                        }
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={loadingCreate}
                            className="flex justify-center items-center w-[140px] h-[50px] mt-14 leading-none bg-green-300 rounded font-medium text-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                        // onClick={handleOpenModal}
                        >
                            Cadastrar Portaria
                        </button>
                    </div>
                </form>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="modal"
                className="flex justify-center items-center h-screen w-full rounded"
            >
                <div className="flex flex-col justify-center items-center bg-white border border-green-700 h-[450px] w-[500px] rounded-lg">
                    <strong className="flex justify-center my-4 text-red-900">Confirme as informações!</strong>

                    <div className="w-[440px] border border-black rounded-lg py-4 overflow-y-auto">
                        <label className="flex ml-2 text-black"><strong className="mr-2">Número:</strong> {getValuesOrdinance("number")}</label>
                        <label className="flex ml-2 text-black"><strong className="mr-2">Data de início da vigência:</strong>{String(getValuesOrdinance("effectiveStartDate"))}</label>
                        <label className="flex ml-2 text-black"><strong className="mr-2">Tipo:</strong>{getValuesOrdinance("ordinanceType") === 'progression' ? 'Progressão' : 'Designação'}</label>
                        <label className="flex ml-2 text-black"><strong className="mr-2">Data de encerramento da vigência:</strong>{String(getValuesOrdinance("effectiveEndDate"))}</label>
                        <label className="flex ml-2 text-black"><strong className="mr-2">Assunto:</strong>{getValuesOrdinance("subject")}</label>
                        <label className="flex flex-col ml-2 text-black"><strong className="mr-2">Membro(s):</strong>{members.map((member) => {
                            return (
                                <span>{member.name} - {member.memberType === 'student' ? 'Discente' : member.memberType === 'teacher' ? 'Docente' : 'TAE'} - {member.matriculaSiape}</span>
                            )
                        })}</label>
                        <label className="flex ml-2 text-black"><strong className="mr-2">Esta portaria revoga outra portaria?</strong>{radio === 'yes' ? 'Sim' : 'Não'}</label>
                        {radio === 'yes'
                            && <label className="flex justify-center text-black"><strong>Número da portaria a ser revogada:</strong>{getValuesOrdinance("numberRevoked")}</label>}
                    </div>

                    <div className="flex justify-between my-8">
                        <button
                            onClick={handleDeleteOrdinance}
                            className="flex justify-center items-center w-[130px] h-[35px] mx-3 leading-none bg-red-700 rounded font-medium text-base hover:bg-red-800 transition-colors disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handlePublishOrdinance}
                            className="flex justify-center items-center w-[130px] h-[35px] mx-3 leading-none bg-green-300 rounded font-medium text-base hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            Confirmar
                        </button>
                    </div>

                </div>
            </Modal>
        </div>
    );
}