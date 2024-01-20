interface GetIsSameIdParams {
  centerId: string | undefined;
  centerKakaoId: string | undefined;
  pinId: string | undefined;
  pinKakaoId: string | undefined;
}

const getIsSameId = ({
  centerId,
  centerKakaoId,
  pinId,
  pinKakaoId,
}: GetIsSameIdParams) => {
  return (
    (centerId !== undefined && pinId !== undefined && centerId === pinId) ||
    (centerKakaoId !== undefined &&
      pinKakaoId !== undefined &&
      centerKakaoId === pinKakaoId)
  );
};

export default getIsSameId;
