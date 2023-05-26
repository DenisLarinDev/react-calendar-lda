import { FC } from "react";
import { Calendar } from "./calendar/Calendar.tsx";

export const App: FC = () => {
  return (
    <div
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Calendar />
    </div>
  );
};
