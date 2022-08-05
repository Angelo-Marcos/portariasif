import { format } from "date-fns";

interface OrdinanceProps {
    number: string;
    effectiveStartDate: Date;
    members: Member[];
    type: 'progression' | 'designation';
    subject: string;
}

interface Member {
    name: string;
}

export function Ordinance(props: OrdinanceProps) {
    const effectiveStartDateFormated = format(props.effectiveStartDate, "dd/MM/yyyy")
    const members = props.members.map((member) => {
        return (
            <span>{member.name}</span>
        )
    })

    return (
        <tr className="border-b border-green-300">
            <td>{props.number}</td>
            <td>{effectiveStartDateFormated}</td>
            <td className="flex flex-col">{members}</td>
            <td>{props.type === 'progression' ? 'Progressão' : 'Designação'}</td>
            <td>{props.subject}</td>
        </tr>
    )
}