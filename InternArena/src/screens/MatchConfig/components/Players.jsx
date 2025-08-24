import Player from "./Player"

function Players() {
    return(
        <div className="h-fit w-fit bg-[#383434] text-white text-xl text-center p-4 rounded-xl">
            <p className="text-2xl">Players</p>
            <p>Max: 12 players</p>
            <Player/>
            <Player/>
            <Player/>
            <Player/>
            <Player/>
            <Player/>
            <Player/>
            <Player/>
            <Player/>
        </div>
    )
}

export default Players