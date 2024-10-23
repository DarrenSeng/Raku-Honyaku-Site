import React from 'react';
import { Link } from 'react-router-dom';

export default function EmailVerifiedPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-green-600">Email Verified Successfully!</h1>
            <p className="text-lg mt-4 text-slate-200">Your email has been verified. You can now log in to your account.</p>
            <Link to="/login" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Go to Login
            </Link>
        </div>
    );
}