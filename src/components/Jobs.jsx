import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './services/AuthContext';
import './Jobs.css';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [jobStatuses, setJobStatuses] = useState({}); // Store statuses for each job
    const [error, setError] = useState('');
    const [redirect, setRedirect] = useState(null); // State for redirection
    const { isLoggedIn } = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const [applied,setApplied]=useState(0);



    useEffect(() => {
        if (token) {
            fetchJobs();
        } else {
            setError('No token found, please log in first.');
        }
    }, [token,applied]);
if (!isLoggedIn) {
            return <Navigate to="/login" />;
          }

    const fetchJobs = async () => {
        try {
            const response = await fetch('https://sheskill-latest.onrender.com/job/allJobs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }

            const data = await response.json();
            setJobs(data);

            // Fetch job statuses for each job
            data.forEach(job => getStatus(job.jobId));
        } catch (error) {
            setError('Failed to fetch jobs');
        }
    };

    const getStatus = async (jobId) => {
        try {
            const response = await fetch(`https://sheskill-latest.onrender.com/application/getStatus?jobId=${jobId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch job status');
            }

            const data = await response.json();
            setJobStatuses(prevStatuses => ({
                ...prevStatuses,
                [jobId]: data // Store the boolean status for each job
            }));
        } catch (error) {
            console.error('Error fetching status:', error);
        }
    };

    const handleApply = async (jobId) => {
    const applied=false;

            try {
                const response = await fetch('https://sheskill-latest.onrender.com/application/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ jobId, status: "applied" })
                });

                if (!response.ok) {
                    throw new Error('Failed to apply');
                }

                const data = await response.json();
                applied=true;
                alert("Applied successfully");
                setApplied(applied+1);
                // Update the local state immediately
                setJobStatuses(prevStatuses => ({
                    ...prevStatuses,
                    [jobId]: true // Assume applied is true after successful application
                }));
            } catch (error) {
                setError('Failed to apply for the job');
            }
                setApplied(applied+1);
    };

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className="jobs-container">
            <h1>Exciting Job Opportunities</h1>
            <div className="jobs-list">
                {jobs.map((job) => (
                    <div key={job.jobId} className="job-item">
                        <div className="job-image-container">
                            <img src={job.image} alt={`${job.companyName} logo`} />
                        </div>
                        <div className="job-info">
                            <h2>{job.title}</h2>
                            <p>{job.companyName}</p>
                            {
                                jobStatuses[job.jobId] ? (
                                    <button onClick={() => alert("Already applied")}>Applied</button>
                                ) : (
                                    <button onClick={() => handleApply(job.jobId)}>Apply Now</button>
                                )
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Jobs;
