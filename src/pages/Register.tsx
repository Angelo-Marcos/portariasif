import { Form } from "../components/Form";
import { Header } from "../components/Header";

export function Register() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-col items-center justify-center px-48">
                <span className="flex w-full mt-6 mb-7 font-medium justify-center text-xl text-red-900 border-b border-green-300">
                    Preencha os campos abaixo
                </span>
                <Form />
            </div>

        </div>
    );
}