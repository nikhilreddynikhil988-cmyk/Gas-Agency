import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1f4037, #99f2c8)',
    },
    card: {
        width: '100%',
        maxWidth: '420px',
    },
};

const UserHome = () => {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={styles.container}
        >
            <div className="card shadow-lg p-4" style={styles.card}>
                <h3 className="text-center mb-3 fw-bold">🔐 User Home</h3>
                <p className="text-center text-muted mb-4">
                    Welcome to the user dashboard
                </p>
                <p>The gas agency is a company that provides gas cylinders to customers.</p>
            </div>
        </div>
    );
};

export default UserHome;