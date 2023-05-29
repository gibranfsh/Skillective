import { database, auth } from '../firebase';
import { set, update, ref, collection, add, push } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { UserAuth } from '../context/AuthContext';
import { useRef } from 'react';
import { useState } from 'react';

const Project = () => {
    const { user } = UserAuth();
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        projectName: "", // The project's name
        projectType: "",
        value: 0, // The project's value
        deadline: "", // The project's deadline
        image: "", // The project's image
        desc: "", // The project's desc
    })

    const inputs = [
        {
            id: 1,
            name:"projectName",
            type:"text",
            placholder: "Name",
            errorMessage: "Project's Name cannot be empty!",
            label: "Name",
            required: true,
        },
        {
            id: 2,
            name:"projectType",
            type:"text",
            placholder: "Type",
            errorMessage: "Project's Type cannot be empty!",
            label: "Type",
            required: true,
        },
        {
            id: 3,
            name:"value",
            type:"number",
            placholder: "Value",
            errorMessage: "Value should be more than 10000!",
            label: "Value",
            required: true,
            pattern: "^[1-9][0-9]{4,}$",
        },
        {
            id: 4,
            name:"deadline",
            type:"date",
            placholder: "Deadline",
            label: "Deadline" ,
        },
        {
            id: 5,
            name:"image",
            type:"file",
            placholder: "Image",
            errorMessage: "",
            label: "Image",
        },
        {
            id: 6,
            name:"desc",
            type:"text",
            placholder: "Description",
            label: "Description",
        },
    ]

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        inputs.forEach((input) => {
        if (input.required && !values[input.name]) {
            newErrors[input.name] = input.errorMessage || 'This field is required.';
        } else if (input.pattern && !new RegExp(input.pattern).test(values[input.name])) {
            newErrors[input.name] = input.errorMessage || 'Please enter a valid value for this field.';
        }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const projectRef = ref(database, 'projects');
        push(projectRef, {
          name: values.projectName,
          type: values.projectType,
          value: values.value,
          deadline: values.deadline,
          image: values.image,
          desc: values.desc
        })
        .then(() => {
          alert('Project has been submitted!');
          setValues({
            projectName: "",
            projectType: "",
            value: 0,
            deadline: "",
            image: "",
            desc: ""
          });
        })
        .catch(error => {
          alert(error.message);
        });
      }

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
        setErrors({ ...errors, [e.target.name]: '' });
    }
    
    console.log(values)
    return (
        <div className="login--bg">
            <div className="login">
                <div className="login--content">
                    <a href="/"><img className="back" src="back.jpg" alt="back" /></a>

                        <form onSubmit={handleSubmit}>
                            {inputs.map((input) => (
                                <div className="login--form">
                                    <label className="login--label">{input.label}</label>
                                    <input className="login--input" key={input.id} type={input.type} name={input.name} placeholder={input.placholder} value = {values[input.name]} onChange={onChange}/>
                                    {errors[input.name] && <span className="projectSpan">{errors[input.name]}</span>}
                                </div>
                                
                            ))}
                            <button className="login--submit">Submit</button>
                        </form>
                </div>
            </div>
        </div>
    )
}

export default Project;