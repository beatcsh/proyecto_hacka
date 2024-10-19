import PanicButton from "../components/BotonPanico";

const Panico: React.FC = () => {
    return (
        <>
            <div className="h-[100vh] bg-fondogris flex flex-col justify-center place-items-center w-full space-y-6">
                <div className="grid place-items-center space-y-6 my-3">
                    {/* <PanicButton/> */}
                    <h2 className="text-2xl font-semibold">Alerta</h2>
                    <a href="/home" className="grid place-items-center rounded-lg bg-blue-800 text-white font-bold w-[70%] h-[50px]">Volver al Mapa</a>
                </div>
            </div>
        </>
    )
};

export default Panico;