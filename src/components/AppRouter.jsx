import { Routes, Route } from "react-router-dom";
import HomePage from "../HomePage";
import ThankYou from "./ThankYou";
import DropDepth from "./DropDepth";
import BlessingHall from "./BlessingHall";
import EchoBlessing from "./EchoBlessing";
import SigilDrop from "./SigilDrop";
import AccoladeEcho from "./AccoladeEcho";
import RitualDrop from "./RitualDrop";
import SoulAccolade from "./SoulAccolade";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/thankyou" element={<ThankYou />} />
      <Route path="/dropdepth" element={<DropDepth />} />
      <Route path="/blessinghall" element={<BlessingHall />} />
      <Route path="/echoblessing" element={<EchoBlessing />} />
      <Route path="/sigildrop" element={<SigilDrop />} />
      <Route path="/accoladeecho" element={<AccoladeEcho />} />
      <Route path="/ritualdrop" element={<RitualDrop />} />
      <Route path="/soulaccolade" element={<SoulAccolade />} />
    </Routes>
  );
}