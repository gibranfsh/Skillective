export default function Category(props) {
    if (!props.conds) {
        return (
            <div className="category">
                <h1 className="category--nama">{props.nama}</h1>
            </div>
        )
    }
    else { 
        return (
            <div className="category--explore">
                <h1 className="category--explore--nama">{props.nama}</h1>
            </div>
        )
    }
}