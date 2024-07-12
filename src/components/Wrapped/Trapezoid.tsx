import { useEffect, useState } from "react";

const Trapezoid = ({
  topRef,
  bottomRef,
  containerRef,
  color,
}: {
  topRef: React.RefObject<HTMLDivElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  color: string;
}) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const updateTrapezoid = () => {
      if (topRef.current && bottomRef.current && containerRef.current) {
        const topRect = topRef.current.getBoundingClientRect();
        const bottomRect = bottomRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        const topOffsetY = topRect.bottom - containerRect.top;
        const bottomOffsetY = bottomRect.top - containerRect.top;

        const topWidth = (topRect.width / containerRect.width) * 100;
        const bottomWidth = (bottomRect.width / containerRect.width) * 100;

        setStyle({
          top: `${topOffsetY}px`,
          height: `${bottomOffsetY - topOffsetY}px`,
          clipPath: `polygon(
            ${(100 - topWidth) / 2}% 0%, 
            ${100 - (100 - topWidth) / 2}% 0%, 
            ${100 - (100 - bottomWidth) / 2}% 100%, 
            ${(100 - bottomWidth) / 2}% 100%
          )`,
          backgroundColor: `${color}33`, // 33 is for 20% opacity, adjust as needed
        });
      }
    };

    updateTrapezoid();
    window.addEventListener("resize", updateTrapezoid);
    return () => window.removeEventListener("resize", updateTrapezoid);
  }, [topRef, bottomRef, containerRef, color]);

  return <div className="absolute left-0 right-0 z-10" style={style} />;
};
export default Trapezoid;
