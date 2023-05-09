import { createContext } from "react";
import { useState } from "react";

export const context = createContext();

const Provider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  console.log(admin);
  return (
    <context.Provider value={{ setAdmin, admin }}>
      {children}
    </context.Provider>
  )
}

export default Provider;