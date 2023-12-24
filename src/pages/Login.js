import { useState, useContext, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import loginimg from '../components/assets/login.jpg'
import { useUserLoginMutation } from '../services/Query';
import { path } from '../App';
import { Spinner } from 'react-bootstrap';


function Login() {
    const [user, checkUser] = useState();
    const navigate = useNavigate();
    const [login, { isSuccess, isLoading, isError }] = useUserLoginMutation()
    useEffect(() => {
        if (isSuccess) {
            toast.success('User Successfully registered');
            localStorage.setItem('isLogin',true)
            navigate(path.home)
        }

    }, [isSuccess])
    useEffect(() => {
        if (isError) {
            toast.error('Something Went Wrong');
            localStorage.setItem('isLogin',false)
        }

    }, [isError])


    if (isError) {
        return <p>Error</p>;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        let response = "";
        try {

            const data = {
                user_email: user.email,
                password: user.password
            }
           const userdetail= await login(data)
           console.log(userdetail)
            localStorage.setItem('userdetail', JSON.stringify(userdetail))
        } catch (error) {
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
                        <img src={loginimg} alt="signup" width="100%" />
                    </div>
                    <form className="col-xl-5 col-lg-5 col-md-8 col-sm-12 d-flex flex-column align-items-center p-xl-5 p-sm-4 pt-4" onSubmit={handleLogin}>
                        <h2 className="pt-2">Login</h2>
                        <h4 className="mb-5">Login In Your Account</h4>
                        <div className="input-group mb-3">
                            <input onChange={e => checkUser({ ...user, email: e.target.value })} type="email" className="form-control fs-6" placeholder="Email Address" aria-label="Email Adress" aria-describedby="basic-addon1" required />
                        </div>
                        <div className="input-group mb-3">
                            <input onChange={e => checkUser({ ...user, password: e.target.value })} type="password" className="form-control fs-6" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" required />
                        </div>
                        <button className="btn btn-primary fs-6 p-2 mt-2 px-4" type="submit">{isLoading?<Spinner animation="border" variant="light" />:'Login'}</button>
                        <p className='m-0'>if you don't have account! </p><span className='text-primary' style={{cursor:'pointer'}} onClick={()=>navigate(path.register)}>signup</span>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;