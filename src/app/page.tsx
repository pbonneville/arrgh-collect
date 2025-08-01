'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid2 as Grid,
  Card,
  CardContent,
  CircularProgress,
  Paper,
  Stack,
  Chip,
  Alert,
} from '@mui/material';
import {
  Email as EmailIcon,
  Edit as EditIcon,
  Lightbulb as LightbulbIcon,
  MenuBook as MenuBookIcon,
} from '@mui/icons-material';
import { alpha, useTheme } from '@mui/material/styles';
import appConfig from '../../config.json';

export default function Home() {
  const { user, loading, signInWithMagicLink, authState } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const theme = useTheme();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={32} sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Loading...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
      }}
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          {/* Hero Section */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 3,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {appConfig.app.displayName}
          </Typography>
          
          <Typography
            variant="h2"
            component="p"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
          >
            {appConfig.app.description}
          </Typography>
          
          {/* Feature Highlights */}
          <Paper
            elevation={1}
            sx={{
              p: 3,
              mb: 6,
              maxWidth: '900px',
              mx: 'auto',
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
            }}
          >
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              <Chip
                icon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />}
                label="Capture highlights anywhere"
                variant="outlined"
                sx={{ fontSize: '0.875rem' }}
              />
              <Chip
                icon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />}
                label="AI extracts entities & relationships"
                variant="outlined"
                sx={{ fontSize: '0.875rem' }}
              />
              <Chip
                icon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'secondary.main' }} />}
                label="Build your knowledge graph"
                variant="outlined"
                sx={{ fontSize: '0.875rem' }}
              />
            </Stack>
          </Paper>
          
          {/* Email Signup Form */}
          <Box sx={{ mb: 8, maxWidth: '400px', mx: 'auto' }}>
            <TextField
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{
                sx: { borderRadius: 2 }
              }}
            />
            <Button
              onClick={() => signInWithMagicLink(email)}
              disabled={!email || authState.isSigningIn}
              variant="contained"
              size="large"
              fullWidth
              startIcon={
                authState.isSigningIn ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <EmailIcon />
                )
              }
              sx={{
                py: 1.5,
                fontSize: '1.125rem',
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              {authState.isSigningIn ? 'Sending Magic Link...' : 'Get Started with Magic Link'}
            </Button>
            {authState.error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {authState.error.message}
              </Alert>
            )}
          </Box>
        </Box>
        
        {/* Features Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid xs={12} md={4}>
            <Card
              elevation={2}
              sx={{
                height: '100%',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <EditIcon sx={{ color: 'primary.main' }} />
                </Box>
                <Typography variant="h3" component="h3" sx={{ mb: 1 }}>
                  One-Click Capture
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Highlight any text on any website with our bookmarklet. Instantly save insights to your personal knowledge base.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid xs={12} md={4}>
            <Card
              elevation={2}
              sx={{
                height: '100%',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <LightbulbIcon sx={{ color: 'success.main' }} />
                </Box>
                <Typography variant="h3" component="h3" sx={{ mb: 1 }}>
                  AI Knowledge Graph
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Automatically extract entities, topics, and relationships from your highlights using advanced AI processing.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid xs={12} md={4}>
            <Card
              elevation={2}
              sx={{
                height: '100%',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <MenuBookIcon sx={{ color: 'secondary.main' }} />
                </Box>
                <Typography variant="h3" component="h3" sx={{ mb: 1 }}>
                  Smart Organization
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  All content stored as portable Markdown with YAML front matter. Your knowledge remains yours, forever.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      {/* Footer */}
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary">
            Built with Next.js, Supabase, FastAPI, and AI-powered knowledge management
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
