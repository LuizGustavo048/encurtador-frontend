import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';

function App() {
    const [url, setUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://encurtador-api.vercel.app/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });
            const result = await response.json();
            setShortenedUrl(result.short_url);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortenedUrl);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Encurtador de URLs
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                <TextField
                    label="Digite a URL"
                    variant="outlined"
                    fullWidth
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{ mt: 2 }}
                >
                    Encurtar URL
                </Button>
            </Box>
            {shortenedUrl && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">URL Encurtada:</Typography>
                    <Box display="flex" alignItems="center">
                        <Typography variant="body1" sx={{ mr: 2 }}>
                            {shortenedUrl}
                        </Typography>
                        <Button 
                            startIcon={<ContentCopy />} 
                            variant="outlined" 
                            onClick={handleCopy}
                        >
                            Copiar
                        </Button>
                    </Box>
                </Box>
            )}
        </Container>
    );
}

export default App;