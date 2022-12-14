import { Box, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { TripData } from 'src/models/TripData';

interface RhfNumberProps {
  control: Control<TripData, any>
  label: string;
}

export function RhfNumber(props: RhfNumberProps) {
  return (
    <Box sx={{
      p: 1
    }}>
      <Controller
        control={props.control}
        name="number"
        defaultValue={0}
        rules={{
          required: "Please set passangers count",
          min: {
            value: 0,
            message: "Must be more than 0"
          }

        }}
        render={({ field, fieldState }) => (
          <TextField
          label={props.label}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          {...field}
          />
        )}
      />
    </Box>
  )
}
