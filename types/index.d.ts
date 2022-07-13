export interface IpApiResponse {
  as: string;
  city: string;
  country: string;
  countryCode: string;
  isp: string;
  lat: number;
  lon: number;
  org: string;
  query: string;
  region: string;
  regionName: string;
  status: string;
  timezone: string;
  zip: string;
}

export interface VercelApiResponse {
  ip: string;
  city: string;
  lat: number;
  lon: number;
}
