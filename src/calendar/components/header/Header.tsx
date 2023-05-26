import { FC } from "react";
import { getMonth } from "../../utils/getMonth.ts";
import classes from "./header.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import {
  scrollVariants,
  scrollVariantsTransition,
} from "../horizontalScroll/HorizontalScroll.tsx";

interface HeaderProps {
  pageDate: Date;
  scrollDirection: number;
}
export const Header: FC<HeaderProps> = ({ pageDate, scrollDirection }) => {
  return (
    <AnimatePresence
      custom={scrollDirection}
      initial={false}
      mode={"popLayout"}
    >
      <motion.div
        variants={scrollVariants}
        custom={scrollDirection}
        key={pageDate.getMonth()}
        initial={"enter"}
        animate={"center"}
        exit={"exit"}
        transition={scrollVariantsTransition}
        className={classes.header}
      >
        <span className={classes.content}>
          {getMonth(pageDate.getMonth()).name}{" "}
          <span className={classes.year}>{pageDate.getFullYear()}</span>
        </span>
      </motion.div>
    </AnimatePresence>
  );
};
