const Start: React.FC = () => {
    return (
        <>
            <div className="h-[100vh] bg-fondogris flex flex-col justify-center place-items-center w-full space-y-6">
                <div className="grid place-items-center space-y-6 my-3">
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3VoQ1wFuU_Y5XobaGUgkDS1ktWwEx3YeEdw&s" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold">SafeGirl</h1>
                    <h2 className="text-xl font-semibold">Bienvenidos</h2>
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