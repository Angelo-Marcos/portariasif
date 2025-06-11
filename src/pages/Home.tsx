import { Header } from "../components/Header";
import { Ordinance } from "../components/Ordinance";
import { OrdinanceAside } from "../components/OrdinanceAside";
import { useGetOrdinancesAsideQuery, useGetOrdinancesQuery } from "../graphql/generated";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../context/UserContext"
import { WarningCircle } from "phosphor-react";

export function Home() {

    const { data: ordinances } = useGetOrdinancesQuery()

    const { data: ordinancesAside } = useGetOrdinancesAsideQuery()

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

    return (
        <div className="flex-col min-h-screen">
            <Header
                name={user.name}
                given_name={user.given_name}
                email={user.email}
                picture={user.picture}
            />

            <main className="flex pt-[100px] px-48">
                <aside className="flex flex-col w-[276px] max-h-full px-[10px] bg-gray-200 mt-[54px] justify-center overflow-auto">
                    <span className="flex mt-[21px] font-light text-xl text-gray-500 justify-center">
                        Recentes
                    </span>
                    <div className="h-full py-2 border-t border-green-300">
                        {ordinancesAside?.ordinances.map(ordinance => {
                            return (
                                <OrdinanceAside
                                    key={ordinance.id}
                                    number={ordinance.number}
                                    type={ordinance.ordinanceType}
                                    subject={ordinance.subject}
                                />
                            )
                        })}
                    </div>
                </aside>

                <div className="flex-1 max-h-full mt-[54px] ml-[70px] border-t border-green-300">
                    <span className="flex ml-[13px] mt-[10px] font-medium text-xl text-red-900">
                        Próximas da Data de Encerramento
                    </span>

                    <div className="w-full mt-4 overflow-x-auto shadow-md border border-green-300 sm:rounded-lg">
                        <table className="w-full font-light text-sm bg-gray-200 dark:text-gray-400">
                            <thead className="bg-green-300 font-normal border-b dark:bg-green-300 dark:text-white">
                                <tr>
                                    <th className="px-3">Número</th>
                                    <th className="px-0">Data Fim Vigência</th>
                                    <th>Membro</th>
                                    <th>Tipo de Portaria</th>
                                    <th className="w-52">Assunto</th>
                                </tr>
                            </thead>
                            <tbody className="text-black text-center border-b dark:bg-white dark:border-gray-700">
                                {ordinances?.ordinances.map(ordinance => {
                                    return (
                                        <Ordinance
                                            key={ordinance.id}
                                            number={ordinance.number}
                                            effectiveEndDate={new Date(ordinance.effectiveEndDate)}
                                            members={ordinance.members}
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