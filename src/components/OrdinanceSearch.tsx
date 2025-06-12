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
    return (
        // <tr>
        //     <td>{props.number}</td>
        //     <td>{props.ordinanceType === 'designation' ? 'Designação' : 'Progressão'}</td>
        //     <td>{props.effectiveStartDate ? format(new Date(props.effectiveStartDate), "dd/MM/yyyy") : "Data indisponível"}</td>
        //     <td>{props.effectiveEndDate ? format(new Date(props.effectiveEndDate), "dd/MM/yyyy") : "Data indisponível"}</td>
        //     <td>
        //         {props.members.map(member => {
        //             return (
        //                 <span className="flex flex-col justify-center items-center px-2 font-light text-gray-500 text-md ">
        //                     {member.name}
        //                 </span>
        //             )
        //         })}
        //     </td>
        //     <td>{props.workload}</td>
        // </tr>

        <div className="flex space-x-6 justify-center items-center p-2 bg-gray-400 text-gray-500 sm:text-sm lg:text-base font-light rounded-full outline-none border-none">
            <span>
                <p className="flex flex-col justify-center items-center text-center font-medium mb-1 text-xs text-black">Número</p>
                {props.number}
            </span>
            <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                <p className="mb-1 text-xs text-black font-medium">Tipo de portaria</p>
                {props.ordinanceType === 'designation' ? 'Designação' : 'Progressão'}
            </span>
            <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                <p className="mb-1 text-xs text-black font-medium">Data início</p>
                {props.effectiveStartDate ? format(new Date(props.effectiveStartDate), "dd/MM/yyyy") : "Data indisponível"}
            </span>
            <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                <p className="mb-1 text-xs text-black font-medium">Data final</p>
                {props.effectiveEndDate ? format(new Date(props.effectiveEndDate), "dd/MM/yyyy") : "Data indisponível"}
            </span>
            <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                <p className="mb-1 text-xs text-black font-medium">Membro(s)</p>
                {props.members.map(member => {
                    return (
                        <span className="flex flex-col justify-center items-center px-2 font-light text-gray-500 text-md ">
                            {member.name}
                        </span>
                    )
                })}
            </span>
            <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                <p className="mb-1 text-xs text-black font-medium">Carga horária</p>
                {props.workload}
            </span>
        </div>
    )
}