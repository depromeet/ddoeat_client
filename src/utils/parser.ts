// NOTE: m를 km로 변환
export const convertMeterToKm = (distance: number): string => {
  let distanceToKm = distance / 1000;
  distanceToKm = Math.round(distanceToKm * 10) / 10;
  return `${distanceToKm}km`;
};

// NOTE: 객체를 Query String으로 변환
export const convertObjectToQueryString = (
  object: Record<string, string>,
): string => {
  const queryString = Object.keys(object)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`,
    )
    .join('&');
  return queryString;
};

// type=search (필수)
// storeId= (필수)
// kakaoStoreId=215601716 (필수)
// storeName=37.5+%EC%9E%A0%EC%8B%A4%EC%A0%90 (필수)
// kakaoCategoryName=%EC%B9%B4%ED%8E%98 (필수)
// categoryType= (필수)
// address=%EC%84%9C%EC%9A%B8+%EC%86%A1%ED%8C%8C%EA%B5%AC+%EC%98%A4%EA%B8%88%EB%8F%99+615 (필수)
// distance=45 (x)
// totalRevisitedCount=0 (x)
// longitude=127.127519793682 (필수)
// latitude=37.5099528382681 (필수)
// bottomSheetStatus=show
