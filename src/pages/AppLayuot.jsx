import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import style from "./AppLayout.module.css";
export default function AppLayuot() {
  return (
    <div className={style.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
