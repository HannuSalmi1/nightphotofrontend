'use client'
import { useState } from 'react';

export default function SignInForm() {

    const [Username, setUsername] = useState('');

    const [Password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('https://localhost:7046/api/Users/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({

                Username,

                Password
            }),
        });

        response.json().then(data => {
            let jwtToken = data.token;

        });
    };


    return <div className="">
        <form onSubmit={handleSubmit}
              className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign Up</h1>

                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="username"
                        value={Username} onChange={e => setUsername(e.target.value)}
                        placeholder="Username"/>


                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        value={Password} onChange={e => setPassword(e.target.value)}
                        placeholder="Password"/>


                    <button
                        type="submit"
                        className="bg-amber-600 hover:bg-amber-500 w-full p-3 text-black font-bold py-2 px-4  rounded "
                    >Create Account
                    </button>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account?
                    <a className="no-underline border-b border-blue text-blue" href="../login/">
                        Log in
                    </a>.
                </div>
            </div>
        </form>
    </div>

}
