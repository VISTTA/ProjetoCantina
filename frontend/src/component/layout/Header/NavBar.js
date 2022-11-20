import {menuItems} from "../../../../src/menuItems"
import MenuItems from "./MenuItems.js";

const NavBar = () => {
    return (
        <nav>
            <ul className="menus">
                {
                    menuItems.map((menu, index) => {
                        const depthLevel = 0;
                        return <MenuItems items={menu} key={index} depthLevel={depthLevel} />
                    })
                }
            </ul>
        </nav>
    )
}
export default NavBar;