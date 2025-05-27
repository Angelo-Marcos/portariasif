import { isValid, parseISO, format } from "date-fns";
import { OrdinanceType } from "../graphql/generated";


interface OrdinanceProps {
    number: string;
    effectiveEndDate: Date;
    effectiveStartDate: Date;
    members: Member[];
    ordinanceType: OrdinanceType;
    workload: number;
}

interface Member {
    name: string;
}

export function OrdinanceSearch(props: OrdinanceProps) {
    // const effectiveEndDateFormated = format(props.effectiveEndDate, "dd/MM/yyyy")
    // const members = props.members.map((member) => {
    //     return (
    //         <span>{member.name}</span>
    //     )
    // })

    return (
        <tr>
            <td>{props.number}</td>
            <td>{props.ordinanceType === 'designation' ? 'Designação' : 'Progressão'}</td>
            <td>{props.effectiveStartDate ? format(new Date(props.effectiveStartDate), "dd/MM/yyyy") : "Data indisponível"}</td>
            <td>{props.effectiveEndDate ? format(new Date(props.effectiveEndDate), "dd/MM/yyyy") : "Data indisponível"}</td>
            <td>
                {props.members.map(member => {
                    return (
                        <span className="flex flex-col justify-center items-center px-2 font-light text-gray-500 text-md ">
                            {member.name}
                        </span>
                    )
                })}
            </td>
            <td>{props.workload}</td>
        </tr>
    )
}