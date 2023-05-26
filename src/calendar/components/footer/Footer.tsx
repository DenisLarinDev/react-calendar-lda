import { FC } from "react";
import classes from "./footer.module.scss";
import * as classNames from "classnames";

interface FooterProps {
  isActive: boolean;
}
export const Footer: FC<FooterProps> = ({ isActive }) => {
  return (
    <div
      className={classNames(classes.footer, {
        [classes.footer_disabled]: !isActive,
      })}
    >
      Готово
    </div>
  );
};
