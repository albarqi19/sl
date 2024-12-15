interface RulesProps {
  isGray: boolean;
}

export function Rules({ isGray }: RulesProps) {
  const rules = [
    {
      name: 'التسميع والمراجعة المنتظمة',
      points: 15
    },
    {
      name: 'الانضباط والحضور المبكر',
      points: 5
    },
    {
      name: 'احترام المعلم والمحافظة على النظام',
      points: 5
    }
  ];

  return (
    <div className={`mt-8 rounded-lg overflow-hidden shadow-lg ${
      isGray ? 'bg-white' : 'bg-amber-50'
    }`}>
      <table className="w-full">
        <thead>
          <tr className={isGray ? 'bg-gray-100' : 'bg-amber-100'}>
            <th className="px-6 py-3 text-right text-lg font-semibold">البند</th>
            <th className="px-6 py-3 text-center text-lg font-semibold">النقاط</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule, index) => (
            <tr key={index} className={`${
              isGray 
                ? index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                : index % 2 === 0 ? 'bg-amber-50/50' : 'bg-amber-50'
            }`}>
              <td className="px-6 py-4 text-right">{rule.name}</td>
              <td className="px-6 py-4 text-center">{rule.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
