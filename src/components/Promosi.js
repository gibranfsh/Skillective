

export default function Promosi(props) {
    return (
        <div className="promosi">
            <img src={props.image} alt="promosi" className="promosi--foto" style={{objectFit:'cover'}}/>
            <h3 className="promosi--judul">{props.title}</h3>
            <p className="promosi--content">{props.isi}</p>
        </div>

    )
    
}