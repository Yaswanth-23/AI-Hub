import { useRef } from "react";

export default function TiltCard({ children }) {
  const ref = useRef();

  const handleMouseMove = (e) => {
    const card = ref.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y / rect.height - 0.5) * 20;
    const rotateY = (x / rect.width - 0.5) * 20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const reset = () => {
    ref.current.style.transform = "rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="bg-gray-900 p-6 rounded-xl transition-transform duration-200"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}