import { useState } from "react";
import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { cities } from "src/shared/api/data/cities";
import { sleep } from "src/shared/helpers/sleep";
import { TripData } from 'src/models/TripData';

export enum Options {
  CITY = "city"
}

interface RhfAutocompleteProps {
  control: Control<TripData, any>
  name: any;
  label: string;
  open: boolean;
  setOpen: (b: boolean) => void;
}

export function RhfAutocomplete(props: RhfAutocompleteProps) {
  const [curValue, setValue] = useState<string>('');
  const mock = cities;
  const mockObj = mock.map(i => (i[0]));

    const {data, error, loading} = sleep(1500, mockObj, curValue);

  return (
    <Box sx={{
      p: 1,
    }}>
      <Controller
          name={props.name}
          control={props.control}
          rules={{
            required: "Please choose the City",
          }}
          render={({ field: { onChange, value}, fieldState }) => (
            <Autocomplete
              onChange={(_, values) => {
                onChange(values)
              }}
              onOpen={() =>props.setOpen(true)}
              onClose={() =>props.setOpen(false)}
              noOptionsText={<div>{error ? "Service Error" : "No options"}</div>}
              loading={loading}
              id={props.name}
              sx={{ width: 300 }}
              open={props.open}
              options={data || []}
              defaultValue={value}
              inputValue={curValue || ""}
              onInputChange={(_, newInputValue) => setValue(newInputValue)}
              isOptionEqualToValue={(option, value) => option === value}
              renderInput={(params) => (
                <TextField
                {...params}
                onChange={(val) => {
                  onChange(
                    props.setOpen(true),
                    setValue(val.target.value.trim().toLowerCase()),
                  )
                  }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  label={props.label}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          )}
        />
    </Box>
  )
}
