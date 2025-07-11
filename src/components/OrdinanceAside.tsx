interface OrdinanceProps {
    number: string;
    type: 'progression' | 'designation';
    subject: string;
}

export function OrdinanceAside(props: OrdinanceProps) {

    return (
        <div className="flex flex-col items-center w-full mb-2 font-light text-sm text-black border-2 border-green-700 rounded-xl">
            <span className="flex flex-col w-full p-1 border-b border-green-700 text-center font-bold">
                {props.subject}
            </span>
            <span className="w-full p-1 text-center font-semibold">
                {props.number} - {props.type === 'progression' ? 'Progressão' : 'Designação'}
            </span>
        </div>
    )
}