interface OrdinanceProps {
    number: string;
    type: 'progression' | 'designation';
    members: Member[];
}

interface Member {
    name: string;
}

export function OrdinanceAside(props: OrdinanceProps) {
    const members = props.members.map((member) => {
        return (
            <span>{member.name}</span>
        )
    })

    return (
        <div className="flex flex-col items-center w-full mb-2 font-light text-sm text-black border-2 border-green-300 rounded-xl">
            <span className="flex flex-col w-full p-1 border-b border-green-300 text-center font-bold">
                {members}
            </span>
            <span className="w-full p-1 text-center font-semibold">
                {props.number} - {props.type === 'progression' ? 'Progressão' : 'Designação'}
            </span>
        </div>
    )
}