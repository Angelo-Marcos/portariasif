import { Header } from "../components/Header";

export function Home() {

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

                </div>
            </main>

        </div>

    );
}