import { FC } from "react";
import classes from "./dayItem.module.scss";
import { IDayItem } from "../../../models/IDayItem.ts";
import classNames from "classnames";
import { isDatesEqual } from "../../../utils/isDatesEqual.ts";
import { isDateMoreThenAnotherDate } from "../../../utils/isDateMoreThenAnotherDate.ts";

export interface ActiveDateConfig {
  type: "focus" | "selected";
  position: "left" | "right" | "single";
}
interface DayItemProps {
  day: IDayItem;
  onMouseEnter: (date: Date) => void;
  onMouseLeave: () => void;
  onClickDate: (date: Date) => void;
  isDateBetweenInterval: boolean;
  activeDateConfig: ActiveDateConfig | null;
  isSelected: boolean;
  isPeriodSelected: boolean;
}
export const DayItem: FC<DayItemProps> = ({
  day,
  onMouseLeave,
  onMouseEnter,
  onClickDate,
  isDateBetweenInterval,
  activeDateConfig,
  isSelected,
  isPeriodSelected,
}) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const isCurrentDateMoreThenNow = isDateMoreThenAnotherDate(day.date, now);
  const isFocusSingle =
    isSelected && activeDateConfig?.type === "focus" && !isPeriodSelected;

  const onMouseEnterHandler = () => {
    if (isCurrentDateMoreThenNow) return;
    onMouseEnter(day.date);
  };
  const onClickHandler = () => {
    if (isCurrentDateMoreThenNow) return;
    onClickDate(day.date);
  };

  return (
    <div
      className={classes.dayItem}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeave}
      onClick={onClickHandler}
    >
      <div
        className={classNames(classes.dayItem__wrapper, {
          [classes.dayItem__wrapper__inInterval]:
            isDateBetweenInterval && !isFocusSingle,
          [classes.dayItem__wrapper__inInterval_startDate]:
            activeDateConfig?.position === "right",
          [classes.dayItem__wrapper__inInterval_endDate]:
            activeDateConfig?.position === "left",
        })}
      >
        <div
          className={classNames(classes.dayItem__content, {
            [classes.dayItem__content__weekend]: day.isWeekend,
            [classes.dayItem__content__anotherMonth]:
              day.isPrevMonth || day.isNextMonth || isCurrentDateMoreThenNow,
            [classes.dayItem__content__focus]: activeDateConfig,
            [classes.dayItem__content__focus_inInterval]:
              isDateBetweenInterval && !isSelected && isPeriodSelected,
            [classes.dayItem__content__active]:
              activeDateConfig?.type === "selected",
            [classes.dayItem__content__focus_left]:
              activeDateConfig?.position === "left",
            [classes.dayItem__content__focus_single]: isFocusSingle,
            [classes.dayItem__content__active_single]:
              activeDateConfig?.type === "selected" &&
              activeDateConfig.position === "single",
          })}
        >
          <span className={classNames(classes.dayItem__content__day)}>
            {day.date.getDate()}
            {isDatesEqual(now, day.date) && (
              <div className={classes.dayItem__content_now} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
