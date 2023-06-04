import { database} from '../firebase';
import { update, ref } from "firebase/database";
import { useRef } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignupAuth = () => {
    const occupationRef = useRef();
    const phoneRef = useRef();
    const contributeRef = useRef();
    const { user } = UserAuth();
    const navigate = useNavigate();

    if (user.contribute != null) { navigate('/'); }

    // Sign Up with Email and Password
    const handleAuth = () => {
        const occupation = occupationRef.current.value;
        const phone = phoneRef.current.value;
        const contribute = contributeRef.current.value;

        // add the additional data to the user

        update(ref(database, 'users/' + user.uid), {
            occupation: occupation,
            phone: phone,
            contribute: contribute,
            });

        //redirect to home
        window.location.href = "/";
        
        
        if(user.contribute != null) {
            navigate('/');
        }
    }

    return (
        <div className="login--bg">
        <div className="login">
            <div className="login--content">
                <a href="/"><img className="back" src="back.jpg" alt="back" /></a>
                <h1 className="login--welkam">Welcome to Skillective!</h1>
                <div className="login--form">
                    <label className="login--label">Occupation*</label>
                    <input className="login--input" type="text" placeholder="Your Occupation" required ref={occupationRef} />
                    <label className="login--label">Phone Number*</label>
                    <input className="login--input" type="tel" placeholder="Your Phone Number" required ref={phoneRef} />
                    <label className="login--label">Contribute as*</label>
                    <select className="login--input" name="contribute" id="contribute" required ref={contributeRef}>
                        <option value="student" className="signup--pilihan">Mentee</option>
                        <option value="teacher">Mentor</option>
                        <option value="organization">Organization</option>
                    </select>
                    <input className="login--submit" type="submit" id='signin' name="signin_submit" value="Sign Up" onClick={handleAuth}/>
                </div>

               </div>
        </div>
        </div>
    )
}

export default SignupAuth