import Description from '@components/terms/Description';

export default function page() {
  return (
    <div className="h-[100dvh] py-[56px] overflow-y-scroll">
      <h1 className="header-22 py-[16px]">서비스 이용약관(ver1.240203)</h1>
      <Description type="SERVICE_TERMS" />
    </div>
  );
}
