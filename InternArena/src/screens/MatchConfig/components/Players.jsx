import { useState } from "react"
import Player from "./Player"

const INITIAL_PLAYERS = [
    { id: 1, name: "Emiliano Gonsales" },
    { id: 2, name: "Emiliano Gonsales" },
    { id: 3, name: "Emiliano Gonsales" },
    { id: 4, name: "Emiliano Gonsales" },
    { id: 5, name: "Emiliano Gonsales" },
    { id: 6, name: "Emiliano Gonsales" },
    { id: 7, name: "Emiliano Gonsales" },
    { id: 8, name: "Emiliano Gonsales" },
    { id: 9, name: "Emiliano Gonsales" },
]

function Players() {
    const [players, setPlayers] = useState(INITIAL_PLAYERS)

    const handleDelete = (id) => {
        setPlayers((prev) => prev.filter((p) => p.id !== id))
    }

    return(
        <div className="w-full min-w-64 h-[calc(100vh-12rem)] flex flex-col bg-[#383434] text-white text-xl rounded-xl overflow-hidden">
            <div className="flex-shrink-0 p-4 text-center">
                <p className="text-2xl">Players</p>
                <p>Max: 12 players</p>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4 -mt-2">
                {players.map((player) => (
                    <Player
                        key={player.id}
                        id={player.id}
                        name={player.name}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    )
}

export default Players