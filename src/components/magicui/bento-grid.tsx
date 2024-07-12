import { ReactNode } from "react";

import { cn } from "@/lib/utils";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("grid w-full grid-cols-3 gap-4", className)}>
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  children,
  Icon,
  description,
  comment,
}: {
  name: string | number;
  className?: string;
  children?: ReactNode;
  Icon: any;
  description: string;
  comment?: string;
}) => (
  <div
    key={name}
    className={cn(
      "relative overflow-hidden rounded-xl",
      // light styles
      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className
    )}
  >
    <div className="z-10 flex flex-col gap-1 p-6 transition-all duration-300">
      <Icon className="h-12 w-12 origin-left text-neutral-700 transition-all duration-300 ease-in-out" />
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
        {name}
      </h3>
      <p className="max-w-lg text-neutral-700">{description}</p>
      {comment && (
        <p className="text-neutral-500 text-sm font-medium">{comment}</p>
      )}
    </div>
  </div>
);

export { BentoCard, BentoGrid };
