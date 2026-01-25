import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();

  /* =======================
     FORM STATE
  ======================= */
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
  const [pPincode, setPPincode] = useState("");

//   const [sStreet, setSStreet] = useState("");
//   const [sCity, setSCity] = useState("");
//   const [sState, setSState] = useState("");
//   const [sPincode, setSPincode] = useState("");

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
  };

  /* =======================
     SUBMIT
  ======================= */
  const Submit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    axios
      .post("http://localhost:3001/createUser", {
        firstName,
        middleName,
        lastName,
        countryCode,
        mobile,
        gender,
        email,
        dob,
        age,
        primaryAddress: {
          street: pStreet,
          city: pCity,
          state: pState,
          pincode: pPincode,
        },
        // secondaryAddress: {
        //   street: sStreet,
        //   city: sCity,
        //   state: sState,
        //   pincode: sPincode,
        // },
        password,
        terms,
      })
      .then(() => navigate("/users"))
      .catch((err) => console.error(err));
  };

  /* =======================
     UI
  ======================= */
  return (
    <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-4 overflow-auto">
        <h3 className="text-center mb-4">Client Details</h3>
            <form onSubmit={Submit}>
            {/* Name */}
            <div className="row mb-3">
                <div className="col-md-4">
                <label>First Name *</label>
                <input
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                </div>

                <div className="col-md-4">
                <label>Middle Name</label>
                <input
                    className="form-control"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                />
                </div>

                <div className="col-md-4">
                <label>Last Name *</label>
                <input
                    className="form-control"
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
                <select
                    className="form-control"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                >
                    <option value="+91">IN +91</option>
                    <option value="+1">US +1</option>
                </select>
                </div>

                <div className="col-md-5">
                <label>Mobile *</label>
                <input
                    className="form-control"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                />
                {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
                </div>

                <div className="col-md-4">
                <label>Gender *</label>
                <select
                    className="form-control"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">Select</option>
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
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>

                <div className="col-md-4">
                <label>Date of Birth *</label>
                <input
                    type="date"
                    className="form-control"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                />
                {errors.dob && <small className="text-danger">{errors.dob}</small>}
                </div>

                <div className="col-md-3">
                <label>Age *</label>
                <input
                    type="number"
                    className="form-control"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                {errors.age && <small className="text-danger">{errors.age}</small>}
                </div>
            </div>

            {/* Primary Address */}
            <h6 className="text-success"> Address</h6>
            <div className="row mb-3">
                <div className="col-md-8">
                <input
                    className="form-control"
                    placeholder="Street"
                    value={pStreet}
                    onChange={(e) => setPStreet(e.target.value)}
                />
                </div>
                <div className="col-md-4">
                <input
                    className="form-control"
                    placeholder="City"
                    value={pCity}
                    onChange={(e) => setPCity(e.target.value)}
                />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                <input
                    className="form-control"
                    placeholder="State"
                    value={pState}
                    onChange={(e) => setPState(e.target.value)}
                />
                </div>
                <div className="col-md-6">
                <input
                    className="form-control"
                    placeholder="Pincode"
                    value={pPincode}
                    onChange={(e) => setPPincode(e.target.value)}
                />
                </div>
            </div>

            {/* Password */}
            <div className="row mb-3">
                <div className="col-md-6">
                <label>Password *</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>

                <div className="col-md-6">
                <label>Confirm Password *</label>
                <input
                    type="password"
                    className="form-control"
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
            <input
                className="form-control mb-1"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
            />
            {errors.captcha && <small className="text-danger">{errors.captcha}</small>}

            {/* Terms */}
            <div className="mt-3">
                <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                />{" "}
                I agree to terms
                {errors.terms && <div className="text-danger">{errors.terms}</div>}
            </div>

            <button className="btn btn-dark mt-3">Save</button>
            </form>

      </div>
    </div>
  );
}

export default Form;
