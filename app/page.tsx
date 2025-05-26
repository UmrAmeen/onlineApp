import DashBoard from "./dashBoard";
import db from "./lib/sqlite/db";
import SideBar from "./sideBar";

export default function Home() {
  return (
    <div className="pageHeader">
      <div>
        <DashBoard />
      </div>
      <div className="appNameDiv">
        <div className="sidebar">
          <SideBar />
        </div>
        <p className="appNamePtag"> 𝓜𝓘𝓛𝓛𝓘𝓞𝓝𝓢 𝓞𝓕 𝓑𝓡𝓐𝓝𝓓𝓢 </p>
      </div>
    
    </div>
  );
}
