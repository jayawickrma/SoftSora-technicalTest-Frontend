import { useEffect, useState } from "react";
import "../CSS/LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { UserRootState } from "../Slices/UserSlice.ts";
import { register, login } from "../Slices/UserSlice.ts";
import type { AppDispatch } from "../Store/Store.ts";
import Swal from "sweetalert2";

export function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const {  loading, error } = useSelector((state: UserRootState) => state.user);





    useEffect(() => {
        if (!loading && error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
            });
        }
    }, [loading, error]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password || (isSignUp && !name)) {
            Swal.fire("Missing Fields", "Please fill all required fields.", "warning");
            return;
        }

        if (isSignUp) {
            const resultAction = await dispatch(register({ name, email, password }));
            if (register.fulfilled.match(resultAction)) {
                Swal.fire({
                    icon: "success",
                    title: "Registration Successful",
                    text: "You can now sign in with your new account.",
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => {
                    setIsSignUp(false);
                    setName("");
                    setEmail("");
                    setPassword("");
                });
            }
        } else {
            const signInResult = await dispatch(login({ name: "", email, password }));
            if (login.fulfilled.match(signInResult)) {
                Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    text: "You are now signed in!",
                    timer: 1500,
                    showConfirmButton: false,
                }).then(() => {
                    localStorage.setItem('user-email' , email);
                    navigate("/tasks")
                });
            }
        }
    };

    return (
        <div className="login-container d-flex align-items-center justify-content-center">
            <div className="login-card w-100">
                <div className="row h-100">
                    <div className="col-md-6 form-section slide-in-left">
                        <h2 className="form-title">
                            {isSignUp ? "Create an Account" : "Welcome Back!"}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            {isSignUp && (
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="form-input"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            )}
                            <div className="mb-3">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="form-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="form-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn-primary-custom"
                                disabled={loading}
                            >
                                {loading
                                    ? "Processing..."
                                    : isSignUp
                                        ? "Sign Up"
                                        : "Sign In"}
                            </button>
                        </form>
                    </div>

                    <div className="col-md-6 welcome-section slide-in-right">
                        <h2 className="welcome-title">
                            {isSignUp ? "Already have an account?" : "Don't have an Account?"}
                        </h2>
                        <p className="welcome-text">
                            {isSignUp
                                ? "Sign in to manage your tasks efficiently."
                                : "Sign up to start managing your tasks like a pro!"}
                        </p>
                        <button
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setName("");
                                setEmail("");
                                setPassword("");
                            }}
                            className="btn-outline-custom"
                        >
                            {isSignUp ? "Sign In" : "Sign Up"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
