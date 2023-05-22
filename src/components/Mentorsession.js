import "./Yoursession.css"

export default function Mentorsession(props) {
    return (
        <div className="urses--mentor">
            <img src="/mentor.svg" alt="mentor" />

            <div className="urses--mentor--info">
                <h3>{props.nama}</h3>
                <p>{props.profesi}</p>
                <br></br>

                <div className="urses--mentor--kontak">
                    <p>Chat via Whatsapp</p>
                </div>
            </div>
        </div>
    )
}