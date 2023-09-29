import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Grid } from '@mui/material';

export default function SkeletonBlog() {
  return (
    <Grid container spacing={5}>
        {
            [1,2,3,4].map((item) => (
                <Grid item key={item} xs={12} sm={6} md={3}>
                    <Skeleton
                        variant="rectangular"
                        height={208}
                        sx={{ borderRadius: 2 }}
                    />
                </Grid>
            ))
        }
    </Grid>
  );
}