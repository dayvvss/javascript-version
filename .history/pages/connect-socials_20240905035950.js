import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import TwitterLoginCard from 'src/views/cards/TwitterLoginCard';
import LinkedInLoginCard from 'src/views/cards/LinkedInLoginCard';
import { useRouter } from 'next/router';

const ConnectSocials = () => {
  const router = useRouter();

  useEffect(() => {
    const { twitterAccessToken, twitterAccessTokenSecret } = router.query;
    if (twitterAccessToken && twitterAccessTokenSecret) {
      // Store the tokens securely (e.g., in your database)
      console.log('Twitter tokens received:', { twitterAccessToken, twitterAccessTokenSecret });
      // Clear the tokens from the URL
      router.replace('/connect-socials', undefined, { shallow: true });
    }
  }, [router]);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant="h5">Connect Social Media Accounts</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TwitterLoginCard />
      </Grid>
      <Grid item xs={12} md={6}>
        <LinkedInLoginCard />
      </Grid>
    </Grid>
  );
};

export default ConnectSocials;