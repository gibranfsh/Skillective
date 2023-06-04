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
                {/* <label htmlFor="day" className="profile-label">
                  Date of Birth
                </label>
                <div style={{ display: "flex", gap: 16 }}>
                  <input
                    style={{ width: "7.1vw" }}
                    id="day"
                    className="profile-input"
                    value={birthDay}
                    onChange={(e) => setBirthDay(e.target.value)}
                  />
                  <input
                    style={{ width: "7.1vw" }}
                    id="day"
                    className="profile-input"
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(e.target.value)}
                  />
                  <input
                    style={{ width: "9.3vw" }}
                    id="day"
                    className="profile-input"
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                  />
                </div> */}
                <h5 className="profile-label">Date of Birth</h5>
                <div>
                  <p className="profile-entry">{birthDay || "29"}</p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 16,
                }}
              >
                <label htmlFor="age" className="profile-label">
                  Age
                </label>
                <input
                  style={{ width: "6.3vw" }}
                  id="age"
                  className="profile-input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div style={{ width: "33.4vw" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="email" className="profile-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="profile-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 24,
              }}
            >
              <label htmlFor="password" className="profile-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="profile-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
