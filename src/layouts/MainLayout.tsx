import { Outlet } from "react-router";
import Header from "../components/layout/Header";
import styles from "./styles.module.css";

export default function MainLayout() {
  return (
    <div className={styles.mainLayout}>
      <div>
        <Header />
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
