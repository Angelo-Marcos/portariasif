import { Header } from "../components/Header";
import InputMask from "react-input-mask"
import { FormEvent, useState } from "react";
import { MemberType, OrdinanceType, useGetOrdinanceByNumberQuery, useGetOrdinancesByMemberMatriculaQuery, useGetOrdinancesByMemberNameQuery } from "../graphql/generated";
import { SubmitHandler, useForm } from "react-hook-form";
import { get } from "react-hook-form/dist/utils";
import { number } from "yup";
import { Ordinance } from "../components/Ordinance";
import { tr } from "date-fns/locale";


interface IFormInputSearch {
    number: string,
    effectiveStartDate: Date,
    effectiveEndDate: Date,
    ordinanceType: OrdinanceType,
    member: string,
    matricula: string,
    memberType: MemberType
}

export function Search() {
    // const [number, setNumber] = useState('');
    // const [ordinanceType, setOrdinanceType] = useState<OrdinanceType>(OrdinanceType.Designation);
    // const [effectiveStartDate, setEffectiveStartDate] = useState('');
    // const [effectiveEndDate, setEffectiveEndDate] = useState('');
    // const [name, setName] = useState('');
    // const [matriculaSiape, setMatriculaSiape] = useState('');
    // const [memberType, setMemberType] = useState<MemberType>(MemberType.Student);

    const { register, handleSubmit: handleSubmitSearch, getValues, formState: { errors: errorsOrdinance } } = useForm<IFormInputSearch>();

    async function onSubmit(data: IFormInputSearch) {

    }

    const { data: dataOrdinanceByNumber } = useGetOrdinanceByNumberQuery({
        variables: {
            number: getValues('number')
        }
    })

    const { data: dataOrdinancesByMemberMatricula } = useGetOrdinancesByMemberMatriculaQuery({
        variables: {
            matriculaSiape: +getValues('matricula')
        }
    })

    const { data: dataOrdincesByMemberName } = useGetOrdinancesByMemberNameQuery({
        variables: {
            name: getValues('member')
        }
    })

    console.log(
        dataOrdincesByMemberName?.members.map(member => {
            return (
                member.ordinances.map(ordinance => {


                    ordinance.number
                    ordinance.ordinanceType
                    ordinance.effectiveStartDate
                    ordinance.effectiveEndDate
                    member.name

                })

            )
        })
    )

    console.log(getValues('member'))

    return (

        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-col items-center justify-center px-48">
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
                                // onChange={event => setNumber(event.target.value)}
                                className="appearance-none block w-[120px] h-[30px] px-2 ml-4 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"

                            />
                        </div>
                        <div className="flex mt-4">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Tipo:
                            </label>
                            <select
                                // {...register("ordinanceType")}
                                className="appearance-none block w-[194px] h-[30px] p-0 px-2 ml-4 border-none bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            // onChange={event => setOrdinanceType(event.target.value as OrdinanceType)}
                            // value={ordinanceType}
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
                                // {...register("effectiveStartDate")}
                                type="date"
                                className="appearance-none block w-[170px] h-[30px] px-2 ml-4 border-none bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500" placeholder=" "
                            // onChange={event => setEffectiveStartDate(event.target.value)}
                            // value={effectiveStartDate}
                            /></div>

                    </div>
                    <div className="">
                        <div className="flex mt-4 ">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Data de encerramento da vigência:
                            </label>
                            <input

                                type="date"
                                className="appearance-none block w-[170px] h-[30px] px-2 ml-4 border-none bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            // onChange={event => setEffectiveEndDate(event.target.value)}
                            // value={effectiveEndDate}
                            /></div>
                    </div>
                    <div className="mt-4">
                        <div className="flex">
                            <label className="block tracking-wide font-light text-gray-500 text-xl">
                                Membro:
                            </label>
                            <input
                                {...register("member")}
                                className="appearance-none block w-[320px] h-[30px] px-2 ml-2 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            // onChange={event => setName(event.target.value)}
                            // value={name}
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
                        // onChange={event => setMatriculaSiape(event.target.value)}
                        // value={matriculaSiape}
                        />
                    </div>
                    <div className="flex mt-4">
                        <label className="block tracking-wide font-light text-gray-500 text-xl">
                            Tipo:
                        </label>
                        <select
                            // {...register("memberType")}
                            className="appearance-none block w-[120px] h-[30px] p-0 px-2 ml-2 border-none bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                        // onChange={event => setMemberType(event.target.value as MemberType)}
                        // value={memberType}
                        >
                            <option value="" className="text-gray-500 text-xl font-light"></option>
                            <option value="teacher" className="text-gray-500 text-xl font-light">Docente</option>
                            <option value="TAE" className="text-gray-500 text-xl font-light">TAES</option>
                            <option value="student" className="text-gray-500 text-xl font-light">Discente</option>
                        </select>
                    </div>
                    <div className="flex mb-4">
                        <button
                            // onClick={handleClickSearch}
                            type="submit"
                            className="flex justify-center items-center w-[140px] h-[50px] mt-14 leading-none bg-green-300 rounded font-medium text-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            Pesquisar
                        </button>
                    </div>
                    <div className="my-10">
                        {dataOrdinanceByNumber?.ordinance != null || dataOrdinancesByMemberMatricula != null || dataOrdincesByMemberName != null ?
                            <table className="w-full font-light text-md bg-green-300 dark:text-gray-400 ">
                                <thead className="bg-green-300 font-normal border-b dark:bg-green-300 dark:text-white">
                                    <tr>
                                        <th className="px-3">Número</th>
                                        <th>Tipo de Portaria</th>
                                        <th className="px-0">Data Início Vigência</th>
                                        <th className="px-0">Data Fim Vigência</th>
                                        <th>Membros</th>
                                    </tr>
                                </thead>
                                <tbody className="text-black text-center border-b dark:bg-white dark:border-gray-700">

                                    {getValues('number').length == 8 &&
                                        <tr>
                                            <td>{dataOrdinanceByNumber?.ordinance?.number}</td>
                                            <td>{dataOrdinanceByNumber?.ordinance?.ordinanceType}</td>
                                            <td>{dataOrdinanceByNumber?.ordinance?.effectiveStartDate}</td>
                                            <td>{dataOrdinanceByNumber?.ordinance?.effectiveEndDate}</td>
                                            <td>
                                                {dataOrdinanceByNumber?.ordinance?.members.map(member => {
                                                    return (
                                                        <span className="flex flex-col justify-center items-center px-2 font-light text-gray-500 text-md ">
                                                            {member.name}
                                                        </span>
                                                    )
                                                })}
                                            </td>
                                        </tr>
                                    }

                                    {getValues("matricula").length >= 3 &&
                                        dataOrdinancesByMemberMatricula?.member?.ordinances.map(ordinance => {
                                            return (
                                                <tr>
                                                    <td>{ordinance.number}</td>
                                                    <td>{ordinance.ordinanceType}</td>
                                                    <td>{ordinance.effectiveStartDate}</td>
                                                    <td>{ordinance.effectiveEndDate}</td>
                                                    <td>{dataOrdinancesByMemberMatricula.member?.name}</td>
                                                </tr>

                                            )
                                        })
                                    }

                                    {getValues("member").length >= 1 &&
                                        dataOrdincesByMemberName?.members.map(member => {
                                            return (
                                                member.ordinances.map(ordinance => {
                                                    return (
                                                        <tr>

                                                            <td>{ordinance.number}</td>
                                                            <td>{ordinance.ordinanceType}</td>
                                                            <td>{ordinance.effectiveStartDate}</td>
                                                            <td>{ordinance.effectiveEndDate}</td>
                                                            <td>
                                                                {member.name}
                                                            </td>
                                                        </tr>
                                                    )

                                                })
                                                // <tr>
                                                //     <td>{member.name}</td>
                                                // </tr>

                                            )
                                        })
                                    }


                                </tbody>
                            </table> :
                            <span className="flex w-full mt-6 mb-7 font-medium justify-center text-x text-red-900 border-b border-green-300">
                                Nenhuma portaria encontrada!
                            </span>}
                    </div>
                </form>
            </div >

        </div >
    );

}

