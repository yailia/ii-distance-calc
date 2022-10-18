import { useState, MouseEvent } from 'react'
import { Control } from 'react-hook-form';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { RhfAutocomplete } from 'src/shared/RhfAutocomplete';
import { TripData } from 'src/models/TripData';

interface IntermediateCity {
  control: Control<TripData, any>;
  count: number;
  handleClick: (e: MouseEvent<HTMLButtonElement>)=>void;
  name: string
}

export function IntermediateCity(props: IntermediateCity) {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={
      {
        display: "flex"
      }
    }>
      <RhfAutocomplete
        control={props.control}
        label={`IntermediateCity ${props.count}*`}
        name={props.name}
        open={open}
        setOpen={setOpen}
      />
      <Button onClick={props.handleClick}>Remove</Button>
    </Box>
  )
}
