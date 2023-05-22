import Mentorsession from "./Mentorsession";
import Projsession from "./Projsession";
import "./Yoursession.css";
import { useState } from "react";

export default function Yoursession() {
  const [clickmentor, setClickmentor] = useState(true);
  const [clickproject, setClickproject] = useState(false);

  return (
    <div className="urses">
      <div className="urses--pilihan">
        <div
          className="urses--pilihan--1"
          style={{ color: !clickmentor ? "black" : "inherit" }}
          onClick={() => {
            if (!clickmentor) {
              setClickmentor(!clickmentor);
              setClickproject(!clickproject);
            }
          }}
        >
          <h3>Mentors</h3>
        </div>
        <div
          className="urses--pilihan--2"
          style={{ color: !clickproject ? "black" : "inherit" }}
          onClick={() => {
            if (!clickproject) {
              setClickmentor(!clickmentor);
              setClickproject(!clickproject);
            }
          }}
        >
          <h3>Projects</h3>
        </div>
      </div>
      <div className="horizontal-line">
        <div
          className="line"
          style={{ backgroundColor: clickmentor ? "#119abe" : "inherit" }}
        ></div>
        <div
          className="line"
          style={{ backgroundColor: clickproject ? "#119abe" : "inherit" }}
        ></div>
      </div>

      <div className="urses--mentor--container">
        {clickmentor ? (
          <>
            <Mentorsession nama="Clara Alrosa" profesi="UX Designer" />
            <Mentorsession nama="Vania Salsabila" profesi="Penyepong Gibran" />
            <Mentorsession nama="Vina" profesi="Frontend Developer" />
            <Mentorsession nama="Brigita" profesi="Seniman.js" />
          </>
        ) : (
          <>
            <Projsession
              tanggal="July 30 2023"
              deadline="4 weeks"
              nama="Pornhub Mobile"
              value="Rp.100.000.000"
              status="progress"
            />

            <Projsession
              tanggal="June 17 2023"
              deadline="1 weeks"
              nama="Help Pals"
              value="Rp.1.000.000"
              status="done"
            />

            <Projsession
              tanggal="June 15 2023"
              deadline="6 weeks"
              nama="LMS 70 JKT"
              value="Rp.2.000.000"
              status="progress"
            />

            <Projsession
              tanggal="June 07 2023"
              deadline="2 weeks"
              nama="Ashwa"
              value="Rp.3.000.000"
              status="done"
            />
          </>
        )}
      </div>
    </div>
  );
}
