export default function KotakKomen(props){
    return(
        <div className="kotakkomen">
            <p className="kotakkomen--komen">"{props.komen}"</p>
            <div className="kotakkomen--konten">
                <img src={props.image} alt="mentor" className="kotakkomen--foto"/>
                <div className="kotakkomen--details">
                    <p className="kotakkomen--nama"><b>{props.nama}</b></p>
                    <p className="kotakkomen--jabatan">{props.jabatan}</p>
                    <p className="kotakkomen--org">{props.org}</p>
                    
                </div>
            </div>
        </div>
    )
}
