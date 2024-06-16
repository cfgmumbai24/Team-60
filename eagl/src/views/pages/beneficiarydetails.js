import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BeneficiaryList = () => {
    const [beneficiaries, setBeneficiaries] = useState([]);

    useEffect(() => {
        const fetchBeneficiaries = async () => {
            try {
                const response = await axios.get('https://cfg-backend.vercel.app/api/beni');
                setBeneficiaries(response.data);
            } catch (error) {
                console.error('There was an error fetching the beneficiaries!', error);
            }
        };

        fetchBeneficiaries();
    }, []);

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '800px',
            margin: 'auto',
        },
        title: {
            textAlign: 'center',
            marginBottom: '20px',
        },
        item: {
            background: '#f9f9f9',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            marginBottom: '20px',
        },
        paragraph: {
            margin: '5px 0',
        },
        strong: {
            display: 'inline-block',
            width: '120px',
            color: '#333',
        },
        hr: {
            marginTop: '15px',
            border: 'none',
            borderTop: '1px solid #ddd',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Beneficiaries</h2>
            <ul>
                {beneficiaries.map((beneficiary) => (
                    <li style={styles.item} key={beneficiary._id}>
                        <p style={styles.paragraph}>
                            <strong style={styles.strong}>Name:</strong> {beneficiary.name}
                        </p>
                        <p style={styles.paragraph}>
                            <strong style={styles.strong}>Village:</strong> {beneficiary.village}
                        </p>
                        <p style={styles.paragraph}>
                            <strong style={styles.strong}>Goats:</strong> {beneficiary.goats}
                        </p>
                        <p style={styles.paragraph}>
                            <strong style={styles.strong}>Certificate:</strong> {beneficiary.certificate}
                        </p>
                        <p style={styles.paragraph}>
                            <strong style={styles.strong}>Timestamp:</strong> {new Date(beneficiary.timestamp).toLocaleString()}
                        </p>
                        <p style={styles.paragraph}>
                            <strong style={styles.strong}>Longitude:</strong> {beneficiary.longitude}
                        </p>
                        <p style={styles.paragraph}>
                            <strong style={styles.strong}>Latitude:</strong> {beneficiary.latitude}
                        </p>
                        <hr style={styles.hr} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BeneficiaryList;
