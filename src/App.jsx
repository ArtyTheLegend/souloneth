import React from "react";
import AppRouter from "./components/AppRouter";
import FloatingSigilMenu from "./components/FloatingSigilMenu";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <AppLayout>
      <AppRouter />
      <FloatingSigilMenu />
    </AppLayout>
  );
}

export default App;