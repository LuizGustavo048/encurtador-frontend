import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';

function App() {
    const [url, setUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
        if (!urlPattern.test(url)) {
            setError('URL inválida. Por favor, insira uma URL válida.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('https://encurtador-api.vercel.app/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });
            
            if (!response.ok) {
                throw new Error('Erro ao encurtar a URL.');
            }

            const result = await response.json();
            setShortenedUrl(result.short_url);
        } catch (error) {
            setError('Ocorreu um erro ao encurtar a URL. Tente novamente.');
        } finally {
            setLoading(false);
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
                    helperText="Digite a URL completa, incluindo http:// ou https://"
                />
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{ mt: 2 }}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Encurtar URL'}
                </Button>
            </Box>
            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
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