import PanicButton from "../components/BotonPanico";

const Start: React.FC = () => {
    return (
        <>
            <div className="h-[100vh] w-full bg-fondogris flex flex-col justify-center place-items-center space-y-6">
                <div className="grid place-items-center w-[90%] space-y-6 my-3">
                    <p className="">Presiona el Icono en Caso de Emergencia (doble click para cancelar)</p>
                    <div className="w-[170px]">
                        <PanicButton/>
                    </div>
                    <h1 className="text-3xl font-bold">SafeGirl</h1>
                </div>
                <div className="w-full flex flex-row justify-center space-x-6">
                    <a href="/login" className="btn bg-blue-800 text-white font-bold w-[35%]">Iniciar Sesion</a>
                    <a href="/createUser" className="btn bg-blue-800 text-white font-bold w-[35%]">Crear Cuenta</a>
                </div>
            </div>
        </>
    )
};

export default Start;