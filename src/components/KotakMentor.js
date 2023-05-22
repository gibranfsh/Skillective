export default function KotakMentor(props){
    return(
        <div className="kotakmentor">
            <img src={props.image} alt="mentor" className="kotakmentor--foto" style={{objectFit:'cover'}}/>
            <div className="kotakmentor--detail">
                <p className="kotakmentor--nama">{props.nama}</p>
                <div className="kotakmentor--details">
                    <p className="kotakmentor--jabatan"><b>{props.jabatan}</b></p>
                    <p className="kotakmentor--org">{props.org}</p>
                    <p className="kotakmentor--exp">{props.exp}</p>
                </div>
            </div>
        </div>
    )
}
