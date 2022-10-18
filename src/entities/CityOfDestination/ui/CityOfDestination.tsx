import { useState } from 'react'
import { Control } from 'react-hook-form';
import { RhfAutocomplete } from 'src/shared/RhfAutocomplete';
import { TripData } from 'src/models/TripData';

interface CityOfDestination {
  control: Control<TripData, any>;
}

export function CityOfDestination(props: CityOfDestination) {
  const [open, setOpen] = useState(false);

  return (
    <RhfAutocomplete
      control={props.control}
      label="City of destination *"
      name="destination"
      open={open}
      setOpen={setOpen}
    />
  )
}
