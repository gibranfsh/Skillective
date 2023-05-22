import "./Explore.css";
import { BsSearch } from "react-icons/bs";
import { IoFilter } from "react-icons/io5";
import Mentor from "./Mentor";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Projectbox from "./Projectbox";
import { UserAuth } from '../context/AuthContext';
export default function Explore() {
  const { user, setUser } = UserAuth();
  const navigate = useNavigate();
  // const { state } = useLocation();
  // const mentorState = state ? true : state.mentorKondisi;
  const [mentor, setMentor] = useState(true);
  const [allMentors, setAllMentors] = useState([]);
  const [mentorsFiltered, setMentorsFiltered] = useState([0]);
  const [mentorsId, setMentorsId] = useState(["Empty"]);
  const [allProjects, setAllProjects] = useState([]);
  const [projectsFiltered, setProjectsData] = useState([0]);
  const [projectsId, setProjectsId] = useState(["Empty"]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from Firebase for all mentors
  const fetchAllMentors = async () => {
    try {
      const response = await fetch(
        "https://firebasic-2-default-rtdb.asia-southeast1.firebasedatabase.app/mentors.json"
      );
      const data = await response.json(); //udah pasti ada

      const mentors = Object.keys(data)
        .map((mentorId) => {
          return {
            id: mentorId,
            ...data[mentorId],
          };
        });

      // Update the state with the mentors data
      setAllMentors(mentors);
    } catch (error) {
      console.error("Error fetching data from Firebase Realtime Database:", error);
    }
  }

  // Fetch data from Firebase for mentors that the users have added to their session
  const fetchAllMentorsSession = async () => {
    try {
      const response = await fetch(
        "https://firebasic-2-default-rtdb.asia-southeast1.firebasedatabase.app/usersmentors.json"
      );
      const data = await response.json();

      // Filter mentors by user's id and get the mentor's id and put it on an array
      const mentorsIds = Object.values(data)
        .filter((mentorData) => mentorData.userId === user.uid)
        .map((mentorData) => mentorData.mentorId);

      if (mentorsIds.length === 0) {
        setMentorsId(["Empty"]); // Set mentorsId to an empty array
        return; // Exit early if no mentors added
      }

      setMentorsId(mentorsIds);
    } catch (error) {
      console.error("Error fetching data from Firebase Realtime Database:", error);
    }
  };

  // Fetch data from Firebase for all mentors excluding the ones that the users have added to their session
  const fetchAllMentorsExceptSession = async () => {
    try {
      const response = await fetch(
        "https://firebasic-2-default-rtdb.asia-southeast1.firebasedatabase.app/mentors.json"
      );
      const data = await response.json();

      const mentors = Object.keys(data)
        .filter((mentorId) => !mentorsId.includes(mentorId))
        .map((mentorId) => {
          return {
            id: mentorId,
            ...data[mentorId],
          };
        });

      // Update the state with the mentors data
      setMentorsFiltered(mentors);
    } catch (error) {
      console.error("Error fetching data from Firebase Realtime Database:", error);
    }
  }

  // Fetch data from Firebase for all projects
  const fetchAllProjects = async () => {
    try {
      const response = await fetch(
        "https://firebasic-2-default-rtdb.asia-southeast1.firebasedatabase.app/projects.json"
      );
      const data = await response.json();

      const projects = Object.keys(data)
        .map((projectId) => {
          return {
            id: projectId,
            ...data[projectId],
          };
        });

      // Update the state with the projects data
      setAllProjects(projects);
    } catch (error) {
      console.error("Error fetching data from Firebase Realtime Database:", error);
    }
  }

  // Fetch data from Firebase for projects that the users have added to their session
  const fetchAllProjectsSession = async () => {
    try {
      const response = await fetch(
        "https://firebasic-2-default-rtdb.asia-southeast1.firebasedatabase.app/usersprojects.json"
      );
      const data = await response.json();

      // Filter projects by user's id and get the project's id and put it on an array
      const projectsIds = Object.values(data)
        .filter((projectData) => projectData.userId === user.uid)
        .map((projectData) => projectData.projectId);

      if (projectsIds.length === 0) {
        setProjectsId(["Empty"]); // Set projectsId to an empty array
        return; // Exit early if no projects added
      }

      setProjectsId(projectsIds);
    } catch (error) {
      console.error("Error fetching data from Firebase Realtime Database:", error);
    }
  };

  // Fetch data from Firebase for all projects excluding the ones that the users have added to their session
  const fetchAllProjectsExceptSession = async () => {
    try {
      const response = await fetch(
        "https://firebasic-2-default-rtdb.asia-southeast1.firebasedatabase.app/projects.json"
      );
      const data = await response.json();

      const projects = Object.keys(data)
        .filter((projectId) => !projectsId.includes(projectId))
        .map((projectId) => {
          return {
            id: projectId,
            ...data[projectId],
          };
        });

      // Update the state with the projects data
      setProjectsData(projects);
    } catch (error) {
      console.error("Error fetching data from Firebase Realtime Database:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllMentorsSession();
      // wait
      await new Promise(r => setTimeout(r, 500));
      await fetchAllMentors();
      await fetchAllMentorsExceptSession();

      console.log("allMentors", allMentors)
      console.log("mentorsId[0]", mentorsId[0])
      console.log("mentorsFiltered", mentorsFiltered)
      if (mentorsId.length === 1 && mentorsId[0] === "Empty" && (mentorsFiltered.length === allMentors.length)) {
        if (mentorsFiltered.length > 0) {
          console.log("MASUK KE SINI 1")
          setIsLoading(false);
        }
      } else {
        if (mentorsFiltered.length > 0 && mentorsId.length > 0 && !(mentorsId[0] === "Empty")) {
          console.log("MASUK KE SINI 2")
          setIsLoading(false);
        }
      }

    };
    fetchData();
  }, [user, mentorsId]);

  useEffect(() => {
    const fetchProjects = async () => {
      // Fetch all projects session
      await fetchAllProjectsSession();

      // Fetch all projects
      await fetchAllProjects();

      // Fetch projects excluding the ones in the session
      await fetchAllProjectsExceptSession();

    };

    fetchProjects();
  }, [user, projectsId]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const konten = () => {
    const filteredMentors = mentorsFiltered.filter((mentorData) => {
      const { name, company } = mentorData;
      const query = searchQuery.toLowerCase();
      return (
        name && name.toLowerCase().includes(query) ||
        company && company.toLowerCase().includes(query)
      );
    });

    const filteredProjects = projectsFiltered.filter((projectData) => {
      const { name, company } = projectData;
      const query = searchQuery.toLowerCase();
      return (
        name && name.toLowerCase().includes(query) ||
        company && company.toLowerCase().includes(query)
      );
    });

    if (mentor) {
      if (isLoading) {
        return <p>Loading...</p>;
      } else {
        if (filteredMentors.length > 0) {
          return filteredMentors.map((mentorData) => (
            <Mentor
              id={mentorData.id}
              name={mentorData.name}
              company={mentorData.company}
              experience={mentorData.experience}
              attendance={mentorData.attendance}
            />
          ));
        } else if (mentorsFiltered.length === 0) { // && mentorsId.length > 0
          return <p>Woah. You already add all the mentors to your session.</p>;
        } else { // (mentorsId.length === 0)
          return null;
        }
      }
    } else {
      if (isLoading) {
        return <p>Loading...</p>;
      } else {
        if (filteredProjects.length > 0) {
          return filteredProjects.map((projectData) => (
            <Projectbox
              id={projectData.id}
              name={projectData.name}
              company={projectData.company}
              value={projectData.value}
              deadline={projectData.deadline}
              image={projectData.image}
              desc={projectData.desc}
              // navigate={navigate}
            />
          ));
        } else if (projectsFiltered.length === 0) { // && projectsId.length > 0
          return <p>Woah. You already add all the projects to your session.</p>;
        } else { // (projectsId.length === 0)
          return null;
        }
      }
    }
  };
  return (
    <div className="explore">
      <div className="home--choice">
        <label>
          <input
            type="radio"
            name="difficulty"
            value="easy"
            checked
            onchange="onDifficultyChange(this)"
            onClick={() => setMentor(true)}
          />
          <span className="home--choice--button">Mentors</span>
        </label>
        <label>
          <input
            type="radio"
            name="difficulty"
            value="medium"
            onchange="onDifficultyChange(this)"
            onClick={() => setMentor(false)}
          />
          <span className="home--choice--button">Projects</span>
        </label>
      </div>
      <div className="explore--search">
        <div className="search--container">
          <BsSearch className="explore--search--icon" />
          <input
            type="text"
            placeholder="Search by name or company"
            className="explore--search--input"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="filter--container">
          <IoFilter className="explore--search--filter" />
          <p className="filter--teks">Filter</p>
        </div>
      </div>
      <div className="kotak--container">{konten()}</div>
    </div>
  );
}