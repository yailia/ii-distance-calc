import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { Grid, Typography, List, ListItem, ListItemText, Paper } from "@mui/material";
import { getSearchParams } from "src/shared";
import { cities as data } from "src/shared/api/data/cities";
import { SubmitData } from 'src/models/SubmitData';
import { distanceCalc } from 'src/shared/helpers/distanceCalc';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

function fakeFetch<T>(data: SubmitData): Promise<SubmitData> {
  return new Promise((res, rej) => {
    if (data.from === "Dijon" || data.to === "Dijon" || data.thr?.indexOf("Dijon") > -1) {
      setTimeout(() => rej("Fetch Error"), 1500)
    } else {
      setTimeout(() => res(data), 1500)
    }
  })
}

const cities = data.map(i => ({
  city: i[0],
  lat: Number(i[1]),
  lon: Number(i[2])
}))

export function Result() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SubmitData | null>(null);
  const [err, setErr] = useState("");

  const params = useMemo(() => getSearchParams(searchParams), [searchParams]);

  useEffect(() => {
    setLoading(true)
    const res = fakeFetch(params as SubmitData);
    res
      .then(r => setData(r))
      .catch(e => setErr(e))
      .finally(() => setLoading(false))
  }, [params]);

  const { summaryDist, intermediateDist } = useMemo(() => {
    if (!data) {
      return { summaryDist: 0, intermediateDist: 0 }
    }
    const [from] = cities.filter(i => i.city === data?.from).flat();
    const [to] = cities.filter(i => i.city === data?.to).flat();
    let summaryDist;
    let interDist = 0;

    if (data.thr && Array.isArray(data.thr)) {
      const intermCities = data.thr.map(i => (
        cities.filter(c => i === c.city)
      )).flat();

      summaryDist = distanceCalc(from.lat, from.lon, intermCities[0].lat, intermCities[0].lon);

      for (let i = 0; i < intermCities.length; i++) {
        if (i === intermCities.length - 1) {
          summaryDist = summaryDist + distanceCalc(intermCities[i].lat, intermCities[i].lon, to.lat, to.lon)
          interDist = interDist
          break
        }
        const cur = intermCities[i];
        const next = intermCities[i + 1];
        summaryDist = summaryDist + distanceCalc(cur.lat, cur.lon, next.lat, next.lon);
        interDist = interDist + distanceCalc(cur.lat, cur.lon, next.lat, next.lon);
      }
    } else {
      summaryDist = (distanceCalc(from?.lat, from?.lon, to?.lat, to?.lon)).toFixed(2)
    }


    return {
      summaryDist: Number(summaryDist).toFixed(2),
      intermediateDist: Number(interDist).toFixed(2)
    }
  }, [data, cities])

  return (
    <Paper
      elevation={24}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 4,
        marginTop: "40px",
        minWidth: "380px"
      }}
    >
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Result
        </Typography>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>{params.from}</TimelineContent>
          </TimelineItem>
          {
            params.thr && (
              params.thr.map((i: string, idx: number) => (
                <TimelineItem key={idx}>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>{i}</TimelineContent>
                </TimelineItem>
              ))
            )
          }
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent>{params.to}</TimelineContent>
          </TimelineItem>
        </Timeline>
        <List dense>
          <ListItem>
            <ListItemText
              primary="Number of passengers"
              secondary={params.pax}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Date of trip"
              secondary={params.date}
            />
          </ListItem>
          {
            params.thr && params.thr.length > 1 && (
              <ListItem>
                <ListItemText
                  primary="Distance of Intermrdiate Cities"
                  secondary={intermediateDist}
                />
              </ListItem>

            )
          }
          <ListItem>
            <ListItemText
              primary="All distance"
              secondary={loading ? "Loading..." : err ? "Fetch error, please try again" : summaryDist}
            />
          </ListItem>
        </List>
      </Grid>
    </Paper>
  )
}
