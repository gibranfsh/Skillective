import "./Yoursession.css";

export default function Projsession(props) {
  return (
    <div className="urses--proj">
      <p>{props.tanggal}</p>

      <h3>{props.nama}</h3>
      <p className="urses--proj--dl">
        Deadline: <strong>{props.deadline}</strong>
      </p>

      <hr></hr>

      <p>Total Value:</p>

      <div className="urses--proj--detail">
        <div className="urses--proj--value">
          <p>{props.value}</p>
        </div>

        {props.status === "done" ? (
          <div className="urses--proj--status--done">
            <strong>Paid</strong>
          </div>
        ) : (
          <div className="urses--proj--status--process">
            <strong>On Process</strong>
          </div>
        )}
      </div>
    </div>
  );
}
