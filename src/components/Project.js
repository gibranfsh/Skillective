import { database, auth } from '../firebase';
import { set, update, ref } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { UserAuth } from '../context/AuthContext';
import { useRef } from 'react';
import { useState } from 'react';

const Form = () => {
    const [error, setError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    
    const [data, setData] = useState({
        name:'',
        org:'',
        email:'',
        type:'',
        purpose:'',
        desc:'',
        date:'',
        notes:'',
        question:'',
        guidelines:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({...data, [name]: value});
    };
    
   
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(validate(data));
        setIsSubmit(true);
    };

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.name) {
            errors.name = "This can't be empty!";
        } else if (values.name.length > 25) {
            errors.name = "Name must be less than 25 characters!";
        }

        if (!values.org) {
            errors.org = "This can't be empty!";
        } else if (values.org.length > 25) {
            errors.org = "This must be less than 25 characters!";
        }
        if (!values.email) {
            errors.email = "This can't be empty!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }

        if (!values.type) {
            errors.type = "Type is required!";
        }

        if (!values.purpose) {
            errors.purpose = "Purpose is required!";
        }

        if (!values.desc) {
            errors.desc = "This can't be empty!";
        } else if (values.desc.length > 400) {
            errors.desc = "This must be less than 400 characters!";
        }

        if (!values.date) {
            errors.date = "This can't be empty!";
        }

        if (values.notes.length > 200) {
            errors.notes = "This must be less than 200 characters!";
        }

        if (values.question.length > 100){
            errors.question = "This must be less than 100 characters!";
        }
        return errors;
    };

    //Gibran's code start from here
    const { user } = UserAuth();
    const name = useRef();
    const org = useRef();
    const email = useRef();
    const projecttype = useRef();
    const purpose = useRef();
    const desc = useRef();
    const deadlinedate = useRef();
    const designguidelines = useRef();
    const notes = useRef();
    const question = useRef();

    const submit = () => {
        // if form is empty or invalid, don't submit
        if (name.current.value === "" || org.current.value === "" || email.current.value === "" || projecttype.current.value === "" || purpose.current.value === "" || desc.current.value === "" || deadlinedate.current.value === "") {
            alert("Please fill in all the required fields!");
            return;
        }
        const data = {
            userid_sender: user.uid,
            name: name.current.value,
            org: org.current.value,
            email: email.current.value,
            projecttype: projecttype.current.value,
            purpose: purpose.current.value,
            desc: desc.current.value,
            deadlinedate: deadlinedate.current.value.toString(),
            designguidelines: designguidelines.current.value,
            notes: notes.current.value,
            question: question.current.value
        }
        set(ref(database, 'projectsnopal/' + name.current.value), data);
        
        //clear form
        name.current.value = "";
        org.current.value = "";
        email.current.value = "";
        projecttype.current.value = "";
        purpose.current.value = "";
        desc.current.value = "";
        deadlinedate.current.value = "";
        designguidelines.current.value = "";
        notes.current.value = "";
        question.current.value = "";
        window.location.href = "/";
    }

    return (
    <div className="login--bg" >
        <div className="login">
            <div className="login--content">
            <a href="/"><img className="back" src="back.jpg" alt="back" /></a>
            <h1 className="login--welkam">Fill Your Project Submission Here</h1>
            <p className="login--connect">Make sure to put all the details correctly. </p>

            <div className="login--form">

                <label className="login--label">Name</label>
                <input className="login--input" type='text' name='name' value={data.name} onChange={handleChange} ref={name}/>
                
                <label className="login--label">Institute/Agency/Workplace</label>
                <input className="login--input" type='text' name='org' value={data.org} onChange={handleChange} ref={org}/>
                
                <label className="login--label">Email Address</label>
                <input className="login--input" type="text" name="email" value={data.email} onChange={handleChange} ref={email}/>

                <label className="login--label">Type of Project</label>
                <select className="login--input" name="type" value={data.type} onChange={handleChange} ref={projecttype}>
                    <option value="graphicdesign">Graphic & Design</option>
                    <option value="musicaudio">Music & Audio</option>
                    <option value="programming">Programming</option>
                    <option value="videoanimation">Video & Animation</option>
                    <option value="writing">Writing</option>
                    <option value="other">Other</option>
                </select>
                
                <label className="login--label">Purpose of Project </label>
                <select className="login--input" name="purpose" value={data.purpose} onChange={handleChange} ref={purpose}>
                    <option value="academic">Academic Needs</option>
                    <option value="personal">Personal Needs</option>
                    <option value="business">Business Needs</option>
                    <option value="other">Other</option>
                </select>

                <label className="login--label">Project Description</label>
                <input className="login--input" type="text" name="desc" value={data.desc} onChange={handleChange} ref={desc}/>

                <label className="login--label">Project Deadline</label>
                <input className="login--input" type="date" name="date" value={data.date} onChange={handleChange} ref={deadlinedate}/>

                <label className="login--label">Project Design Guidelines</label>
                <select className="login--input" type="text" value={data.guidelines} onChange={handleChange} ref={designguidelines}>
                    <option value="1">There are already project design guidelines</option>
                    <option value="2">Not yet, but will be soon</option>
                    <option value="3">Not yet, needs to be discussed together</option>
                    <option value="4">Project design guidelines are up to the project owner</option>
                </select>

                <label className="login--label">Additional Notes</label>
                <input className="login--input" type="text" name="notes" value={data.notes} onChange={handleChange} ref={notes}/>

                <label className="login--label">Question Box</label>
                <input className="login--input" type="text" name="question" value={data.question} onChange={handleChange} ref={question}/>

                <input className="login--submit" type="submit" id='signin' name="signin_submit" value="Submit" onClick={submit} />

            </div>
            </div>

        </div>
    </div>
)
} 

export default Form;