// NOTE: m를 km로 변환
export const convertMeterToKm = (distance: number): string => {
  let distanceToKm = distance / 1000;
  distanceToKm = Math.round(distanceToKm * 10) / 10;
  return `${distanceToKm}km`;
};
