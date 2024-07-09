const InfoTiles = ({title, description}: { title: string, description: string }) => {
    return (
        <div className={"flex flex-col gap-2 w-full  p-4 items-center justify-center backgroundColor rounded-2xl"}>
            <h1 className={"text-white font-bold text-lg"}>
                {title}
            </h1>
            <p className={"text-white font-medium text-md"}>
                {description}
            </p>
        </div>
    )
}
export default InfoTiles