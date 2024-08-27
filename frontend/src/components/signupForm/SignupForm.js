import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function SignupForm() {
  // sign up key: fqPhhQnp3TsowJLk70rdyjIk5P1tpBrc
  const nav = useNavigate()
  const [checked, setChecked] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [password, setPassword] = useState("")
  const [key, setKey] = useState("")
  const [error, setError] = useState("")
  const [invalidKeyAttempts, setInvalidKeyAttempts] = useState(0);
  const ipRef = useRef("");
  const [isIpMatched, setIsIpMatched] = useState(false);

  useEffect(() => {
    async function fetchIp() {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const ip = response.data.ip;
        ipRef.current = ip;

        const responseIpCheck = await fetch(`http://localhost:5000/api/get-api?ip=${ip}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const res = await responseIpCheck.json();


        if (res.Bool) {
          setIsIpMatched(true);
          console.log("IP matched in the database.");
          setError("you can't access this website")
        }
        else {
          setIsIpMatched(false);
          console.log("IP not matched in the database.");
        }
      } catch (error) {
        console.error("Error fetching IP or checking IP:", error);
      }
    }

    fetchIp();
  }, []);


  async function handleSubmit(e) {
    e.preventDefault();

    const myIp = ipRef.current;

    if (key === "fqPhhQnp3TsowJLk70rdyjIk5P1tpBrc") {
      setInvalidKeyAttempts(0);
      const signupData = {
        username: username,
        email: email,
        number: number,
        password: password,
        key: key
      };

      try {
        const response = await fetch("http://localhost:5000/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        });

        const result = await response.json();

        
        if (result.Bool) {
          console.log("signup successful!");
          if (checked) {
            localStorage.setItem("rememberedCredentials", JSON.stringify({ email, password }));
          }
          localStorage.setItem("userToken", JSON.stringify(result.data));
          nav("/");
        } else {
          setError(result.message)
          console.error("signup failed", e);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
    
      setInvalidKeyAttempts(invalidKeyAttempts + 1);

     
      if (invalidKeyAttempts >= 2) {
        try {
          const response = await fetch('http://localhost:5000/api/add-api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ip: myIp }),
          });

          const result = await response.json();

          if (result.Bool) {
            setIsIpMatched(true);
            setError("You can't access this website")
            console.log("IP address stored in the database.");
          } else {
            console.error("Error storing IP address.");
          }
        } catch (error) {
          console.error("Error sending request:", error);
        }
      } else {
        console.error("Invalid key. Signup failed.");
        setError("Invalid key. Signup failed.");
      }
    }
  }

  useEffect(() => {
    const rememberedCredentials = JSON.parse(localStorage.getItem('rememberedCredentials'));

    if (rememberedCredentials) {
      setEmail(rememberedCredentials.email);
      setPassword(rememberedCredentials.password);
    }
  }, []);


  const rememberMeHandler = () => {

    if (email.length > 0 && password.length > 0) {
      setChecked(!checked);
    }

  }

  return (
    <main className="main-content  mt-0">
      <section>
        <div className="page-header min-vh-75">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                <div className="card card-plain mt-8">
                  <div className="card-header pb-0 text-left bg-transparent">
                    <h3 className="font-weight-bolder text-info text-gradient">Welcome</h3>
                    <p className="mb-0">Enter your email and password to sign up</p>
                    {/* <center><p className="font-weight-bolder text-info text-gradient" style="margin-top:1rem;"><?php echo $error ?></p></center> */}

                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <p style={{ color: "red" }}>{error}</p>
                      <label>Name</label>
                      <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Name" aria-label="Name" name="name" aria-describedby="name-addon" required value={username} onChange={(e) => setUsername(e.target.value)} />
                      </div>
                      <label>Email</label>
                      <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Email" aria-label="Email" name="email" aria-describedby="email-addon" required value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <label>Number</label>
                      <div className="mb-3">
                        <input type="number" className="form-control" placeholder="Phone number" aria-label="Number" name="Number" aria-describedby="number-addon" required value={number} onChange={(e) => setNumber(e.target.value)} />
                      </div>
                      <label>Password</label>
                      <div className="mb-3">
                        <input type="password" className="form-control" placeholder="Password" aria-label="Password" name="password" aria-describedby="password-addon" required value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      <label>Key</label>
                      <div className="mb-3">
                        <input type="text" className="form-control" placeholder="key" aria-label="key" name="" aria-describedby="key-addon" required value={key} onChange={(e) => setKey(e.target.value)} />
                      </div>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="rememberMe" checked={checked} onClick={() => rememberMeHandler()} />
                        <label className="form-check-label" for="rememberMe">Remember me</label>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn bg-gradient-info w-100 mt-4 mb-0" disabled={isIpMatched}>Sign up</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                  <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/curved-images/curved6.jpg)` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignupForm;