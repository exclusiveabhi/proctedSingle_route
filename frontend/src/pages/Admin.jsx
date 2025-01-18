import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';



const backend_url = 'https://assignment-1r2e.onrender.com';
// console.log(backend_url);


const Container = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 18px;
    background: white;
    min-height: 100vh;
`;

const CardContainer = styled(motion.div)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
`;

const Card = styled(motion.div)`
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.05);
    }

    @media (max-width: 600px) {
        padding: 15px;
    }
`;

const Admin = () => {
    const [submissions, setSubmissions] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get(`${backend_url}/api/admin/submissions`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSubmissions(response.data);
            } catch (error) {
                console.error('Error fetching submissions:', error);
                setSubmissions([]);
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'Failed to fetch submissions',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        };

        fetchSubmissions();
    }, [token]);

    return (
        <Container
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1>Admin Page</h1>
            <CardContainer>
                {Array.isArray(submissions) && submissions.length > 0 ? (
                    submissions.map((submission) => (
                        <Card
                            key={submission._id}
                            initial={{ y: 50 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2>{submission.name}</h2>
                            <p>{submission.socialHandle}</p>
                            <img src={submission.imageUrl} alt={submission.name} style={{ width: '100%', borderRadius: '10px' }} />
                        </Card>
                    ))
                ) : (
                    <center><p>No submissions found.</p></center>
                    
                )}
            </CardContainer>
        </Container>
    );
};

export default Admin;