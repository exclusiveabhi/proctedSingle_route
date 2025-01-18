import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';


const backend_url = "https://assignment-1r2e.onrender.com";

const FormContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: #f0f2f5;
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

const handleAdminLogin = () => {
    window.location.href = '/login';
};

const UserForm = () => {
    const [name, setName] = useState('');
    const [socialHandle, setSocialHandle] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('socialHandle', socialHandle);
        formData.append('image', image);

        try {
            await axios.post(`${backend_url}/api/users/submit`, formData);
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Submission successful',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            Swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'Submission failed',
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    whileFocus={{ scale: 1.05 }}
                />
                <Input
                    type="text"
                    value={socialHandle}
                    onChange={(e) => setSocialHandle(e.target.value)}
                    placeholder="Social Handle"
                    whileFocus={{ scale: 1.05 }}
                />
                <Input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    whileFocus={{ scale: 1.05 }}
                />
                <Button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Submit
                </Button>
                <Button
    onClick={handleAdminLogin}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    style={{ width: '100%', marginTop: '10px' }}
>
    Login as Admin
</Button>
<center>
<p>After click on submit please wait 5-7 sec.</p></center>
            </Form>
        </FormContainer>
        
    );
};

export default UserForm;