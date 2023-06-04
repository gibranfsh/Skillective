import { useEffect, useState } from "react";
import "./Profile.css";

export default function ProfilePage() {
  const [username, setUsername] = useState();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [password, setPassword] = useState();
  const [birthDay, setBirthDay] = useState();
  const [birthMonth, setBirthMonth] = useState();
  const [birthYear, setBirthYear] = useState();

  const [experience1, setExperience1] = useState();
  const [experience2, setExperience2] = useState();
  const [experience3, setExperience3] = useState();

  useEffect(() => {
    setUsername("Gijax");
  }, []);

  return (
    <main className="profile-page-container">
      <h1 className="profile-header">My Profile</h1>
      <form className="profile-container" onSubmit={(e) => e.preventDefault()}>
        <h2 className="profile-username">Hi, {username}!</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "33.4vw" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* <label htmlFor="name" className="profile-label">
                Name
              </label>
              <input
                id="name"
                className="profile-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              /> */}
              <h5 className="profile-label">Name</h5>
              <p className="profile-entry">{name || "Gijax HD Ghazanfar"}</p>
            </div>

            <div style={{ display: "flex", marginTop: 24 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h5 className="profile-label">Date of Birth</h5>
                <div>
                  <p className="profile-entry">{birthDay || "29-03-2004"}</p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 72,
                }}
              >
                <h5 className="profile-label">Age</h5>
                <p className="profile-entry">{age || "19"}</p>
              </div>
            </div>
          </div>

          <div style={{ width: "33.4vw" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h5 className="profile-label">Email</h5>
              <p className="profile-entry">{email || "gijaxhd@gmail.com"}</p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 24,
              }}
            ></div>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#119ABE",
            marginTop: 24,
          }}
        ></div>

        <h2 style={{ marginTop: 36 }} className="profile-username">
          Experiences
        </h2>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <input
            id="exp1"
            type="text"
            className="profile-input"
            value={experience1}
            style={{ flexGrow: 1 }}
          ></input>
          <label
            htmlFor="exp1"
            style={{
              cursor: "pointer",
              marginLeft: 24,
              borderRadius: 20,
              backgroundColor: "#119ABE",
              color: "white",
              fontFamily: "Lato, sans-serif",
              fontWeight: 600,
              padding: "20px 20px",
            }}
          >
            Edit Experience
          </label>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 42,
          }}
        >
          <input
            id="exp2"
            type="text"
            className="profile-input"
            value={experience2}
            style={{ flexGrow: 1 }}
          ></input>
          <label
            htmlFor="exp2"
            style={{
              cursor: "pointer",
              marginLeft: 24,
              borderRadius: 20,
              backgroundColor: "#119ABE",
              color: "white",
              fontFamily: "Lato, sans-serif",
              fontWeight: 600,
              padding: "20px 20px",
            }}
          >
            Edit Experience
          </label>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 42,
          }}
        >
          <input
            id="exp3"
            type="text"
            className="profile-input"
            value={experience3}
            style={{ flexGrow: 1 }}
          ></input>
          <label
            htmlFor="exp3"
            style={{
              cursor: "pointer",
              marginLeft: 24,
              borderRadius: 20,
              backgroundColor: "#119ABE",
              color: "white",
              fontFamily: "Lato, sans-serif",
              fontWeight: 600,
              padding: "20px 20px",
            }}
          >
            Edit Experience
          </label>
        </div>
      </form>
    </main>
  );
}
