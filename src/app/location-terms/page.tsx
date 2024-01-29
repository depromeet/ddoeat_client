import Description from '@components/terms/Description';

export default function page() {
  return (
    <div className="h-[100dvh] py-[56px] overflow-y-scroll">
      <h1 className="header-22 py-[16px]">
        위치기반서비스 이용약관(ver1. 240203)
      </h1>
      <Description type="LOCATION_TERMS" />
    </div>
  );
}
