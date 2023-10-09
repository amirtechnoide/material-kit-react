import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Card, CardContent, IconButton, Link, Typography, styled } from '@mui/material'
import useOneArticle from '../hooks/useOneArticle'

import { fDate } from '../../../../utils/formatTime';
import LinearLoader from '../../../../components/loader/LinearLoader';


const BlogPostDetail = ({ isReplay = false }) => {
  const { id } = useParams()
  const data = useOneArticle(id)
  if (data?.data?.article?.media?.media_type === "video") {
    isReplay = true
  }
  const StyledCardMedia = styled('div')({
    position: 'relative',
    paddingTop: 'calc(100% * 3 / 4)',
  });
  const StyledTitle = styled(Link)({
    height: 44,
    overflow: 'hidden',
    WebkitLineClamp: 2,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
  });

  const StyledCover = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
  });
  if (data?.isLoading) return <LinearLoader />
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}  >
      <Card sx={{ position: 'relative', width: "80%" }}>
        <StyledCardMedia>
          <StyledCover sx={{ padding: 2 }} alt="cover image" src={isReplay ? data?.data?.article?.cover_image : data?.data?.article?.media?.media_url} />
        </StyledCardMedia>
        <CardContent>

          <StyledTitle
            color="inherit"
            variant="subtitle2"
            underline="hover"
          >
            {data?.data?.article?.title}
          </StyledTitle>
          <div dangerouslySetInnerHTML={{ __html: data?.data?.article?.description }} />
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled' }}>
              Tag: {data?.data?.article?.tag?.name}
            </Typography>
          </Box>
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled' }}>
              Rubrique: {data?.data?.article?.rubrique?.rubrique_title}
            </Typography>
            <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled' }}>
              {fDate(data?.data?.article?.created_at)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box >
  )
}

export default BlogPostDetail