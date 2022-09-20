import { FormEvent, useState } from "react";
import InputMask from "react-input-mask"
import { Header } from "../components/Header";
import { MemberType, OrdinanceType, useCreateOrdinanceMutation, useUpdateOrdinanceMutation } from "../graphql/generated";
import Modal from "react-modal"

export function Register() {

    const [number, setNumber] = useState('');
    const [effectiveStartDate, setEffectiveStartDate] = useState('');
    const [ordinanceType, setOrdinanceType] = useState<OrdinanceType>(OrdinanceType.Designation);
    const [effectiveEndDate, setEffectiveEndDate] = useState('');
    const [subject, setSubject] = useState('');
    const [name, setName] = useState('');
    const [memberType, setMemberType] = useState<MemberType>(MemberType.Student);
    const [radio, setRadio] = useState('');
    const [numberRevoked, setNumberRevoked] = useState('');

    const [createOrdinance, { loading: loadingCreate }] = useCreateOrdinanceMutation();
    const [updateOrdinance, { loading: loadingUpdate }] = useUpdateOrdinanceMutation();

    const [modalIsOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => { setIsOpen(true) };
    const handleCloseModal = () => { setIsOpen(false) };

    async function handleOrdinance(event: FormEvent) {
        event.preventDefault();

        await createOrdinance({
            variables: {
                number,
                effectiveStartDate,
                ordinanceType,
                effectiveEndDate,
                subject,
                name,
                memberType
            }
        })

        {
            radio === 'yes'
                && await updateOrdinance({
                    variables: {
                        number: numberRevoked
                    }
                })
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-col items-center justify-center px-48">
                <span className="flex w-full mt-6 mb-7 font-medium justify-center text-xl text-red-900 border-b border-green-300">
                    Preencha os campos abaixo
                </span>
                <form onSubmit={handleOrdinance} className="w-full max-w-7xl">
                    <div className="flex flex-wrap justify-between">
                        <div className="flex">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Número:
                            </label>
                            <InputMask
                                mask="999/9999"
                                className="appearance-none block w-[120px] h-[30px] px-2 ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                onChange={event => setNumber(event.target.value)}
                            />
                        </div>
                        <div className="flex">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Data de início da vigência:
                            </label>
                            <input
                                type="date"
                                className="appearance-none block w-[170px] h-[30px] px-2 ml-4 border-none bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500" placeholder=" "
                                onChange={event => setEffectiveStartDate(event.target.value)}
                            />
                        </div>
                        <div className="flex">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Tipo:
                            </label>
                            <select
                                className="appearance-none block w-[194px] h-[30px] p-0 px-2 ml-4 border-none bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                onChange={event => setOrdinanceType(event.target.value as OrdinanceType)}
                            >
                                <option value="" className="text-gray-500 text-xl font-light"></option>
                                <option value="progression" className="text-gray-500 text-xl font-light">Progressão</option>
                                <option value="designation" className="text-gray-500 text-xl font-light">Designação</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap mt-[28px]">
                        <div className="flex ">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Data de encerramento da vigência:
                            </label>
                            <input
                                type="date"
                                className="appearance-none block w-[170px] h-[30px] px-2 ml-4 border-none bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                onChange={event => setEffectiveEndDate(event.target.value)}
                            />
                        </div>
                        <div className="flex ml-[45px]">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Assunto:
                            </label>
                            <input
                                className="appearance-none block w-[300px] h-[30px] px-2 ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                onChange={event => setSubject(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap mt-[28px]">
                        <div className="flex">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Membro:
                            </label>
                            <input
                                className="appearance-none block w-[320px] h-[30px] px-2 ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                onChange={event => setName(event.target.value)}
                            />
                        </div>
                        <div className="flex ml-[89px]">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Tipo:
                            </label>
                            <select
                                className="appearance-none block w-[216px] h-[30px] p-0 px-2 ml-4 border-none bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                onChange={event => setMemberType(event.target.value as MemberType)}
                            >
                                <option value="" className="text-gray-500 text-xl font-light"></option>
                                <option value="teacher" className="text-gray-500 text-xl font-light">Docente</option>
                                <option value="TAE" className="text-gray-500 text-xl font-light">TAES</option>
                                <option value="student" className="text-gray-500 text-xl font-light">Discente</option>
                            </select>
                        </div>
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
                                <InputMask
                                    mask="999/9999"
                                    className="appearance-none block w-[120px] h-[30px] px-2 ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                    onChange={event => setNumberRevoked(event.target.value)}
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
                            onClick={handleOpenModal}
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
                <div className="flex flex-col items-center bg-white border border-green-700 h-[450px] w-[400px] rounded-lg">
                    <strong className="flex justify-center my-4  text-red-900">Confirme as informações!</strong>

                    <div className="w-[360px] border border-black rounded-lg py-4">
                        <label className="flex ml-2 text-black"><strong className="mr-2">Número:</strong> {number}</label>
                        <label className="flex ml-2 text-black"><strong className="mr-2">Data de início da vigência:</strong>{effectiveStartDate}</label>
                        <label className="flex ml-2 text-black"><strong className="mr-2">Tipo:</strong>{ordinanceType}</label>
                        <label className="flex ml-2 text-black"><strong className="mr-2">Data de encerramento da vigência:</strong>{effectiveEndDate}</label>
                        <label className="flex ml-2 text-black"><strong className="mr-2">Assunto:</strong>{subject}</label>
                        <label className="flex ml-2 text-black"><strong className="mr-2">Membro:</strong>{name}</label>
                        <label className="flex ml-2 text-black"><strong className="mr-2">Membro tipo:</strong>{memberType}</label>
                        <label className="flex ml-2 text-black"><strong className="mr-2">Esta portaria revoga outra portaria?</strong>{radio}</label>
                        {radio === 'yes'
                            && <label className="flex justify-center text-black"><strong>Número da portaria a ser revogada:</strong>{numberRevoked}</label>}
                    </div>

                    <div className="flex justify-between my-8">
                        <button
                            onClick={handleCloseModal}
                            className="flex justify-center items-center w-[130px] h-[35px] mx-3 leading-none bg-red-700 rounded font-medium text-base hover:bg-red-800 transition-colors disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        <button
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