const LapsList = ({ list }: { list: number[] }) => {
    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60000)
        const seconds = Math.floor((time % 60000) / 1000)
        const milliseconds = Math.floor((time % 1000) / 10)
        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
    }

    return (
        <div className="w-full max-w-xs">
            <h3 className="text-3xl font-semibold mb-2">Laps</h3>
            <ul className="list-decimal list-inside">
                {list.map((lap, index) => (
                    <li key={index} className="text-base">
                        {formatTime(lap)}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LapsList
