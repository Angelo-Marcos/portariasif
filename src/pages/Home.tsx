import { gql, useQuery } from "@apollo/client";
import { Header } from "../components/Header";
import { Ordinance } from "../components/Ordinance";

const GET_ORDINANCES_QUERY = gql`
    query MyQuery {
        ordinances(orderBy: effectiveStartDate_ASC) {
            id
            number
            effectiveStartDate
            members {
                name
            }
            ordinanceType
            subject
        }
    }
    
`

interface GetOrdinancesQueryResponse {
    ordinances: {
        id: string,
        number: string,
        effectiveStartDate: Date,
        members: {
            name: string,
        },
        ordinanceType: 'progression' | 'designation',
        subject: string
    }[]
}

export function Home() {

    const { data } = useQuery<GetOrdinancesQueryResponse>(GET_ORDINANCES_QUERY)

    console.log(data)

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex flex-1 px-48">
                <aside className="flex flex-col w-[276px] px-[10px] bg-gray-200 mt-[54px] justify-center ">
                    <span className="flex mt-[21px] font-light text-xl text-gray-500 justify-center">
                        Recentes
                    </span>
                    <div className="flex-1 h-full border-t border-green-300">

                    </div>
                </aside>

                <div className="flex-1 max-h-full mt-[82px] ml-[70px] border-t border-green-300">
                    <span className="flex ml-[13px] mt-[10px] font-medium text-xl text-red-900">
                        Próximas da Data de Encerramento
                    </span>

                    <div className="w-full mt-4 overflow-x-auto relative shadow-md border border-green-300 sm:rounded-lg">
                        <table className="w-full font-light text-sm bg-green-300 dark:text-gray-400">
                            <thead className="bg-green-300 font-normal border-b dark:bg-green-300 dark:text-white">
                                <tr>
                                    <th className="px-3">Número</th>
                                    <th className="px-0">Data Início Vigência</th>
                                    <th>Membro</th>
                                    <th>Tipo de Portaria</th>
                                    <th>Assunto</th>
                                </tr>
                            </thead>
                            <tbody className="text-black text-center border-b dark:bg-white dark:border-gray-700">
                                {data?.ordinances.map(ordinance => {
                                    return (
                                        <Ordinance
                                            key={ordinance.id}
                                            number={ordinance.number}
                                            effectiveStartDate={new Date(ordinance.effectiveStartDate)}
                                            member={ordinance.members.name}
                                            type={ordinance.ordinanceType}
                                            subject={ordinance.subject}
                                        />
                                    )
                                })}
                            </tbody>
                        </table>

                    </div>


                </div>
            </main>

        </div>

    );
}