import { database, auth } from '../firebase';
import { update, ref } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithRedirect, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { useEffect, useRef } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { googleSignIn, facebookSignIn, user, setUser } = UserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            const dt = new Date();
            update(ref(database, 'users/' + user.uid), {
              email: user.email,
              name: user.displayName,
              last_login: dt.toString()
            });
            setUser(user);
            navigate('/');
          }
        });
    
        return () => unsubscribe();
      }, [setUser, navigate]);

    // Sign In with Email and Password
    const handleSignIn = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                const dt = new Date();
                update(ref(database, 'users/' + user.uid), {
                    email: user.email,
                    last_login: dt.toString()
                });
                //redirect to home
                window.location.href = "/";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    // Sign In with Google
    const handleSignInGoogle = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error.message)
        }
    }

    // Sign in with Facebook
    const handleSignInFacebook = async () => {
        try {
            await facebookSignIn()
        } catch (error) {
            console.log(error.message)
        }
    }

    /*// Sign in with Facebook
    const handleSignInFacebook = () => {
        const provider = new FacebookAuthProvider();
        signInWithRedirect(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                alert("Signed In Successfully with Facebook"); // masih gak muncul
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);
                // ...
                alert(errorMessage);
            });
    }*/

    return (
        <div className='login--bg'>
            <div className="login">
                <div className="login--content">
                    <a href="/"><img className="back" src="back.jpg" alt="back" /></a>
                    <h1 className="login--welkam">Welcome Back to Skillective!</h1>
                    <p className="login--connect">Connect with community of our top mentors and users globally.</p>


                    <button className="sosmed--button" onClick={handleSignInGoogle}>
                        <img className="sosmed--img" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google" />
                        <p className="sosmed--text"><b>Continue with Google</b></p>
                    </button>
{/* 
                    <button class="fb--button" onClick={handleSignInFacebook}>
                        <img className="fb--img" src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="facebook" />
                        <p className="sosmed--text"><b>Continue with Facebook</b></p>
                    </button> */}

                    <div class="login--or">
                        <span className="or--text">or</span>
                    </div>

                    <div className="login--form">
                        <label className="login--label">Email Address</label>
                        <input className="login--input" type="text" placeholder="Your Email Address" required ref={emailRef} />
                        <label className="login--label">Password</label>
                        <input className="login--input" type="password" placeholder="Your Password" required ref={passwordRef} />
                        <input className="login--submit" type="submit" id='signin' name="signin_submit" value="Sign In" onClick={handleSignIn} />
                    </div>

                    <div className="login--tnc">
                        <p className="tnc--text">
                            Don't have an account? <a href="/Signup" className="tnc--link">Sign Up Now</a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login