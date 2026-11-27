// 모두의 광고 마스코트(임시 버전). 아바타 꾸미기 단계에서 정식 버전으로 교체합니다.
interface MascotProps {
  size?: number;
}

export default function Mascot({ size = 96 }: MascotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="모두의 광고 마스코트"
    >
      <ellipse cx="50" cy="94" rx="24" ry="4" fill="#1f6feb" opacity="0.12" />
      <path d="M30 96c0-13 9-20 20-20s20 7 20 20Z" fill="#ffffff" stroke="#3b2a22" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="50" cy="52" r="30" fill="#fde0c8" stroke="#3b2a22" strokeWidth="2.5" />
      <path
        d="M19 52C15 24 36 12 54 14c18 2 31 18 27 38-6-4-11-10-13-17-9 8-24 13-49 17Z"
        fill="#6b4630"
        stroke="#3b2a22"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="39" cy="57" r="3" fill="#3b2a22" />
      <circle cx="61" cy="57" r="3" fill="#3b2a22" />
      <circle cx="32" cy="65" r="5" fill="#ffb4b4" opacity="0.7" />
      <circle cx="68" cy="65" r="5" fill="#ffb4b4" opacity="0.7" />
      <path d="M44 66c2 5 10 5 12 0Z" fill="#ff8a8a" stroke="#3b2a22" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
