import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import signupimg from '../components/assets/signup.jpg'
import { useUserSignupMutation } from '../services/Query';
import { useNavigate } from 'react-router-dom';
import { path } from '../App';
import { Spinner } from 'react-bootstrap';



function SignUp() {
    const navigate = useNavigate()
    const [user, setUser] = useState({});
    const [signup, { isSuccess, isLoading, isError }] = useUserSignupMutation();
    useEffect(() => {
        if (isSuccess) {
            toast.success('User Successfully registered');
            navigate(path.login)
        }

    }, [isSuccess])
    useEffect(() => {
        if (isError) {
            toast.success('Something Went Wrong');
        }

    }, [isError])

    
    if (isError) {
        return <p>Error</p>;
    }




    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user.profileImage);
        const form = document.querySelector('#add-form');
        form.reset();
        let response = "";
        try {
            const data = {
                user_name: user.name,
                user_email: user.email,
                user_number: user.contactNumber,
                user_password: user.password
            }
            await signup(data);
            // response = await axios.post('http://localhost:8000/api/user/register', {
            //     name: user.name,
            //     email: user.email,
            //     age: user.age,
            //     contactNumber: user.contactNumber,
            //     password: user.password
            // });

            toast.success('User Successfully registered');
        } catch (error) {
            toast.error(error.response.data['Something went wrong']);
        }
    }

    return (
        <>
            <div><Toaster
                position="top-center"
                autoClose={1000}
                theme="dark"
            /></div>
            <div className="container mt-5 p-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-xl-5 col-lg-5 mt-lg-5 mt-xl-0 col-md-8 col-sm-12">
                        <img src={signupimg} alt="signup" width="100%" />
                    </div>
                    <form id="add-form" className="col-xl-5 col-lg-5 col-md-8 col-sm-12 d-flex flex-column align-items-center p-xl-5 p-sm-4 pt-4" onSubmit={handleSubmit}>
                        <h2 className="pt-2">Sign Up</h2>
                        <h4 className="mb-5">Create Your Account</h4>
                        <div className="input-group mb-3">
                            <input onChange={e => setUser({ ...user, name: e.target.value })} type="text" className="form-control fs-6 outline-none" placeholder="Full Name" aria-label="Full Name" aria-describedby="basic-addon1" required />
                        </div>
                        <div className="input-group mb-3">
                            <input onChange={e => setUser({ ...user, email: e.target.value })} type="email" className="form-control fs-6" placeholder="Email Address" aria-label="Email Address" aria-describedby="basic-addon1" required />
                        </div>
                        <div className="input-group mb-3">
                            <input onChange={e => setUser({ ...user, contactNumber: e.target.value })} type="contactNumber" className="form-control fs-6" placeholder="Contact Number" aria-label="Contact Number" aria-describedby="basic-addon1" required />
                        </div>
                        <div className="input-group mb-3">
                            <input onChange={e => setUser({ ...user, password: e.target.value })} type="password" className="form-control fs-6" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" required />
                        </div>

                        <button className="btn btn-primary fs-6 p-2 mt-2 px-4 w-25" type="submit">{isLoading?<Spinner animation="border" variant="light" />:'SignUp'}</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;