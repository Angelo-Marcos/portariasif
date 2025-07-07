import { format } from "date-fns";

interface OrdinanceProps {
    number: string;
    effectiveEndDate: Date;
    members: Member[];
    type: 'progression' | 'designation';
    subject: string;
}

interface Member {
    id: string;
    name: string;
}

export function Ordinance(props: OrdinanceProps) {
    const effectiveEndDateFormated = format(props.effectiveEndDate, "dd/MM/yyyy")
    const members = props.members.map((member) => {
        return (
            <p key={member.id}>{member.name}</p>
        )
    })

    return (
        <tr className="border-b border-green-700">
            <td>{props.number}</td>
            <td>{effectiveEndDateFormated === "31/12/1969" ? "" : effectiveEndDateFormated}</td>
            <td className="text-center align-middle">{members}</td>
            <td>{props.type === 'progression' ? 'Progressão' : 'Designação'}</td>
            <td>{props.subject}</td>
        </tr>
    )
}