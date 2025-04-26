import { Routes, Route } from "react-router-dom";
import HomePage from "../HomePage";
import ThankYou from "./ThankYou";
import GhostRecord from "./GhostRecord";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/thankyou" element={<ThankYou />} />
      <Route path="/ghostrecord" element={<GhostRecord />} />
    </Routes>
  );
}