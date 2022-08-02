import { format } from "date-fns";

interface OrdinanceProps {
    number: string;
    effectiveStartDate: Date;
    member: string,
    type: 'progression' | 'designation';
    subject: string;
}

export function Ordinance(props: OrdinanceProps) {
    const effectiveStartDateFormated = format(props.effectiveStartDate, "dd/MM/yyyy")

    return (
        <tr className="border-b border-green-300">
            <td>{props.number}</td>
            <td>{effectiveStartDateFormated}</td>
            <td>{props.member}</td>
            <td>{props.type === 'progression' ? 'Progressão' : 'Designação'}</td>
            <td>{props.subject}</td>
        </tr>
    )
}