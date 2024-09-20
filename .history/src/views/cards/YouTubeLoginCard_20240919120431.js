import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import api from 'src/config/api';
import axios from 'axios';

const YouTubeLoginCard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code) {
      handleOAuthCallback(code, state);
    }
  }, []);

  const handleYouTubeLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/youtube/request-token');
      window.location.href = response.data.authorizationUrl;
    } catch (err) {
      setError('Failed to initiate YouTube login. Please try again.');
      console.error('YouTube login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthCallback = async (code, state) => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/api/youtube/access-token', { code, state });
      
      // Handle successful login (e.g., update UI, store user info)
    } catch (err) {
      setError('Failed to complete YouTube login. Please try again.');
      console.error('YouTube OAuth callback error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card 
      onClick={handleYouTubeLogin}
      sx={{ 
        cursor: 'pointer', 
        width: 200,
        opacity: loading ? 0.7 : 1,
        transition: 'opacity 0.3s',
        position: 'relative',
      }}
    >
      <CardContent>
        <Box sx={{ my: 4, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', '& svg': { mr: 1 } }}>
            <img
              src="/images/logos/YouTube.png"
              alt="YouTube"
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
            <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
              YouTube
            </Typography>
          </Box>
        </Box>
        {loading && (
          <CircularProgress 
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: -12,
              marginLeft: -12,
            }}
          />
        )}
        {error && (
          <Typography color="error" sx={{ mt: 1, fontSize: '0.8rem' }}>
            {error}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default YouTubeLoginCard;
