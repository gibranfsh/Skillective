import { storage, database, auth } from '../firebase';
import { set, update, ref, collection, add, push } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { ref as sRef } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import { getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import { UserAuth } from '../context/AuthContext';
import './Project.css';
import { useRef, useState } from 'react';

const Project = () => {
    const { user } = UserAuth();
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        projectName: "", // The project's name
        projectType: "",
        value: "", // The project's value
        deadline: "", // The project's deadline
        image: "", // The project's image
        desc: "", // The project's desc
    })
    const [image, setImage] = useState(null);

    const projectTypes = [
        "Web Development",
        "Mobile App Development",
        "Data Engineering",
        "Machine Learning",
        "Artificial Intelligence",
        "UI/UX Design",
        "Game Development",
        "Blockchain",
        "Internet of Things",
        "Cloud Computing",
        "Product Management",
        "Digital Marketing",
        "Quality Assurance"
    ];

    const inputs = [
        {
            id: 1,
            name: "projectName",
            type: "text",
            placholder: "Name",
            errorMessage: "Project's Name cannot be empty!",
            label: "Name",
            required: true,
        },
        {
            id: 2,
            name: "projectType",
            type: "dropdown",
            placholder: "Type",
            errorMessage: "Project's Type cannot be empty!",
            label: "Type",
            required: true,
        },
        {
            id: 3,
            name: "value",
            type: "String",
            placholder: "Value",
            label: "Value",
            required: true,
        },
        {
            id: 4,
            name: "deadline",
            type: "date",
            placholder: "Deadline",
            label: "Deadline",
        },
        {
            id: 5,
            name: "image",
            type: "file",
            placholder: "Image",
            errorMessage: "",
            label: "Image",
        },
        {
            id: 6,
            name: "desc",
            type: "text",
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

        // Create a reference to the Firebase Storage
        const storageRef = sRef(storage, 'images');
        const imageRef = sRef(storageRef, image.name);

        // Upload image to Firebase Storage
        uploadBytes(imageRef, image)
            .then((snapshot) => {
                // Get the download URL of the uploaded image
                getDownloadURL(snapshot.ref)
                    .then((downloadURL) => {
                        // Save the download URL in the database
                        const projectRef = ref(database, 'projects');
                        push(projectRef, {
                            name: values.projectName,
                            type: values.projectType,
                            value: values.value,
                            deadline: values.deadline,
                            image: downloadURL, // Store the download URL in the database
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
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    const onChange = (e) => {
        if (e.target.name === "value") {
            const rawValue = parseInt(e.target.value.replace(/[^\d]/g, ""));
            const formattedValue = `Rp ${rawValue.toLocaleString("id-ID")}`;
            setValues({ ...values, [e.target.name]: formattedValue });
        }
        else {
            setValues({ ...values, [e.target.name]: e.target.value });
        }
        setErrors({ ...errors, [e.target.name]: "" });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // console.log("file", file)
        setImage(file);
        setValues({ ...values, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    }

    return (
        <div className="login--bg">
            <div className="login">
                <div className="login--content">
                    <a href="/">
                        <img className="back" src="back.jpg" alt="back" />
                    </a>

                    <div className="project-page">
                        <h2>Project Submission Form</h2>

                        <p className="project-page__description">
                            Welcome to the Project Submission Page! This page allows you to submit project details<br></br>
                            and track their progress. Fill in the required information, upload images (company's logo, etc),<br></br>
                            and submit the project.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {inputs.map((input) => (
                            <div className="login--form" key={input.id}>
                                <label className="login--label">{"Project's " + input.label}</label>
                                {input.name === "image" ? (
                                    <input
                                        className="login--input"
                                        type={input.type}
                                        name={input.name}
                                        placeholder={input.placholder}
                                        value={values[input.name]}
                                        onChange={handleImageChange}
                                    />
                                ) : input.type === "dropdown" ? ( // Render dropdown for "projectType" input
                                    <select
                                        className="login--input"
                                        name={input.name}
                                        value={values[input.name]}
                                        onChange={onChange}
                                    >
                                        <option value="">Select a project type</option>
                                        {projectTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        className="login--input"
                                        type={input.type}
                                        name={input.name}
                                        placeholder={input.placholder}
                                        value={values[input.name]}
                                        onChange={onChange}
                                    />
                                )}
                                {errors[input.name] && <span className="projectSpan">{errors[input.name]}</span>}
                            </div>
                        ))}
                        <div className="project-page">
                            <p className="project-page__description">
                                Once you have filled in all the required information, click the "Submit" button.<br></br>
                                The project will be saved, and you will receive a confirmation upon successful<br></br>
                                submission through your email. Thank you!
                            </p>
                        </div>
                        <button className="login--submit" style={{paddingTop:"0.8rem"}}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Project;