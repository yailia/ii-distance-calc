import { Box, Button, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { appRoutes } from 'src/config/routes';
import { CityOfDestination, CityOfOrigin, IntermediateCity } from 'src/entities';
import { getSearchParams, RhfDatePicker, RhfNumber } from 'src/shared';
import { TripData } from 'src/models/TripData';
import { SubmitData } from 'src/models/SubmitData';

function dataToSearch(q: SubmitData): string {
  if (!q) {
    return "";
  }
  const {
    thr,
    ...data
  } = q;
  const params = new URLSearchParams(data);
  if(Array.isArray(thr)) {
    for (const item of thr) {
      params.append('thr', item);
    }
  }
  return params.toString();
}


export function RequestForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initParams = useMemo(() => {
    return getSearchParams(searchParams);
  }, [searchParams])
  const { control, handleSubmit, reset, watch, getValues, formState } = useForm<TripData>({
    mode: "onChange",
    defaultValues: {
      date: dayjs(initParams.date, "DD/MM/YYYY"),
      origin: initParams.from,
      destination: initParams.to,
      number: initParams.pax,
      intermediate: []
    }
  });

  // useEffect(() => {
  //   if(formState.isValid) {
  //   const q = {
  //     from: getValues().origin || "",
  //     to: getValues().destination || "",
  //     thr: getValues().intermediate || "",
  //     date: dayjs(getValues().date).format("DD/MM/YYYY") || "",
  //     pax: getValues().number.toString() || ""
  //   }
  //     setSearchParams(q)
  //   }
  // }, [watch()])

  const navigate = useNavigate();

  function handleAdd() {
    append("")
  }
  const { fields, append, remove } = useFieldArray({
    control,
    name: "intermediate" as never,
  });

  useEffect(() => {
    reset({
      intermediate: initParams.thr
    })
  }, [initParams])

  useEffect(() => {
  }, [control])


  function onSubmit(data: TripData) {
    const q = {
      from: data.origin,
      to: data.destination,
      thr: data.intermediate,
      date: dayjs(data.date).format("DD/MM/YYYY"),
      pax: data.number.toString()
    }
    navigate(appRoutes.result+"?"+dataToSearch(q))
  }

  return (
    
    <Paper 
      elevation={24}
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        p: 4,
        marginTop: "auto",
      }}
      >
        <Typography variant='h6'>
          Please, fill in form fields
        </Typography>

      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <CityOfOrigin
          control={control}
        />
        {
          fields.map((i, idx) => (
            <IntermediateCity
              key={i.id}
              control={control}
              count={idx + 1}
              handleClick={() => remove(idx)}
              name={`intermediate.${idx}` as const}
            />
          ))
        }
        <Button type="button" onClick={handleAdd}>Add intermediate</Button>
        <CityOfDestination
          control={control}
        />

        <RhfDatePicker
          control={control}
          label={"Date of the trip"}
        />

        <RhfNumber
          control={control}
          label="Number of passengers"
        />
        <Button type="submit" disabled={!formState.isValid}>Submit</Button>
      </form>
    </Paper>
  )
}
