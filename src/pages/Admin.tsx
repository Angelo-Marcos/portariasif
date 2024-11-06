import { useState } from "react";
import { Header } from "../components/Header";
import { Ordinance } from "../components/Ordinance";
import { OrdinanceAside } from "../components/OrdinanceAside";
import { useGetOrdinanceByNumberQuery, useGetOrdinancesAsideQuery, useGetOrdinancesByMemberMatriculaQuery, useGetOrdinancesByMemberNameQuery, useGetOrdinancesQuery } from "../graphql/generated";
import { ClockClockwise, PlusCircle, Trash, XCircle } from "phosphor-react"

export function Admin() {

    const [search, setSearch] = useState('');

    const { data: ordinances } = useGetOrdinancesQuery()

    const { data: dataOrdinanceByNumber } = useGetOrdinanceByNumberQuery({
        variables: {
            number: search
        }
    })

    const { data: dataOrdinancesByMemberMatricula } = useGetOrdinancesByMemberMatriculaQuery({
        variables: {
            matriculaSiape: +search
        }
    })

    const { data: dataOrdincesByMemberName } = useGetOrdinancesByMemberNameQuery({
        variables: {
            name: search
        }
    })

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex  flex-col pt-[130px] px-48 mt-10">
                <div className="flex justify-center items-center w-full mt-4 pb-7 border-b border-green-300">
                    <input
                        placeholder="Pesquisar..."
                        className="flex appearance-none w-[620px] h-[40px] px-4 ml-2 bg-gray-400 text-gray-500 text-xl font-light rounded-3xl outline-none border-none placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-green-500"

                        onChange={event => setSearch(event.target.value)}
                    // value={matriculaSiape}
                    />
                </div>
                {
                    dataOrdinanceByNumber?.ordinance?.number.length as number >= 7 &&
                    <div className="flex space-x-6 justify-center items-center p-2 mt-10 bg-gray-400 text-gray-500 sm:text-sm lg:text-base font-light rounded-full outline-none border-none">

                        <span>{dataOrdinanceByNumber?.ordinance?.number}</span>
                        <span className="pl-6 border-l border-zinc-500">{dataOrdinanceByNumber?.ordinance?.ordinanceType}</span>
                        <span className="pl-6 border-l border-zinc-500">{dataOrdinanceByNumber?.ordinance?.effectiveStartDate}</span>
                        <span className="pl-6 border-l border-zinc-500">{dataOrdinanceByNumber?.ordinance?.effectiveEndDate}</span>
                        <span className="pl-6 border-l border-zinc-500">{dataOrdinanceByNumber?.ordinance?.members.map(member => {
                            return (
                                <span className="flex flex-col justify-center items-center text-center">{member.name}</span>
                            )
                        })}</span>
                        <div className="flex justify-center items-center text-center">
                            <span
                                className="flex justify-center items-center m-0 h-[40px] w-[40px] text-red-700 rounded-full hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50"
                            >
                                <Trash size={32} />
                            </span>
                            <span
                                className="flex justify-center items-center m-0 h-[40px] w-[40px] text-blue-700 rounded-full hover:bg-blue-700 hover:text-white transition-colors disabled:opacity-50"
                            >
                                <ClockClockwise size={32} />
                            </span>
                        </div>
                    </div>
                }


                {
                    dataOrdinancesByMemberMatricula?.member?.matriculaSiape as number === +search &&
                    dataOrdinancesByMemberMatricula?.member?.ordinances.map(ordinance => {
                        return (
                            <div className="flex space-x-6 justify-center items-center p-2 mt-10 bg-gray-400 text-gray-500 sm:text-sm lg:text-base font-light rounded-full outline-none border-none">
                                <div className="flex space-x-6 justify-center items-center p-2">
                                    <span className="flex flex-col justify-center items-center text-center">
                                        <p className="mb-1 text-xs text-black">Número</p>
                                        {ordinance?.number}
                                    </span>
                                    <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                        <p className="mb-1 text-xs text-black">Tipo de portaria</p>
                                        {ordinance?.ordinanceType}
                                    </span>
                                    <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                        <p className="mb-1 text-xs text-black">Data início</p>
                                        {ordinance?.effectiveStartDate}
                                    </span>
                                    <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                        <p className="mb-1 text-xs text-black">Data final</p>
                                        {ordinance?.effectiveEndDate}
                                    </span>
                                    <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                        <p className="mb-1 text-xs text-black">Membro(s)</p>
                                        {dataOrdinancesByMemberMatricula?.member?.name}
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
                                    >
                                        <ClockClockwise size={32} />
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }


                {
                    search === '' &&
                    ordinances?.ordinances.map(ordinance => {
                        return (
                            <div className="flex space-x-6 justify-center items-center p-2 mt-10 bg-gray-400 text-gray-500 sm:text-sm lg:text-base font-light rounded-full outline-none border-none">
                                <div className="flex space-x-6 justify-center items-center p-2">
                                    <span className="flex flex-col justify-center items-center text-center">
                                        <p className="mb-1 text-xs text-black">Número</p>
                                        {ordinance?.number}
                                    </span>
                                    <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                        <p className="mb-1 text-xs text-black">Tipo de portaria</p>
                                        {ordinance?.ordinanceType}
                                    </span>
                                    <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                        <p className="mb-1 text-xs text-black">Data início</p>
                                        {ordinance?.effectiveStartDate}
                                    </span>
                                    <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                        <p className="mb-1 text-xs text-black">Data final</p>
                                        {ordinance?.effectiveEndDate}
                                    </span>
                                    <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                                        <p className="mb-1 text-xs text-black">Membro(s)</p>
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
                                    >
                                        <ClockClockwise size={32} />
                                    </span>
                                </div>

                            </div>
                        )
                    })
                }

            </main>

        </div>

    );
}