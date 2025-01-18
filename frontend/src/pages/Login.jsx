import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';


const backend_url = "https://assignment-1r2e.onrender.com"

const FormContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: white;
    padding: 20px;
`;

const Form = styled(motion.form)`
    display: flex;
    flex-direction: column;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;

    @media (max-width: 600px) {
        padding: 15px;
    }
`;

const Input = styled(motion.input)`
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;

    @media (max-width: 600px) {
        font-size: 14px;
    }
`;

const Button = styled(motion.button)`
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;

    &:hover {
        background: #0056b3;
    }

    @media (max-width: 600px) {
        font-size: 14px;
    }
`;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backend_url}/api/admin/login`, { username, password });
            login(response.data.token);
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Login successful',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/admin');
        } catch (error) {
            Swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'Login failed',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <FormContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Form
                onSubmit={handleSubmit}
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username is:- admin"
                    whileFocus={{ scale: 1.05 }}
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password is:- 1234"
                    whileFocus={{ scale: 1.05 }}
                />
                <Button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Login
                </Button>
                <center>
                    <p>After click on login please wait 5-7 sec.</p>
                </center>
            </Form>
        </FormContainer>
    );
};

export default Login;