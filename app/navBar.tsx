import Link from "next/link";

export default function NavBar() {
  return (
    <div className="dashboardDiv">
      <div className="myappDiv">
        <p> 𝓜𝓘𝓛𝓛𝓘𝓞𝓝𝓢 𝓞𝓕 𝓑𝓡𝓐𝓝𝓓𝓢  </p>
      </div>
      <div className="dashboardList">
        <Link href="/perfumeItems">
          <p>perfume</p>
        </Link>
        <Link href="/belts">
          <p>belt</p>
        </Link>

        <p>cloths</p>
      </div>
    </div>
  );
}
