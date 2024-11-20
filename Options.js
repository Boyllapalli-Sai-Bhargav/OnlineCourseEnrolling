import { Link } from '@mui/material'
import React from 'react';




function Options () {
  return (
    <div>
      <br></br>
        <h2>Courses to get you started</h2>
        <p>Explore courses from experienced, real-world experts.</p><br></br>
        <p className='three'>
            <Link class="space">Most Popular</Link>
            <Link class="space">New</Link>
            <Link class="space">Trending</Link>
        </p>
    </div>
  )
}

export default Options;
