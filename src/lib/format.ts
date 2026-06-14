export function formatApproximateCount(value: number) {
  if (value >= 10000) {
    return `${`${Math.floor(value / 10000) * 10000}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}+`;
  }

  if (value >= 1000) {
    return `${`${Math.floor(value / 1000) * 1000}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}+`;
  }

  return value.toLocaleString();
}

