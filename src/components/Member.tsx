import { XCircle } from "phosphor-react"

interface MemberProps extends MouseEventInit {
    name: string,
    type: 'member' | 'president' | 'teacher'
    matriculaSiape: number
    workload: number
}


export function Member(props: MemberProps) {
    return (
        <div className="flex flex-wrap justify-between mt-[28px]">
            <div className="flex">
                {/* <label className="block tracking-wide font-light text-gray-500 text-xl">
                    Membro:
                </label> */}
                <input
                    // minLength={4}
                    // debounceTimeout={500}
                    className="appearance-none block w-[320px] h-[30px] px-2 bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 disabled:opacity-50"
                    value={props.name}
                    disabled={true}
                />
            </div>
            <div className="flex ml-4">
                {/* <label className="block tracking-wide font-light text-gray-500 text-xl">
                    Tipo:
                </label> */}
                <input
                    className="appearance-none block w-[120px] h-[30px] p-0 px-2 ml-2 border-none bg-gray-400 text-gray-500 text-xl font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 disabled:opacity-50"
                    value={props.type === 'member' ? 'Membro' : props.type === 'president' ? 'Presidente' : 'TAE'}
                    disabled={true}
                >
                </input>
            </div>
            <div className="flex ml-4">
                {/* <label className="block tracking-wide font-light text-gray-500 text-xl">
                    Matrícula/Siape:
                </label> */}
                <input
                    // minLength={4}
                    // debounceTimeout={500}
                    className="appearance-none block w-[120px] h-[30px] px-2 ml-2 bg-gray-400 text-gray-500 text-xl font-light rounded-md outline-none border-none focus:outline-none focus:ring-1 focus:ring-green-500 disabled:opacity-50"
                    value={props.matriculaSiape}
                    disabled={true}
                />
            </div>
            <div className="flex ml-4">
                {/* <label className="block tracking-wide font-light text-gray-500 text-xl">
                    Carga horária/semana:
                </label> */}
                <input
                    // minLength={4}
                    // debounceTimeout={500}
                    className="appearance-none block w-[120px] h-[30px] px-2 ml-2 bg-gray-400 text-gray-500 text-xl font-light rounded-md outline-none border-none focus:outline-none focus:ring-1 focus:ring-green-500 disabled:opacity-50"
                    value={props.workload}
                    disabled={true}
                />
            </div>

        </div>
    )
}