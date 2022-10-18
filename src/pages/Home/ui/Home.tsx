import { RequestForm } from "src/widgets/RequestForm/ui/RequestForm";

export interface Cities {
  city: string;
  lat: number;
  lon: number
}

export function Home() {
  return <RequestForm />;
}
