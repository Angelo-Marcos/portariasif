import { Header } from "../components/Header";
import InputMask from "react-input-mask"
import {
    MemberType,
    OrdinanceType,
    useGetOrdinanceByNumberQuery,
    useGetOrdinancesAllQuery,
    useGetOrdinancesByDateQuery,
    useGetOrdinancesByMemberMatriculaQuery,
    useGetOrdinancesByMemberNameQuery,
    useGetOrdinancesByMemberTypeQuery,
    useGetOrdinancesByTypeQuery
} from "../graphql/generated";
import { useForm } from "react-hook-form";
import { OrdinanceSearch } from "../components/OrdinanceSearch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "../context/UserContext"
import { WarningCircle } from "phosphor-react";

interface IFormInputSearch {
    number: string,
    effectiveStartDate: Date,
    effectiveEndDate: Date,
    ordinanceType: OrdinanceType,
    member: string,
    matricula: string,
    memberType: MemberType
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

    const { register, handleSubmit: handleSubmitSearch, getValues, formState: { errors: errorsOrdinance, } } = useForm<IFormInputSearch>({
        resolver: yupResolver(validationsForm)
    });

    async function onSubmit(data: IFormInputSearch) {

    }

    const { data: dataOrdinancesAll } = useGetOrdinancesAllQuery({
        variables: {
            number: getValues('number'),
            matricula: +getValues('matricula'),
            name: getValues('member'),
            ordinanceType: getValues('ordinanceType'),
            memberType: getValues('memberType')
        }
    })

    const { data: dataOrdinanceByNumber } = useGetOrdinanceByNumberQuery({
        skip: getValues('number')?.length != 8,
        variables: {
            number: getValues('number')
        }
    })

    const { data: dataOrdinancesByMemberMatricula } = useGetOrdinancesByMemberMatriculaQuery({
        skip: getValues("matricula")?.length <= 3,
        variables: {
            matriculaSiape: +getValues('matricula')
        }
    })

    const { data: dataOrdincesByMemberName } = useGetOrdinancesByMemberNameQuery({
        skip: getValues('member')?.length <= 3,
        variables: {
            name: getValues('member')
        }
    })

    const { data: dataOrdinancesByDate } = useGetOrdinancesByDateQuery({
        skip: getValues("effectiveStartDate") == undefined,
        variables: {
            dateStart: getValues('effectiveStartDate'),
            dateEnd: getValues('effectiveEndDate')
        }
    })

    const { data: dataOrdinancesByType } = useGetOrdinancesByTypeQuery({
        skip: getValues("ordinanceType")?.length <= 3,
        variables: {
            ordinanceType: getValues('ordinanceType')
        }
    })

    const { data: dataOrdinancesByMemberType } = useGetOrdinancesByMemberTypeQuery({
        skip: getValues("memberType")?.length <= 3,
        variables: {
            memberType: getValues('memberType')
        },
        fetchPolicy: "network-only",
    })

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

    let workloadTotal = dataOrdincesByMemberName?.members.reduce((acc, member) => {
        const sumMember = member.ordinanceMember.reduce((sum, workload) => sum + workload.workload, 0)
        return acc + sumMember;
    }, 0);

    return (

        <div className="flex flex-col min-h-screen">
            <Header
                name={user.name}
                given_name={user.given_name}
                email={user.email}
                picture={user.picture}
            />
            <div className="flex flex-col items-center justify-center pt-[130px] px-48">
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
                    <div className="my-10">
                        {
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

                        }
                    </div>
                </form>
            </div >
        </div >
    );

}

