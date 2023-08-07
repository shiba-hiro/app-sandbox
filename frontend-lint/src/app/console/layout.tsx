import React from "react";


const ConsoleLayout:React.FC<{children: React.ReactNode}> = (
  {children}
) => {
  return (
    <div>this is console layout
      {children}
    </div>
  )
};

export default ConsoleLayout