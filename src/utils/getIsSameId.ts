interface GetIsSameIdParams {
  centerId: number | undefined;
  centerkakaoStoreId: number | undefined;
  pinId: number | undefined;
  pinkakaoStoreId: number | undefined;
}

const getIsSameId = ({
  centerId,
  centerkakaoStoreId,
  pinId,
  pinkakaoStoreId,
}: GetIsSameIdParams) => {
  return (
    (centerId !== undefined && pinId !== undefined && centerId === pinId) ||
    (centerkakaoStoreId !== undefined &&
      pinkakaoStoreId !== undefined &&
      centerkakaoStoreId === pinkakaoStoreId)
  );
};

export default getIsSameId;
