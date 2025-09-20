import { ROUTES } from "@/app/routing";
import { IconButton } from "@/shared/ui";
import { Link } from "react-router-dom";
import { tv } from "tailwind-variants";
import { cn } from "tailwind-variants/lite";

const navigationStyles = tv({
  slots: {
    nav: "flex justify-center items-center w-full bg-primary",
    navList: "flex flex-row w-full justify-evenly",
    navListItem:
      "flex flex-col justify-center items-center text-xs lg:text-base font-normal text-primary-foreground",
  },
});

export default function Navigation({ className }: { className: string }) {
  const { nav, navList, navListItem } = navigationStyles();
  return (
    <nav className={cn(nav(), className)}>
      <ul className={navList()}>
        {ROUTES.map(({ route, name, Icon }) => (
          <li key={route}>
            <IconButton asChild>
              <Link to={route} className={navListItem()}>
                <Icon />
                {name}
              </Link>
            </IconButton>
          </li>
        ))}
      </ul>
    </nav>
  );
}
