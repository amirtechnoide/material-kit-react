import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
// @mui
import { Grid, Button, Container, Stack, Typography, Alert } from '@mui/material';
import useAllArticles from '../modules/@dashboard/blog/hooks/useAllArticles';
// components
import Iconify from '../components/iconify';
import { BlogPostCard } from '../modules/@dashboard/blog/components/index';
// mock
import SkeletonBlog from '../modules/@dashboard/blog/components/SkeletonBlog';
// ----------------------------------------------------------------------

export default function BlogPage() {

  const { isLoading, data } = useAllArticles()

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Liste des articles
          </Typography>
          <Link to='/dashboard/articles/addArticle'>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Nouvel Article
            </Button>
          </Link>
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
      </Container>
    </>
  );
}
