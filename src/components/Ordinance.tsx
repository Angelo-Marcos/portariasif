import { format } from "date-fns";

interface OrdinanceProps {
    number: string;
    effectiveEndDate: Date;
    members: Member[];
    type: 'progression' | 'designation';
    subject: string;
}

interface Member {
    name: string;
}

export function Ordinance(props: OrdinanceProps) {
    const effectiveEndDateFormated = format(props.effectiveEndDate, "dd/MM/yyyy")
    const members = props.members.map((member) => {
        return (
            <span>{member.name}</span>
        )
    })

    return (
        <tr className="border-b border-green-300">
            <td>{props.number}</td>
            <td>{effectiveEndDateFormated === "31/12/1969" ? "" : effectiveEndDateFormated}</td>
            <td className="flex-col items-center">{members}</td>
            <td>{props.type === 'progression' ? 'Progressão' : 'Designação'}</td>
            <td>{props.subject}</td>
        </tr>
    )
}