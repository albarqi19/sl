export function AppTitle({ isGray }: { isGray: boolean }) {
  return (
    <div className="text-center mt-8">
      <h1 className={`text-4xl font-bold mb-2 ${isGray ? 'text-gray-900' : 'text-amber-900'}`}>
        نـافــس
      </h1>
      <p className={isGray ? 'text-gray-700' : 'text-amber-700'}>
        تحفيز ومتابعة نقاط الطلاب
      </p>
    </div>
  );
}
