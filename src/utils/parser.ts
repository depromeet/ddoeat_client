// NOTE: m를 km로 변환
export const convertMeterToKm = (distance: number): string => {
  let distanceToKm = distance / 1000;
  distanceToKm = Math.round(distanceToKm * 10) / 10;
  return `${distanceToKm}km`;
};

// NOTE: 객체를 Query String으로 변환
export const convertObjectToQueryString = (
  /* eslint-disable @typescript-eslint/no-explicit-any */
  object: Record<string, any>,
): string => {
  const queryString = Object.keys(object)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`,
    )
    .join('&');
  return queryString;
};
