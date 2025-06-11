import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"
import { toast, ToastContainer } from 'react-toastify';
import { useGetUserAdminsQuery } from '../graphql/generated';

export function Login() {
    const navigate = useNavigate()

    const { setUser } = useUser();

    const { data: dataUserAdmins } = useGetUserAdminsQuery()

    const allowedEmails = dataUserAdmins?.userAdmins.map(user => user.email);


    const handleSuccess = (response: CredentialResponse) => {
        if (response.credential) {
            const userInfo = jwtDecode(response.credential) as { name: string; given_name: string; email: string; picture: string };

            if (allowedEmails?.includes(userInfo.email)) {
                notify("allowed");
                setUser(userInfo); // Atualiza o estado global do usuário
                localStorage.setItem('user', JSON.stringify(userInfo)); // Salva no localStorage

                navigate('/')
                // Enviar para backend se necessário
            } else {
                notify("noAllowed");
            }
        }
    }

    const notify = (notify: string) => {
        if (notify === "allowed")
            toast.success("Login realizado com sucesso com sucesso!", {
                autoClose: 3000
            }
            )
        else if (notify === "noAllowed")
            toast.error("Acesso negado: e-mail não autorizado", {
                autoClose: 5000
            }
            )

    }

    return (
        <div className="flex min-h-screen justify-center items-center bg-gradient-to-r from-green-700 via-white to-green-700">
            <ToastContainer />
            
            <main className="w-100 h-96 shadow-lg shadow-gray-500 bg-gray-100 rounded-lg">
                <div className="w-[445px] h-[5px] m-auto mt-[10px] bg-green-700"></div>
                <div className="flex flex-col justify-center items-center px-[42px]">
                    <header className="flex justify-between mb-11 pt-[14px]">
                        <img src="/src/assets/logo_ifnmg_salinas.png" alt="Logo IFNMG" className="w-[170px] h-[176px]" />
                        <img src="/src/assets/logo1.svg" alt="Logo PortariasIF" className="w-[170px] h-[176px]" />
                    </header>

                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={() => {
                            console.log('Login Failed')
                        }
                        }
                    />

                </div>

            </main>
        </div>
    );
}