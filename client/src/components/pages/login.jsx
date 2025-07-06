import React from "react";

const  Login = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <div className="flex flex-col items-center  justify-center mb-6">
                    <h1 className="text-2xl font-bold">Random Chat App</h1>
                    <p className="text-xs font-medium">Please login to continue</p>
                </div>
                <form action="">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account? <a href="#" className="text-blue-500 hover:text-blue-700">Sign Up</a>
                    </p>
                </div>
            </div>
            
        </div>
    )
}

export default Login;