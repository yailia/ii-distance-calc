import { Dayjs } from "dayjs";

export interface TripData {
  origin: string;
  destination: string;
  intermediate: string[];
  date: Dayjs | null;
  number: number;
}