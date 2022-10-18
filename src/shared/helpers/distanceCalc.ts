function toRad(degrees: number): number {
  return Math.PI / 180 * degrees;
}

export function distanceCalc(lat1: number, long1: number, lat2: number, long2: number) {
  const a = 0.5 - Math.cos(toRad(lat2 - lat1)) / 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    (1 - Math.cos(toRad(long2 - long1))) / 2;

  return 12742 * Math.asin(Math.sqrt(a));
}
