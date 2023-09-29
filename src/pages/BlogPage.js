import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, Alert } from '@mui/material';
import useAllArticles from '../modules/@dashboard/blog/hooks/useAllArticles';
// components
import Iconify from '../components/iconify';
import { BlogPostCard } from '../modules/@dashboard/blog/components/index';
// mock
import ModalFormblog from '../modules/@dashboard/blog/components/ModalFormBlog';
import SkeletonBlog from '../modules/@dashboard/blog/components/SkeletonBlog';
// ----------------------------------------------------------------------

export default function BlogPage() {
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const { isLoading, data, refetch } = useAllArticles()

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Liste des Articles
          </Typography>
          <Button onClick={handleOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Nouvel Article
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {
            isLoading ?
              <SkeletonBlog />
            :
              data?.items?.length > 0 ?
                data?.items?.map((post, index) => (
                  post?.media?.media_type === 'image' &&
                    <BlogPostCard 
                      key={post.id} 
                      post={post} 
                      index={index} 
                    />
                ))
            :
              <Alert severity="error">Aucun article trouvé !</Alert>
          }
          {data?.items?.map((post) => (
            post?.media?.media_type === 'image' &&
              <BlogPostCard 
                key={post?.id} 
                post={post} 
              />
          ))}
        </Grid>
        <ModalFormblog 
          refetch={ refetch } 
          open={open} 
          onClose={handleClose} 
        />
      </Container>
    </>
  );
}
