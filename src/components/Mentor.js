import { BsFillBagFill } from "react-icons/bs";
import { AiFillStar, AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { storage, database, auth } from "../firebase";
import {MdLocationCity} from "react-icons/md";
import {
  getDownloadURL,
  ref as sRef,
} from "firebase/storage";
import { UserAuth } from "../context/AuthContext";
import "./Mentor.css";

export default function Mentor(props) {
  const { user, setUser } = UserAuth();
  const [imageUrl, setImageUrl] = useState("");
  const imageName = "mentorsprofilepicture/" + props.id + ".jpg";

  // const getDownloadableURL = async () => {
  //   try {
  //     const storageRef = sRef(storage, imageName);
  //     const downloadURL = await getDownloadURL(storageRef);
  //     return downloadURL;
  //   } catch (error) {
  //     console.error("Error getting download URL:", error);
  //   }
  // };

  useEffect(() => {
    const fetchImageURL = async () => {
      try {
        const storageRef = sRef(storage, imageName);
        const downloadURL = await getDownloadURL(storageRef);
        setImageUrl(downloadURL);
      } catch (error) {
        console.error("Error getting download URL:", error);
      }
    };

    fetchImageURL();
  }, [imageName]);

  const handleAddToSession = async () => {
    // Prepare the data to be posted to the database
    const data = {
      userId: user.uid, // The user's id
      mentorId: props.id, // The mentor's id
      name: props.name, // The mentor's name
      company: props.company, // The mentor's company
      experience: props.experience, // The mentor's experience
      job: props.job, // The mentor's job
      image: imageUrl, // The mentor's profile picture
    };

    // Prepare the request options
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    // Send the POST request to the Firebase Realtime Database endpoint
    await fetch(
      "https://firebasic-2-default-rtdb.asia-southeast1.firebasedatabase.app/usersmentors.json",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Data added to usersmentors node:", data);
        // Add any additional logic or state updates here
      })
      .catch((error) => {
        console.error("Error adding data to usersmentors node:", error);
      });

    // refresh the page after adding a mentor to the session
    window.location.reload();
  };

  return (
    <div className="mentor--container">
      {imageUrl && (
        <img src={imageUrl} alt={props.name} className="mentor--image" />
      )}
      <div className="mentor--konten">
        <h3 className="mentor--name">{props.name}</h3>
        <div className="mentor--company">
          <BsFillBagFill className="mentor--company--icon" />
          <p>{props.job}</p>
        </div>

        <div className="mentor--star">
          <MdLocationCity className="mentor--star--icon" />
          <p>{props.company}</p>
        </div>
      </div>
      <div className="mentor--container--bawah">
        <div className="mentor--container--exp">
          <p>Experience</p>
          <strong>{props.experience}</strong>
        </div>
        <div className="mentor--container--att">
          <p>Attendance</p>
          <strong>{props.attendance}</strong>
        </div>
      </div>

      <button className="mentor--add" onClick={handleAddToSession}>
        <AiOutlinePlusCircle className="mentor--add--icon" />
        <p className="add-text">Add to Your Session</p>
      </button>
    </div>
  );
}
