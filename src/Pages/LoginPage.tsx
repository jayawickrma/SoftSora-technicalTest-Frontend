import { useState } from "react";
import { motion } from "framer-motion";

export  function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-10 flex flex-col justify-center bg-indigo-100"
                >
                    <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
                        {isSignUp ? "Create an Account" : "Welcome Back!"}
                    </h2>
                    <form className="space-y-4">
                        {isSignUp && (
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        )}
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="submit"
                            className="w-full py-4 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-lg"
                        >
                            {isSignUp ? "Sign Up" : "Sign In"}
                        </button>
                    </form>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-10 flex flex-col items-center justify-center bg-purple-100 text-center"
                >
                    <h2 className="text-3xl font-bold text-purple-700 mb-4">
                        {isSignUp ? "Already have an account?" : "Don't you have an Account ?"}
                    </h2>
                    <p className="mb-6 text-purple-600">
                        {isSignUp
                            ? "Sign in to manage your tasks efficiently."
                            : "Sign up to start managing your tasks like a pro!"}
                    </p>
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="px-6 py-3 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-200"
                    >
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                </motion.div>
            </div>
        </div>
    );
}