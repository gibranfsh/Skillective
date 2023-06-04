import { useEffect, useState } from "react";
import { storage, database, auth } from "../firebase";
import "./Yoursession.css"
import {
    getDownloadURL,
    ref as sRef,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

export default function Mentorsession(props) {
    const [imageUrl, setImageUrl] = useState("");
    const imageName = "mentorsprofilepicture/" + props.mentorId + ".jpg";

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

    return (
        <div className="urses--mentor">
            {imageUrl && (
                <img src={imageUrl} alt={props.name} className="mentor--session--img" />
            )}
            <div className="urses--mentor--info">
                <h3>{props.nama}</h3>
                <p>{props.profesi}</p>
                <br></br>

                <div className="urses--mentor--kontak">
                    <p>Chat via Whatsapp</p>
                </div>
            </div>
        </div>
    )
}