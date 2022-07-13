import React from 'react'
import { Box, Typography} from '@mui/material'

function FooterBar() {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
    <Typography color="text.secondary" variant="h6" align="center" gutterBottom>
    Books Sharing 
    </Typography>
    <Typography
      variant="subtitle1"
      align="center"
      color="text.secondary"
      component="p"
    >
      The Book Sharing applicatin, 2022
    </Typography>

  </Box>


  )
}

export default FooterBar