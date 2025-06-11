import { format } from "date-fns";
import { OrdinanceType } from "../graphql/generated";

interface OrdinanceProps {
    number: string,
    effectiveStartDate: Date,
    ordinanceType: OrdinanceType,
    effectiveEndDate: Date,
    subject: string,
    member: string;
}

interface Member {
    name: string;
}

export function OrdinanceAdmin(props: OrdinanceProps) {

    return (
        <div className="flex space-x-6 justify-center items-center p-2">
            <span className="flex flex-col justify-center items-center text-center">
                <p className="mb-1 text-xs text-black font-medium">Número</p>
                {props.number}
            </span>
            <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                <p className="mb-1 text-xs text-black font-medium">Tipo de portaria</p>
                {props.ordinanceType === 'designation' ? 'Designação' : 'Progressão'}
            </span>
            <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                <p className="mb-1 text-xs text-black font-medium">Data início</p>
                {format(new Date(props.effectiveStartDate), "dd/MM/yyyy")}
            </span>
            <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                <p className="mb-1 text-xs text-black font-medium">Data final</p>
                {props.effectiveEndDate === null ? "" : format(new Date(props.effectiveEndDate), "dd/MM/yyyy")}
            </span>
            <span className="flex flex-col justify-center items-center text-center pl-6 border-l border-zinc-500">
                <p className="mb-1 text-xs text-black font-medium">Membro(s)</p>
                {props.member}
            </span>
        </div>
    )
}