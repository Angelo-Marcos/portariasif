interface MemberProps extends MouseEventInit {
    name: string,
    matriculaSiape: number,
    workload?: number,
    type: 'vicePresident' | 'president' | 'member';
}


export function Member(props: MemberProps) {
    return (
        <div className="flex flex-wrap justify-between mt-4">
            <div className="flex">
                <input
                    className="appearance-none block w-[300px] h-5 px-2 bg-gray-400 text-gray-500 font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 disabled:opacity-50"
                    value={props.name ?? ''}
                    disabled={true}
                />
            </div>
            <div className="flex ml-4">
                <input
                    className="appearance-none block w-[100px] h-5 px-2 ml-2 bg-gray-400 text-gray-500 font-light rounded-md outline-none border-none focus:outline-none focus:ring-1 focus:ring-green-500 disabled:opacity-50"
                    value={props.matriculaSiape ?? ''}
                    disabled={true}
                />
            </div>
            <div className="flex ml-4">
                <input
                    className="appearance-none block w-[120px] h-5 p-0 px-2 ml-2 border-none bg-gray-400 text-gray-500 font-light rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 disabled:opacity-50"
                    value={props.type === 'vicePresident' ? 'Vice-Presidente' : props.type === 'president' ? 'Presidente' : 'Membro'}
                    disabled={true}
                >
                </input>
            </div>
            <div className="flex ml-4">
                <input
                    className="appearance-none block w-[40px] h-5 px-2 ml-2 bg-gray-400 text-gray-500 font-light rounded-md outline-none border-none focus:outline-none focus:ring-1 focus:ring-green-500 disabled:opacity-50"
                    value={props.workload ?? ''}
                    disabled={true}
                />
            </div>

        </div>
    )
}