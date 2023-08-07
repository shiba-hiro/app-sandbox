import React from "react";


const InitializerLayout:React.FC<{children: React.ReactNode}> = (
  {children}
) => {
  return (
    <div>this is initializer layout
      {children}
    </div>
  )
};

export default InitializerLayout