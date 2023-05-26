import { FC, useCallback, useState } from "react";
import { DayItem } from "./dayItem/DayItem.tsx";
import classes from "./days.module.scss";
import { isDatesEqual } from "../../utils/isDatesEqual.ts";
import { getDays } from "../../utils/getDays.ts";
import { getIsDateBetweenInterval } from "../../helpers/isDateBetweenInterval.ts";
import { getIsDateActive } from "../../helpers/getIsDateActive.ts";
import { getActiveDateConfig } from "../../helpers/getActiveDateConfig.ts";
import { isDateMoreThenAnotherDate } from "../../utils/isDateMoreThenAnotherDate.ts";
import { AnimatePresence, motion } from "framer-motion";
import {
  scrollVariants,
  scrollVariantsTransition,
} from "../horizontalScroll/HorizontalScroll.tsx";

interface DaysProps {
  pageDate: Date;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setPeriod: (date1: Date | null, date2: Date | null) => void;
  scrollDirection: number;
}

export const Days: FC<DaysProps> = ({
  pageDate,
  endDate,
  setStartDate,
  startDate,
  setPeriod,
  scrollDirection,
}) => {
  const days = getDays(pageDate);
  const [preselectedDate, setPreselectedDate] = useState<Date | null>(null);
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);

  const setFocusedDateHandler = useCallback((date: Date) => {
    setFocusedDate(date);
  }, []);
  const removeFocusedDateHandler = useCallback(() => {
    setFocusedDate(null);
  }, []);
  const onClickDateHandler = useCallback(
    (date: Date) => {
      if (preselectedDate) {
        if (isDatesEqual(preselectedDate, date)) {
          setStartDate(date);
        } else {
          if (isDateMoreThenAnotherDate(preselectedDate, date)) {
            setPeriod(date, preselectedDate);
          } else {
            setPeriod(preselectedDate, date);
          }
        }
        setPreselectedDate(null);
      } else {
        setPreselectedDate(date);
        setPeriod(null, null);
      }
    },
    [preselectedDate]
  );
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
        className={classes.days}
        transition={scrollVariantsTransition}
      >
        {days.map((week) => {
          return (
            <div className={classes.week}>
              {week.map((day) => {
                const isDateFocused = isDatesEqual(day.date, focusedDate);

                const isDateBetweenInterval = getIsDateBetweenInterval(
                  day.date,
                  preselectedDate,
                  focusedDate,
                  startDate,
                  endDate
                );

                const isDateActive = getIsDateActive(
                  day.date,
                  preselectedDate,
                  startDate,
                  endDate
                );
                const activeDateConfig = getActiveDateConfig(
                  day.date,
                  isDateFocused,
                  isDateActive,
                  focusedDate,
                  preselectedDate,
                  startDate,
                  endDate
                );

                return (
                  <DayItem
                    day={day}
                    onMouseLeave={removeFocusedDateHandler}
                    onMouseEnter={setFocusedDateHandler}
                    isDateBetweenInterval={isDateBetweenInterval}
                    onClickDate={onClickDateHandler}
                    activeDateConfig={activeDateConfig}
                    isSelected={isDateActive}
                    isPeriodSelected={!!startDate && !!endDate}
                  />
                );
              })}
            </div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};
