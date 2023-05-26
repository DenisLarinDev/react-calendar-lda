import { FC } from "react";
import { DaysOfWeek } from "../../configs/daysOfWeek.ts";
import classes from "./weekDays.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import {
  scrollVariants,
  scrollVariantsTransition,
} from "../horizontalScroll/HorizontalScroll.tsx";

export const WeekDays: FC<{ scrollDirection: number; pageDate: Date }> = ({
  scrollDirection,
  pageDate,
}) => {
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
        transition={scrollVariantsTransition}
        exit={"exit"}
        className={classes.items}
      >
        {DaysOfWeek.map((item) => {
          return (
            <div className={classes.item} key={item}>
              {item.toUpperCase()}
            </div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};
