import * as React from 'react';
import Stack from '@mui/material/Stack';

export default function DirectionStack(props) {
  return (
    <div>
      <Stack direction="row" spacing={2}>
        {props.children}
      </Stack>
    </div>
  );
}