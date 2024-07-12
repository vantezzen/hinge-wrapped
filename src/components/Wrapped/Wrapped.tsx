import React from "react";
import sections, { WrappedSectionProps } from "./sections";
import Footer from "../Footer";

function WrappedComponent(props: WrappedSectionProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {sections.map((Section, index) => (
        <Section key={index} {...props} />
      ))}

      <Footer />
    </div>
  );
}

export default WrappedComponent;
