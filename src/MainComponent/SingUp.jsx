import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // make sure this path is correct

const Signup = () => {
    const navigate = useNavigate();

    // for acces from local storage first we create a stage 
    // const [userFull, setUserFull] = useState("");
    // const [userEmailAddress, setUserEmailAddress] = useState("");
    // const [userDateofBirth, setUserDateofBirth] = useState("");
    // const [userPassword, setUserPassword] = useState("");
    // const [userAbout, setUserAbout] = useState("");


    // we use this for validation or error 
   const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState({
    FullName: "",
    EmailAddress: "",
    DateOfBirth: "",
    Password: "",
    About: "",
  });


     const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
     const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.FullName.trim()) {
      errors.FullName = "Full name is required";
    } else if (values.FullName.length < 3) {
      errors.FullName = "Full name must be at least 3 characters";
    }

    if (!values.EmailAddress.trim()) {
      errors.EmailAddress = "Email is required";
    } else if (!emailRegex.test(values.EmailAddress)) {
      errors.EmailAddress = "Invalid email format";
    }

    if (!values.DateOfBirth) {
      errors.DateOfBirth = "Date of birth is required";
    }

    if (!values.Password) {
      errors.Password = "Password is required";
    } else if (values.Password.length < 6) {
      errors.Password = "Password must be at least 6 characters";
    }

    if (!values.About.trim()) {
      errors.About = "About is required";
    }

    return errors;
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        // 🔐 Firebase Auth Create User
        await createUserWithEmailAndPassword(auth, formValues.EmailAddress, formValues.Password);

        // Optional: Save additional data in localStorage
        localStorage.setItem("FullName", formValues.FullName);
        localStorage.setItem("EmailAddress", formValues.EmailAddress);
        localStorage.setItem("DateOfBirth", formValues.DateOfBirth);
        localStorage.setItem("About", formValues.About);

        toast.success("User registered successfully!");
        navigate("/login");
      } catch (error) {
        toast.error("Firebase Error: " + error.message);
      }
    }
  };
    return (
        <div  className="min-h-screen flex items-center justify-center bg-gray-100  px-3 max-[360px]:px-3 sm:px-4 md:px-8 lg:px-16" >
            <div  className="bg-white p-1 rounded shadow-md w-full max-w-md my-8">
                <div className="flex flex-col items-center pt-3  gap-6">

                    <h1 className="p-4 pb-[5px]   text-xl font-bold text-center">SignUp For NewUser</h1>

                    <form onSubmit={handleSubmit} className="flex flex-col space-y-5  px-5 pb-2 gap- max-[360px]:gap-1 sm:gap-4 md:gap-6  text-sm max-[360px]:text-[10px] sm:text-base md:text-lg break-words" >
                        <div>
                            <label htmlFor="FullName" className="text-sm font-medium text-gray-700"> Full Name </label>
                            <input type="text" id="FullName" name="FullName" placeholder="Enter Your Full Name" value={formValues.FullName} onChange={handleChange} className="border border-gray-400 p-2 rounded w-full" />
                            {formErrors.FullName && <p className="text-red-500">{formErrors.FullName}</p>}
                            
                        </div>
                        <div>
                            <label htmlFor="EmailAddress" className="text-sm font-medium text-gray-700">Email Address</label>
                            <input type="text" id="EmailAddress" name="EmailAddress" placeholder="Enter Your Email Address " value={formValues.EmailAddress} onChange={handleChange} className="border border-gray-400 p-2 rounded w-full"></input>
                            {formErrors.EmailAddress && <p className="text-red-500">{formErrors.EmailAddress}</p>}
                        </div>
                        <div>
                            <label htmlFor="Password" className="text-sm font-medium text-gray-700">Password</label>
                            <input type="Password" id="Password" name="Password" placeholder="Enter Your Password " value={formValues.Password} onChange={handleChange} className="border border-gray-400 p-2 rounded w-full"></input>
                            {formErrors.Password && <p className="text-red-500">{formErrors.Password}</p>}
                        </div>
                        <div>
                            <label htmlFor="DateOfBirth" className="text-sm font-medium text-gray-700">Date Of Birth</label>
                            <input type="date" id="DateOfBirth" name="DateOfBirth" value={formValues.DateOfBirth} onChange={handleChange} className="border border-gray-400 p-2 rounded w-full" />
                            {formErrors.DateOfBirth && <p className="text-red-500">{formErrors.DateOfBirth}</p>}
                        </div>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-gray-800 mt-4 mx-4 mb-4">SignUp</button>
                    </form>
                </div>
            </div>
        </div>
    )
        ;
};
export default Signup;