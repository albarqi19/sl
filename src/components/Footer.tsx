import { Code2 } from 'lucide-react';
import footerLogo from '../assets/210.png';

export function Footer({ isGray }: { isGray: boolean }) {
  return (
    <div className="text-center mt-4 mb-6">
      <img 
        src={footerLogo}
        alt="شعار جامع الشيخ سعيد رداد"
        className={`mx-auto h-9 ${isGray ? 'grayscale' : ''}`} 
      />
    </div>
  );
}
