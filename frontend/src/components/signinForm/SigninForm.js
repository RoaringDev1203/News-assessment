import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SigninForm() {
  const nav = useNavigate();
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault();

    const staticEmail = 'active@gmail.com';
    // const staticPassword = 'Wx7#Tn$G!2pZ@9s';
    const staticPassword = '123456789'
    if(staticEmail === email && staticPassword === password){
      localStorage.setItem("userToken", JSON.stringify({email}));

      if(checked){
        localStorage.setItem("rememberedCredentials", JSON.stringify({ email, password }));
      }
      nav("/uploads");
      console.error("Login success");
    }
    else {
        console.error("Login failed");
        setError('Email or Passowrd in incorrect!');
      }
    
    // const loginData = {
    //   email: email,
    //   password: password,
    // };
    // try {
    //   const response = await fetch("http://localhost:5000/api/signin", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(loginData),
    //   });

    //   const result = await response.json();

    //   if (result.Bool) {
    //     console.log("Login successful!");

    //     if(checked){
    //       localStorage.setItem("rememberedCredentials", JSON.stringify({ email, password }));
    //     }

    //     localStorage.setItem("userToken", JSON.stringify(result.data));
    //     nav("/");
    //   } else {
    //     console.error("Login failed");
    //     setError(result.message)
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }

  }
  useEffect(() => {
    const rememberedCredentials = JSON.parse(localStorage.getItem('rememberedCredentials'));

    if (rememberedCredentials) {
      setEmail(rememberedCredentials.email);
      setPassword(rememberedCredentials.password);
    }
  }, []);
  



  // function handleSubmit() {
  //   console.log(email, password);
  //   nav("/");

  //   if(checked){
  //     localStorage.setItem('rememberedCredentials', JSON.stringify({ email, password }));
  //   }
  //   localStorage.setItem('userToken', JSON.stringify({email, password}));
  // }

  const rememberMeHandler = ()=>{

    if(email.length > 0 && password.length > 0){
      setChecked(!checked);
    }

  }

  return (
    <main className='main-content  mt-0'>
      <section>
        <div className='page-header min-vh-75'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto'>
                <div className='card card-plain mt-8'>
                  <div className='card-header pb-0 text-left bg-transparent'>
                    <h3 className='font-weight-bolder text-info text-gradient'>
                      Welcome back
                    </h3>
                    <p className='mb-0'>
                      Enter your email and password to sign in
                    </p>
                    {/* <center><p className="font-weight-bolder text-info text-gradient" style="margin-top:1rem;"><?php echo $error ?></p></center> */}
                  </div>
                  <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                      <p style={{color:"red"}}>{error}</p>
                      <label>Email</label>
                      <div className='mb-3'>
                        <input
                          type='email'
                          className='form-control'
                          placeholder='Email'
                          aria-label='Email'
                          name='email'
                          aria-describedby='email-addon'
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <label>Password</label>
                      <div className='mb-3'>
                        <input
                          type='password'
                          className='form-control'
                          placeholder='Password'
                          aria-label='Password'
                          name='password'
                          aria-describedby='password-addon'
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className='form-check form-switch'>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                          checked={checked}
                          onClick={()=> rememberMeHandler()}
                        />
                        <label className='form-check-label' for='rememberMe'>
                          Remember me
                        </label>
                      </div>
                      <div className='text-center'>
                        <button
                          type='submit'
                          className='btn bg-gradient-info w-100 mt-4 mb-0'
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='oblique position-absolute top-0 h-100 d-md-block d-none me-n8'>
                  <div
                    className='oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6'
                    style={{
                      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/curved-images/curved6.jpg)`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SigninForm;
