import { useEffect, useState } from "react";
import { sleep } from "../helpers/sleep";
import { cities } from "./data/cities";

type TCitiesResponse = [string, number, number][]

export function getCities(value?: string) {
    return  sleep(1500, cities, value);
  }