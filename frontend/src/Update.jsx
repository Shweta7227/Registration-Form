import { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function Update() {
    const{id} = useParams()

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [age, setAge] = useState("");
  
    const [pStreet, setPStreet] = useState("");
    const [pCity, setPCity] = useState("");
    const [pState, setPState] = useState("");
    const [pPinCode, setPPinCode] = useState("");
  
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [terms, setTerms] = useState(false);
    const [errors, setErrors] = useState({});
  
    /* =======================
       CAPTCHA STATE
    ======================= */
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [operator, setOperator] = useState("+");
    const [captchaInput, setCaptchaInput] = useState("");
  
    /* =======================
       CAPTCHA GENERATOR
    ======================= */
    const generateCaptcha = () => {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      const op = Math.random() > 0.5 ? "+" : "-";
  
      setNum1(a);
      setNum2(b);
      setOperator(op);
      setCaptchaInput("");
    };
  
    useEffect(() => {
      generateCaptcha();
    }, []);
  
    const getCaptchaAnswer = () => {
      return operator === "+" ? num1 + num2 : num1 - num2;
    };
  
    /* =======================
       VALIDATION
    ======================= */
    const validate = () => {
      let newErrors = {};
  
      if (!firstName.trim()) newErrors.firstName = "First name is required";
      if (!lastName.trim()) newErrors.lastName = "Last name is required";
      if (!mobile.trim()) newErrors.mobile = "Mobile number is required";
      if (!gender) newErrors.gender = "Gender is required";
      if (!dob) newErrors.dob = "Date of birth is required";
      if (!age) newErrors.age = "Age is required";
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) newErrors.email = "Email is required";
      else if (!emailRegex.test(email))
        newErrors.email = "Invalid email format";
  
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!password) newErrors.password = "Password is required";
      else if (!passwordRegex.test(password))
        newErrors.password =
          "8+ chars, uppercase, lowercase & number required";
  
      if (password !== confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
  
      if (!terms) newErrors.terms = "You must accept the terms";
  
      if (parseInt(captchaInput) !== getCaptchaAnswer()) {
        newErrors.captcha = "Incorrect captcha";
        generateCaptcha(); // regenerate on failure
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
// to get the user on screen
  useEffect(() => {
    axios.get("http://localhost:3001/getUser/" + id)
      .then(result => {
        setFirstName(result.data.firstName || "");
        setMiddleName(result.data.middleName || "");
        setLastName(result.data.lastName || "");
        setCountryCode(result.data.countryCode || "+91");
        setMobile(result.data.mobile || "");
        setGender(result.data.gender || "");
        setEmail(result.data.email || "");
        setDob(result.data.dob?.slice(0, 10) || "");
        setAge(result.data.age || "");
        setPStreet(result.data.pStreet || "");
        setPCity(result.data.pCity || "");
        setPState(result.data.pState || "");
        setPPinCode(result.data.pPinCode || "");
        setTerms(result.data.terms || false);
      })
      .catch(err => console.log(err));
  }, [id]);


//to submit the user's new updated data
      const Updates = (e) => {
        e.preventDefault();
        if (!validate()) return;

        console.log("Submitting:");
        axios.put("http://localhost:3001/updateUser/"+id,{
            firstName,middleName,lastName,countryCode,mobile,gender,email,dob,age,pStreet,pCity,pState,pPinCode,password,terms
        })
        .then(()=> navigate("/users")
             // Navigate to  Userpage(Main Page)
        )
        .catch(err => {
            console.error("Axios error:", err);
        });
    }
  return (
    <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-4 overflow-auto">

        {/* Heading */}
        <h3 className="text-center mb-4">Update Details</h3>

        <form onSubmit={Updates}>

          {/* Name */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label>First Name *</label>
              <input className="form-control" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && <small className="text-danger">{errors.firstName}</small>}

            </div>

            <div className="col-md-4">
              <label>Middle Name</label>
              <input className="form-control" 
                value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
              />
              {/* {errors.firstName && <small className="text-danger">{errors.firstName}</small>} */}
            </div>

            <div className="col-md-4">
              <label>Last Name *</label>
              <input className="form-control" 
               value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && <small className="text-danger">{errors.lastName}</small>}

            </div>
          </div>

          {/* Contact */}
          <div className="row mb-3">
            <div className="col-md-3">
              <label>Country Code</label>
              <select className="form-control"
                value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
              >
                <option>IN +91</option>
                <option>US +1</option>
              </select>
            </div>

            <div className="col-md-5">
              <label>Mobile *</label>
              <input className="form-control" 
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              {errors.mobile && <small className="text-danger">{errors.mobile}</small>}

            </div>

            <div className="col-md-4">
              <label>Gender *</label>
              <select className="form-control" 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              {errors.gender && <small className="text-danger">{errors.gender}</small>}

            </div>
          </div>

          {/* Email / DOB / Age */}
          <div className="row mb-3">
            <div className="col-md-5">
              <label>Email *</label>
              <input type="email" className="form-control" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}

            </div>

            <div className="col-md-4">
              <label>Date of Birth *</label>
              <input type="date" className="form-control" 
               value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              {errors.dob && <small className="text-danger">{errors.dob}</small>}

            </div>

            <div className="col-md-3">
              <label>Age *</label>
              <input type="number" className="form-control"
                value={age}
                    onChange={(e) => setAge(e.target.value)}
              />
                {errors.age && <small className="text-danger">{errors.age}</small>}

            </div>
          </div>

          {/* Address */}
          <h6 className="text-success">Address</h6>
          <div className="row mb-3">
            <div className="col-md-8">
              <input className="form-control" placeholder="Street" 
               value={pStreet}
                    onChange={(e) => setPStreet(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input className="form-control" placeholder="City" 
               value={pCity}
                    onChange={(e) => setPCity(e.target.value)}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <input className="form-control" placeholder="State" 
              value={pState}
                    onChange={(e) => setPState(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input className="form-control" placeholder="Pincode" 
               value={pPinCode}
                    onChange={(e) => setPPinCode(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Password *</label>
              <input type="password" className="form-control" 
               value={password}
                    onChange={(e) => setPassword(e.target.value)}
              />
                {errors.password && <small className="text-danger">{errors.password}</small>}

            </div>

            <div className="col-md-6">
              <label>Confirm Password *</label>
              <input type="password" className="form-control" 
               value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                    <small className="text-danger">{errors.confirmPassword}</small>
              )}
            </div>
          </div>

          {/* Captcha */}
          <label>
            Solve: {num1} {operator} {num2} = ?
          </label>
          <input className="form-control mb-2" 
            value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
           />
           {errors.captcha && <small className="text-danger">{errors.captcha}</small>}


          {/* Terms */}
          <div className="mb-3">
            <input type="checkbox" 
              checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            /> I agree to terms
            {errors.terms && <div className="text-danger">{errors.terms}</div>}

          </div>

          {/* Button */}
          <button className="btn btn-dark">Update</button>

        </form>
      </div>
    </div>
  );
}


export default Update;
