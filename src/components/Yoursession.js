import Mentorsession from "./Mentorsession";
import Projsession from "./Projsession";
import "./Yoursession.css";
import { useEffect, useState } from "react";
import { UserAuth } from '../context/AuthContext';

export default function Yoursession() {
  const [clickmentor, setClickmentor] = useState(true);
  const [clickproject, setClickproject] = useState(false);
  const { user, setUser } = UserAuth();
  const [usersMentors, setUsersMentors] = useState([]);
  const [usersProjects, setUsersProjects] = useState([]);

  // Fetch data from Firebase for mentors that the users have added to their session
  const fetchUsersMentors = async () => {
    try {
      const response = await fetch(
        "https://firebasic-2-default-rtdb.asia-southeast1.firebasedatabase.app/usersmentors.json"
      );
      const data = await response.json();

      // Filter mentors by user's id
      const usersMentorsData = Object.values(data)
        .filter((mentorData) => mentorData.userId === user.uid);

      console.log('usersMentorsData:', usersMentorsData)
      setUsersMentors(usersMentorsData);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch data from Firebase for projects that the users have added to their session
  const fetchUsersProjects = async () => {
    try {
      const response = await fetch(
        "https://firebasic-2-default-rtdb.asia-southeast1.firebasedatabase.app/usersprojects.json"
      );
      const data = await response.json();

      // Filter projects by user's id
      const usersProjectsData = Object.values(data)
        .filter((projectData) => projectData.userId === user.uid);

      console.log('usersProjectsData:', usersProjectsData)
      setUsersProjects(usersProjectsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsersMentors();
      await fetchUsersProjects();
    };

    fetchData();
  }, [usersMentors]);



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
            {usersMentors.map((mentorData) => (
              <Mentorsession
                id={mentorData.id}
                nama={mentorData.name}
                profesi={mentorData.company}
              />
            ))}
          </>
        ) : (
          <>
            {usersProjects.map((projectData) => (
              <Projsession
                id={projectData.id}
                tanggal={projectData.tanggal} // {projectData.tanggal}
                deadline={projectData.deadline}
                nama={projectData.name}
                value={projectData.value}
                status="progress"
              />
            ))}
            {/* <Projsession
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
            /> */}
          </>
        )}
      </div>
    </div>
  );
}
