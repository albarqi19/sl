import { Code2 } from 'lucide-react';

export function Footer({ isGray }: { isGray: boolean }) {
  return (
    <div className="text-center mt-8">
      <img 
        src={isGray ? 'https://h.top4top.io/p_3267o2pkr1.png' : 'https://h.top4top.io/p_3267o2pkr1.png'} 
        alt="شعار جامع الشيخ سعيد رداد"
        className={`mx-auto h-9 ${isGray ? 'grayscale' : ''}`} 
      />
    </div>
  );
}
