import React from "react";
import { Link } from "react-router-dom";

const AdminWelcome = () => {
    return (
        <>
            <div className="text-center"></div>
            <h1 className="display-4">Welcome, Admin!</h1>
            <p className="lead">Manage your gas agency operations efficiently.</p>
            <hr className="my-4" />
            <p>Use the dashboard to view and manage bookings, users, and notices.</p>
            <Link className="btn btn-primary btn-lg" to="/admin-dashboard" role="button">
                Go to Dashboard
            </Link>
        </>
    );
};

export default AdminWelcome;