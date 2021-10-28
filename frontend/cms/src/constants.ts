export const url = `${window.location.protocol}//${window.location.hostname}:8000/api`;
export const PERMISSIONS: any = {
  logs: {
    deliveries: "distribution.view_historicaldelivery",
    subjects: "registry.view_historicalsubject",
    cachets: "distribution.view_historicalcachet",
  },
};
