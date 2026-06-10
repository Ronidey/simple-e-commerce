import { useLocation } from "react-router";
import { useAppContext } from "../../../store/AppContext";
import { Cart, Menu, Search } from "../../icons";
import User from "../../icons/User";
import Container from "../Container";

export default function Header() {
  const { appDispatch } = useAppContext();
  const location = useLocation();

  const toggleSidebar = () => {
    appDispatch({ type: "TOGGLE_SIDEBAR" });
  };

  return (
    <header className="h-full bg-header text-white py-2 flex items-center">
      <Container className="flex-1">
        <div className="flex items-center">
          {!location.pathname.includes("/products") && (
            <button className="text-lg outline-0" onClick={toggleSidebar}>
              <Menu />
            </button>
          )}

          {/* Searchbar */}
          <div className="w-1/2 mx-auto">
            <div className="flex items-center bg-white px-4 rounded-md">
              <Search className="shrink-0 text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 px-2 py-1.5 text-gray-500 outline-0"
              />
            </div>
          </div>

          {/* NavLinks */}
          <div className="flex items-center gap-4">
            <button>
              <Cart />
            </button>
            <button>
              <User />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
