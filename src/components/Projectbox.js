import { BsFillBagFill } from "react-icons/bs";
import { AiFillStar, AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import "./Mentor.css";

export default function Projectbox(props) {
  const { user, setUser } = UserAuth();
  const navigate = useNavigate();

  const handleAddToSession = async () => {
    // Prepare the data to be posted to the database
    const data = {
      userId: user.uid, // The user's id
      projectId: props.id, // The project's id
      name: props.name, // The project's name
      company: props.company, // The project's company
      value: props.value, // The project's value
      deadline: props.deadline, // The project's deadline
      image: props.image, // The project's image
      desc: props.desc, // The project's desc
    };

    // Prepare the request options
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    // Send the POST request to the Firebase Realtime Database endpoint
    await fetch('https://firebasic-2-default-rtdb.asia-southeast1.firebasedatabase.app/usersprojects.json', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Data added to usersprojects node:', data);
        // Add any additional logic or state updates here
      })
      .catch(error => {
        console.error('Error adding data to usersprojects node:', error);
      });

    // refresh the page after adding a mentor to the session
    window.location.reload();

    // BLM BISA
    // // navigate to the explore page but with mentor state set to false
    // navigate('/explore', { state: { mentorKondisi: false } });
  };

  return (
    <div className="mentor--container">
      <img src={props.image} alt="cewe" className="mentor--image" />
      <div className="mentor--konten">
        <h3 className="mentor--name">{props.name}</h3>
        <p style={{ textAlign: "justify", marginLeft: "1rem" }}>{props.desc}</p>

        <div className="mentor--star">
          <AiFillStar className="mentor--star--icon" />
          <p>Matches your profile!</p>
        </div>

        <div className="mentor--container--bawah">
          <div className="mentor--container--exp">
            <p>Value</p>
            <strong>{props.value}</strong>
          </div>
          <div className="mentor--container--att">
            <p>Deadline</p>
            <strong>{props.deadline}</strong>
          </div>
        </div>

        <button className="mentor--add" onClick={handleAddToSession}>
          <AiOutlinePlusCircle className="mentor--add--icon" />
          <p className="add-text">Add to Your Session</p>
        </button>
      </div>
    </div>
  );
}
