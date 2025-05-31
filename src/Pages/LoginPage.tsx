import { useState } from "react";
import '../CSS/LoginPage.css'
export  function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);

    // @ts-ignore
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(isSignUp ? "Signing up..." : "Signing in...");
    };

    return (
        <>

            <div className="login-container d-flex align-items-center justify-content-center">
                <div className="login-card w-100">
                    <div className="row h-100">
                        <div className="col-md-6 form-section slide-in-left">
                            <h2 className="form-title">
                                {isSignUp ? "Create an Account" : "Welcome Back!"}
                            </h2>
                            <div>
                                {isSignUp && (
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            className="form-input"
                                        />
                                    </div>
                                )}
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="form-input"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="form-input"
                                    />
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    className="btn-primary-custom"
                                >
                                    {isSignUp ? "Sign Up" : "Sign In"}
                                </button>
                            </div>
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
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="btn-outline-custom"
                            >
                                {isSignUp ? "Sign In" : "Sign Up"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}