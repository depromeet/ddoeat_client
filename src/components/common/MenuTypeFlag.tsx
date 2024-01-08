interface MenuTypeFlagProps {
  menuType: string;
}

export default function MenuTypeFlag({ menuType }: MenuTypeFlagProps) {
  return (
    <div className="flex justify-center rounded-full px-[8px] py-[4px] bg-gray-50 text-gray-500 caption-10-bold">
      <span>{menuType}</span>
    </div>
  );
}
