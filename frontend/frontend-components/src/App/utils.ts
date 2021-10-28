export function renderUrlImage(image: string | null, backend: boolean = false) {
  if (backend) {
    return `${window.location.protocol}//${window.location.hostname}:8000${image}`;
  }
  return undefined;
}
