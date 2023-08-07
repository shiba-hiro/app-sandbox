import React from "react";

import { ClientMessage } from "@/components/ui/ClientMessage/ClientMessage";
import { ServerMessage } from "@/components/ui/ServerMessage/ServerMessage";


const InitializerTop:React.FC = () => {
  return (
    <div>
      <p>Initializer Top</p>
      <ServerMessage />
      <ClientMessage />
    </div>
  )
};

export default InitializerTop