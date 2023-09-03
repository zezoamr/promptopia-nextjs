"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');

    async function isImageURL(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            const contentType = response.headers.get('Content-Type');
            return contentType.startsWith('image/');
        } catch (error) {
            return false
        }
        
    }

    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!username || !email || !password || !image) {
            alert("All those fields are required!")
            return;
        }
        if(! await isImageURL(image)) {
            alert("Please upload an image")
            return;
        }

        // Send a POST request to the API route with the user's information
        const response = await fetch('/api/users/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, image, password }),
        });

        // Handle the response
        if (response.ok) {
            router.push('/');
        } else {
            const data = await response.json();
            console.log(data);
            alert("signing up failed " + data.message || response.status);
        }
    };

    return (
        <section className='w-full max-w-full flex-center flex-col'>
        <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Username
                </span>
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value.trim())} className='form_input'/>
            </label>
            <br />
            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Email
                </span>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value.trim())} className='form_input'/>
            </label>
            <br />
            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Password:
                </span>
                <input type="password" placeholder='' value={password} onChange={(event) => setPassword(event.target.value.trim())} className='form_input'/>
            </label>
            <br />
            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Image:
                </span>
                <input type="text" value={image} onChange={(event) => setImage(event.target.value.trim())} className='form_input'/>
            </label>
            <button type="submit" className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>Sign Up</button>
        </form>
        </section>
    );
}
