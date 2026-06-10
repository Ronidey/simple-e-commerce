import Sidebar from "./Sidebar";
import clsx from "../../lib/clsx";
import { ACTIONS, useAppContext } from "../../store/AppContext";
import Products from "./Products";
import { useEffect, useRef } from "react";

export default function Home() {
  const { appState, appDispatch } = useAppContext();
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.scroll(0, 0);
  }, [appState.products.data]);

  useEffect(() => {
    // Automatically closing sidebar for the smaller screens
    let timer: number;

    const handleOnResize = () => {
      if (timer) window.clearTimeout(timer);

      timer = window.setTimeout(() => {
        if (window.innerWidth <= 650)
          appDispatch({ type: ACTIONS.TOGGLE_SIDEBAR, payload: false });
      }, 100);
    };

    handleOnResize();
    window.addEventListener("resize", handleOnResize);

    return () => window.removeEventListener("resize", handleOnResize);
  }, []);

  return (
    <div className="h-full w-full flex">
      <div
        className={clsx(
          "bg-gray-100 transition-all duration-300 overflow-hidden",
          !appState.isSidebarOpen ? "w-0" : "w-xs",
        )}
      >
        <div className="h-full overflow-y-auto w-xs">
          <Sidebar />
        </div>
      </div>

      <div className="flex-1 overflow-auto" ref={ref}>
        <Products />
      </div>
    </div>
  );
}
