import React from "react";

function Creator() {
  return (
    <div className="flex flex-col md:flex-row justify-evenly text-center mt-32 gap-3 md:gap-12 font-medium">
      <h2 className="text-zinc-500">From the creator of</h2>

      <a
        href="https://wrapped.vantezzen.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        Wrapped for TikTok
      </a>
      <a
        href="https://purrsona.vantezzen.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        Purrsona
      </a>
      <a href="https://vantezzen.io" target="_blank" rel="noopener noreferrer">
        and more
      </a>
    </div>
  );
}

export default Creator;
