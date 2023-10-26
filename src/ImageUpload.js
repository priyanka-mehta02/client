import React, { useState } from 'react';

function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!selectedFile) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('avatar', selectedFile);

        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMessage(data.message);
            })
            .catch((error) => {
                console.log(error);
                setMessage('An error occurred during the upload.');
            });
    };

    return (
        <div>
            <h1>Image Upload</h1>
            <input type="file"  name ="avatar"accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>
            <p>{message}</p>
        </div>
    );
}

export default ImageUpload;
