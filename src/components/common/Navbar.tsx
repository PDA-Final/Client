import { NavLink, useLocation } from "react-router-dom";
import HomeIcon from "../../assets/home.svg";
import PostIcon from "../../assets/post.svg";
import StarIcon from "../../assets/star.svg";
import ProductIcon from "../../assets/box.svg";
import ProfileIcon from "../../assets/profile.svg";
import useAuth2Store from "../../store/useAuth2Store";
import useCategoryFilterStore from "../../store/useCategoryFilterStore";
import { useEffect } from "react";

const Navbar = () => {
  const linkClasses =
    "flex flex-col items-center space-y-1 px-2 rounded md:p-0 transition-colors duration-200";
  const defaultClasses = "text-gray-900 ";
  const hoverClasses = "hover:text-[#748BFF] ";
  const activeClasses = "text-[#748BFF]"; // Active class for text color

  const location = useLocation();
  const Id = useAuth2Store((state) => state.id);

  const navItems = [
    { name: "홈", href: "/", Icon: HomeIcon, exact: true },
    { name: "핀", href: "/board", Icon: PostIcon, exact: false },
    { name: "챌린지", href: "/challenge", Icon: StarIcon, exact: false },
    { name: "상품", href: "/product", Icon: ProductIcon, exact: false },
    {
      name: "프로필",
      href: `/userProfile?id=${Id}`,
      Icon: ProfileIcon,
      exact: false,
    },
  ];

  const clearCategoryAndFilters = useCategoryFilterStore(
    (state) => state.clearCategoryAndFilters
  );

  function scrollToTop() {
    window.scrollTo(0, 0);
  }
  const navBtnClick = () => {
    clearCategoryAndFilters();

    scrollToTop();
  };

  const isActive = (path: string) => {
    const pathname = location.pathname.split('?')[0];
    const itemPath = path.split('?')[0];
    return pathname === itemPath;
  }

  return (
    <nav className="fixed w-full z-20 bottom-0 left-0 bg-white border-t border-gray-200 h-[7.5vh]">
      <div className="mx-auto flex items-center justify-center">
        <div className="w-full md:w-auto">
          <ul className="flex justify-center space-x-8 p-2 md:p-0 font-medium border-t md:border-t-0 bg-gray-50">
            {navItems.map((item) => (
              <li key={item.name}>
                <div onClick={navBtnClick}>
                  <NavLink
                    to={item.href}
                    className={() =>
                      `${linkClasses} ${defaultClasses} ${hoverClasses} ${
                        isActive(item.href) ? activeClasses : ""
                      }`
                    }
                    aria-current={
                      isActive(item.href) ? "page" : undefined
                    }
                  >
                    <img
                      src={item.Icon}
                      alt={item.name}
                      className="h-7 w-7 filter transition-all duration-300 group-hover:filter-none group-hover:fill-current group-focus:fill-current"
                      style={{
                        filter:
                          isActive(item.href)
                            ? "invert(64%) sepia(69%) saturate(4107%) hue-rotate(206deg) brightness(100%) contrast(102%)"
                            : "none",
                        fill:
                          isActive(item.href)
                            ? "invert(64%) sepia(69%) saturate(4107%) hue-rotate(206deg) brightness(100%) contrast(102%)"
                            : "currentColor",
                      }}
                    />
                    <p
                      className={`text-xs ${
                        isActive(item.href) ? activeClasses : ""
                      }`}
                    >
                      {item.name}
                    </p>
                  </NavLink>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
