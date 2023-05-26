import { FC, useCallback, useRef, useState } from "react";
import classes from "./calendar.module.scss";
import { Days } from "./components/days/Days.tsx";
import { Header } from "./components/header/Header.tsx";
import { WeekDays } from "./components/weekDays/WeekDays.tsx";
import { isDateMoreThenAnotherDate } from "./utils/isDateMoreThenAnotherDate.ts";
import { Footer } from "./components/footer/Footer.tsx";
import { HorizontalScroll } from "./components/horizontalScroll/HorizontalScroll.tsx";

export const Calendar: FC = () => {
  const [pageDate, setPageDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  // const [calendarMode, setCaledarMode] = useState<"month" | "years">("month");
  const scrollDirection = useRef(1);

  console.log("direction scrollDirection", scrollDirection);

  const setPageDateHandler = useCallback(
    (date: Date) => {
      if (isDateMoreThenAnotherDate(date, pageDate)) {
        scrollDirection.current = 1;
      } else {
        scrollDirection.current = -1;
      }
      setPageDate(date);
    },
    [pageDate]
  );
  const setStartDateHandler = (date: Date | null) => {
    if (!date) {
      setStartDate(null);
      setEndDate(null);
    }
    setStartDate(date);
  };
  const setPeriodHandler = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) {
      setStartDate(null);
      setEndDate(null);
    } else if (isDateMoreThenAnotherDate(date1, date2)) {
      setStartDate(date2);
      setEndDate(date1);
    } else {
      setStartDate(date1);
      setEndDate(date2);
    }
  };
  return (
    <div className={classes.calendar}>
      <div className={classes.calendar__content}>
        <HorizontalScroll
          pageDate={pageDate}
          onChangePageDate={setPageDateHandler}
        >
          <div>
            <Header
              pageDate={pageDate}
              scrollDirection={scrollDirection.current}
            />
            <WeekDays
              scrollDirection={scrollDirection.current}
              pageDate={pageDate}
            />
            <Days
              scrollDirection={scrollDirection.current}
              pageDate={pageDate}
              endDate={endDate}
              startDate={startDate}
              setStartDate={setStartDateHandler}
              setPeriod={setPeriodHandler}
            />
          </div>
        </HorizontalScroll>
      </div>
      <Footer isActive={!!startDate} />
    </div>
  );
};
