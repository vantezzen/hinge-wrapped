import React from "react";
import sections, { WrappedSectionProps } from "./sections";
import Hero from "./sections/Hero";

function WrappedComponent(props: WrappedSectionProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {sections.map((Section, index) => (
        <Section key={index} {...props} />
      ))}
    </div>
  );
}

export default WrappedComponent;