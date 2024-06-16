import React, { useState } from 'react';
import axios from 'axios';
import {
    Container,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Alert,
} from '@mui/material';
import { useParams } from 'react-router-dom';

const AddTask = () => {
    const { uid } = useParams();
    const [taskData, setTaskData] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await axios.post(`https://cfg-backend.vercel.app/addTask`, { ...taskData, uid });
            console.log('Task added successfully:', response.data);
            setLoading(false);
            setSuccess(true);
            setTaskData("");
        } catch (error) {
            console.error('Error adding task:', error);
            setError(error);
            setLoading(false);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Add Task for Volunteer {uid}
            </Typography>
            {loading && <CircularProgress style={{ margin: '20px auto', display: 'block' }} />}
            {error && <Alert severity="error">{error.message}</Alert>}
            {success && <Alert severity="success">Task added successfully!</Alert>}
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <TextField
                        label="Task Description"
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                        required
                        fullWidth
                        variant="outlined"
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <TextField
                        label="Due Date"
                        name="dueDate"
                        type="date"
                        value={taskData.dueDate}
                        onChange={handleChange}
                        required
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={styles.input}
                    />
                </div>
                <Button variant="contained" color="primary" type="submit" style={styles.submitButton}>
                    Add Task
                </Button>
            </form>
        </Container>
    );
};

const styles = {
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        marginBottom: '10px',
    },
    submitButton: {
        display: 'block',
        marginTop: '20px',
    },
};

export default AddTask;
