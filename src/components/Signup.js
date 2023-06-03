import { database, auth } from '../firebase';
import { set, update, ref } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { useRef } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

onAuthStateChanged(auth, (user) => {
    if (user) {
    const user = auth.currentUser;
    const dt = new Date();
    update(ref(database, 'users/' + user.uid), {
        email: user.email,
        name: user.displayName,
        last_login: dt.toString()
    })
}
});


const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const nameRef = useRef();
    const occupationRef = useRef();
    const phoneRef = useRef();
    const { googleSignIn, facebookSignIn, user } = UserAuth();
    const navigate = useNavigate();

    if (user != null) { navigate('/signupauth'); }

    // Sign Up with Email and Password
    const handleRegister = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const passwordConfirm = passwordConfirmRef.current.value;
        const name = nameRef.current.value;
        const occupation = occupationRef.current.value;
        const phone = phoneRef.current.value;

        if (password !== passwordConfirm) {
            alert("Password doesn't match");
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const dt = new Date();

                    // set user displayName
                    updateProfile(user, {
                        displayName: name
                    });

                    // set user data to database
                    set(ref(database, 'users/' + user.uid), {
                        email: email,
                        occupation: occupation,
                        phone: phone,
                        last_login: dt.toString()
                    });

                    //redirect to home
                    window.location.href = "/";
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
                });
        }
    }

    const handleRegisterGoogle = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            alert(error.message);
        }
    }

    // Sign in with Facebook
    const handleRegisterFacebook = async () => {
        try {
            await facebookSignIn()
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className='login--bg'>
            <div className="login">
            <div className="login--content">
                <a href="/"><img className="back" src="back.jpg" alt="back" /></a>
                <h1 className="login--welkam">Welcome to Skillective!</h1>
                <p className="login--connect">Sign up to become a part of our community.</p>



                <div className="login--form">
                    <label className="login--label">Name*</label>
                    <input className="login--input" type="text" placeholder="Your Name" required ref={nameRef} />
                    <label className="login--label">Occupation*</label>
                    <input className="login--input" type="text" placeholder="Your Occupation" required ref={occupationRef} />
                    <label className="login--label">Email Address*</label>
                    <input className="login--input" type="text" placeholder="Your Email Address" required ref={emailRef} />
                    <label className="login--label">Phone Number*</label>
                    <input className="login--input" type="tel" placeholder="Your Phone Number" required ref={phoneRef} />
                    {/* <label className="login--label">Contribute as*</label>
                    <select className="login--input" name="contribute" id="contribute" required ref={contributeRef}>
                        <option value="student" className="signup--pilihan">Mentee</option>
                        <option value="teacher">Mentor</option>
                        <option value="organization">Organization</option>
                    </select> */}
                    <label className="login--label">Password*</label>
                    <input className="pw--input" type="password" placeholder="Your Password" required ref={passwordRef} />
                    <p className="pw--alert">Make sure your password contains 6-12 characters with numbers or letters</p>
                    <label className="login--label">Confirm Password*</label>
                    <input className="login--input" type="password" placeholder="Confirm Your Password" required ref={passwordConfirmRef} />

                    <input className="login--submit" type="submit" id='signin' name="signin_submit" value="Sign Up" onClick={handleRegister} />
                </div>
                <div class="signup--or">
                    <span className="or--text">or</span>
                </div>
                
                <p className="signup--with">Sign up using:</p>
                <div className="signup--logo">
                    <button className="signup--sosmed" onClick={handleRegisterGoogle}>
                        <img className="sosmed--img--signup" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google" />
                    </button>
                </div>

                <p className="signup--with--bawah">Already a registered user? <span className="signup--click" href="/login">Click here </span> to continue</p>
            </div>
        </div>
        </div>
    )
}

export default Signup