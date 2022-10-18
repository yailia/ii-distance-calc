import { useState } from 'react'
import { Control } from 'react-hook-form';
import { RhfAutocomplete } from 'src/shared/RhfAutocomplete';
import { TripData } from 'src/models/TripData';

interface CityOfOriginProps {
  control: Control<TripData, any>;
  initValue?: string;
}

export function CityOfOrigin(props: CityOfOriginProps) {
  const [open, setOpen] = useState(false);

  return (
    <RhfAutocomplete
      control={props.control}
      label="City of origin *"
      name="origin"
      open={open}
      setOpen={setOpen}
    />
  )
}
