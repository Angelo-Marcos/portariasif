import { Header } from "../components/Header";
import { Ordinance } from "../components/Ordinance";
import { OrdinanceAside } from "../components/OrdinanceAside";
import { useGetOrdinancesAsideQuery, useGetOrdinancesQuery } from "../graphql/generated";

export function Admin() {

    const { data: ordinances } = useGetOrdinancesQuery()

    const { data: ordinancesAside } = useGetOrdinancesAsideQuery()

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex pt-[130px] px-48 mt-10">
                <div className="flex justify-center items-center w-full mt-4">
                    <input
                        placeholder="Pesquisar..."
                        className="flex appearance-none w-[620px] h-[40px] px-4 ml-2 bg-gray-400 text-gray-500 text-xl font-light rounded-3xl outline-none border-none placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-green-500"

                    // onChange={event => setMatriculaSiape(event.target.value)}
                    // value={matriculaSiape}
                    />
                </div>
            </main>

        </div>

    );
}