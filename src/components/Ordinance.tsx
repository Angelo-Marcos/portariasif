interface OrdinanceProps {
    number: string;
    effectiveDate: Date;
    member: string;
    type: 'progression' | 'designation';
    subject: string;
}

export function Ordinance(props: OrdinanceProps) {
    return (
        <tr className="border-b border-green-300">
            <td>{props.number}</td>
            <td>{props.effectiveDate.toString()}</td>
            <td>{props.member}</td>
            <td>{props.type === 'progression' ? 'Progressão' : 'Designação'}</td>
            <td>{props.subject}</td>
        </tr>
    )
}