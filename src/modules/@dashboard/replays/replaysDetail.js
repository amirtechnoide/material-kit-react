import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
// @mui
import { Grid, Button, Container, Stack, Typography, Alert } from '@mui/material';
import useAllArticles from '../modules/@dashboard/blog/hooks/useAllArticles';
// components
import Iconify from '../components/iconify';
// mock
import SkeletonBlog from '../modules/@dashboard/blog/components/SkeletonBlog';
import BlogCardVideo from '../modules/@dashboard/blog/components/BlogCardVideo';
// ----------------------------------------------------------------------

export default function replaysDetail() {
    const { isLoading, data } = useAllArticles();
    if (isLoading) {
        return <SkeletonBlog />;
    }
    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Details
                    </Typography>

                </Stack>

                <Grid container spacing={3}>
                    {data?.items?.map(
                        (post) => post?.media?.media_type === 'video' &&
                            (<Link to={`/video/${post.id}`} key={post?.id}>
                                <BlogCardVideo post={post} />
                            </Link>)
                    )}
                </Grid>
            </Container>
        </>
    );
}
