import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Box } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { TripData } from 'src/models/TripData';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'


dayjs.extend(isSameOrBefore)

interface RhfDatePickerProps {
  control: Control<TripData, any>
  label: string;
}

export function RhfDatePicker(props: RhfDatePickerProps) {
  return (
    <Box sx={{
      p: 1,
    }}>

    <Controller
        control={props.control}
        name="date"
        rules={
          {
            required: "Please pick the date",
            validate: date => dayjs().isSameOrBefore(date, "day") || "Date must be today or in the future"
            
          }
        }
        render={({ field: {onChange, ...restFields}, fieldState }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={props.label}
              onChange={onChange}
              renderInput={(params) => <TextField {...params} error={!!fieldState.error} helperText={fieldState.error?.message}/>}
              {...restFields}
            />
          </LocalizationProvider>
        )}
      />
    </Box>
  );
}