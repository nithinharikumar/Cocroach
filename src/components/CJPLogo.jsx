export default function CJPLogo({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Hand-drawn Outer Rings */}
      <circle cx="100" cy="100" r="95" fill="#FAF6EE" stroke="#1E1E1E" strokeWidth="4" />
      <circle cx="100" cy="101" r="89" fill="none" stroke="#1E1E1E" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.7" />
      
      {/* Tricolor Border Rings (Muted Retro Shades) */}
      <circle cx="99" cy="99" r="84" fill="none" stroke="#E26D5C" strokeWidth="6" strokeLinecap="round" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="#FDFBF7" strokeWidth="4" />
      <circle cx="101" cy="101" r="74" fill="none" stroke="#4F772D" strokeWidth="6" strokeLinecap="round" />
      
      {/* Crowds silhouette background (Sketchy style) */}
      <path d="M 22 135 Q 35 120 45 138 T 65 133 T 85 138 L 85 170 L 22 170 Z" fill="#D3C2A9" stroke="#1E1E1E" strokeWidth="2.5" />
      <path d="M 178 135 Q 165 120 155 138 T 135 133 T 115 138 L 115 170 L 178 170 Z" fill="#D3C2A9" stroke="#1E1E1E" strokeWidth="2.5" />

      {/* Cockroach Character (Doodle Style) */}
      {/* Antennae */}
      <path d="M83 45 C73 10, 58 2, 35 12" fill="none" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" />
      <path d="M83 45 C73 10, 58 2, 35 12" fill="none" stroke="#A67B5B" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M117 45 C127 10, 142 2, 165 12" fill="none" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" />
      <path d="M117 45 C127 10, 142 2, 165 12" fill="none" stroke="#A67B5B" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Head */}
      <ellipse cx="100" cy="62" rx="21" ry="25" fill="#BD8057" stroke="#1E1E1E" strokeWidth="4" />
      
      {/* Glossy Black Sunglasses (Thick comic outline) */}
      <path d="M76 58 Q87 56 95 61 Q95 75 83 75 Q74 75 76 58 Z" fill="#1E1E1E" stroke="#1E1E1E" strokeWidth="2" />
      <path d="M82 62 L90 68" stroke="#FDFBF7" strokeWidth="2" strokeLinecap="round" />
      
      <path d="M124 58 Q113 56 105 61 Q105 75 117 75 Q126 75 124 58 Z" fill="#1E1E1E" stroke="#1E1E1E" strokeWidth="2" />
      <path d="M110 62 L118 68" stroke="#FDFBF7" strokeWidth="2" strokeLinecap="round" />
      
      <line x1="95" y1="61" x2="105" y2="61" stroke="#1E1E1E" strokeWidth="4.5" />
      
      {/* Mandibles */}
      <path d="M94 83 L97 89 L100 83" fill="none" stroke="#1E1E1E" strokeWidth="3" strokeLinecap="round" />
      <path d="M106 83 L103 89 L100 83" fill="none" stroke="#1E1E1E" strokeWidth="3" strokeLinecap="round" />

      {/* Suit/Torso */}
      <path d="M66 115 Q100 126 134 115 L126 90 C126 90, 100 82, 74 90 Z" fill="#3D405B" stroke="#1E1E1E" strokeWidth="4" strokeLinejoin="round" />
      
      {/* White shirt collar */}
      <polygon points="88,88 112,88 100,103" fill="#FDFBF7" stroke="#1E1E1E" strokeWidth="3" strokeLinejoin="round" />
      
      {/* Saffron Tie */}
      <polygon points="96,101 104,101 100,120" fill="#E26D5C" stroke="#1E1E1E" strokeWidth="3" strokeLinejoin="round" />

      {/* Folded Arms (Thick black outline, filled with cockroach brown) */}
      <path d="M70 100 C60 110, 78 126, 100 122 C122 126, 140 110, 130 100" fill="none" stroke="#1E1E1E" strokeWidth="7" strokeLinecap="round" />
      <path d="M70 100 C60 110, 78 126, 100 122 C122 126, 140 110, 130 100" fill="none" stroke="#BD8057" strokeWidth="3" strokeLinecap="round" />

      {/* Podium Front Board */}
      <polygon points="63,124 137,124 131,155 69,155" fill="#FAF6EE" stroke="#1E1E1E" strokeWidth="4" strokeLinejoin="round" />
      
      {/* Emblem on Podium (Retro tricolor target) */}
      <circle cx="100" cy="140" r="10" fill="#1E1E1E" />
      <circle cx="100" cy="140" r="8" fill="#E26D5C" />
      <circle cx="100" cy="140" r="5" fill="#FDFBF7" />
      <circle cx="100" cy="140" r="2.5" fill="#4F772D" />

      {/* Stand Column */}
      <rect x="93" y="155" width="14" height="23" fill="#3D405B" stroke="#1E1E1E" strokeWidth="4" />
      
      {/* Base */}
      <rect x="58" y="178" width="84" height="9" rx="3" fill="#1E1E1E" />
    </svg>
  )
}
