import { FC, PropsWithChildren, useEffect } from "react";
import classes from "./horizontalScroll.module.scss";
import * as classNames from "classnames";
import { isDateMoreThenAnotherDate } from "../../utils/isDateMoreThenAnotherDate.ts";
import { motion } from "framer-motion";

interface HorizontalScrollProps {
  pageDate: Date;
  onChangePageDate: (date: Date) => void;
}

export const scrollVariantsTransition = {
  duration: 0.3,
  type: "tween",
  ease: "easeInOut",
};

export const scrollVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 286 : -286,
      opacity: 0,
    };
  },
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => {
    return {
      opacity: 0,
      x: direction < 0 ? 286 : -286,
      y: 0,
    };
  },
};

const swipeConfidenceThreshold = 1000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
export const HorizontalScroll: FC<PropsWithChildren<HorizontalScrollProps>> = ({
  children,
  pageDate,
  onChangePageDate,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const onPrevDateClickHandler = () => {
    const newDate = new Date(pageDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onChangePageDate(newDate);
  };
  const onNextDateClickHandler = () => {
    const newDate = new Date(pageDate);
    newDate.setMonth(newDate.getMonth() + 1);
    if (isDateMoreThenAnotherDate(newDate, today)) {
      return;
    }
    onChangePageDate(newDate);
  };

  const onKeyDownHandler = (event: KeyboardEvent) => {
    const { key } = event;
    switch (key) {
      case "ArrowLeft":
        onPrevDateClickHandler();
        break;
      case "ArrowRight":
        onNextDateClickHandler();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDownHandler);
    return () => {
      document.removeEventListener("keydown", onKeyDownHandler);
    };
  }, [pageDate]);

  return (
    <div className={classes.horizontalScroll}>
      <svg
        onClick={() => onPrevDateClickHandler()}
        className={classNames(classes.arrow)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M7.707 10.293a1 1 0 00-1.414 1.414l4.294 4.294a1.995 1.995 0 002.826 0l4.294-4.294a1 1 0 00-1.414-1.414L12 14.586l-4.293-4.293z"></path>
      </svg>
      <motion.div
        drag={"x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.5}
        onDragEnd={(_, { offset, velocity }) => {
          const swipe = swipePower(offset.x, velocity.x);

          if (swipe < -swipeConfidenceThreshold) {
            onNextDateClickHandler();
          } else if (swipe > swipeConfidenceThreshold) {
            onPrevDateClickHandler();
          }
        }}
      >
        {children}
      </motion.div>
      <svg
        onClick={() => onNextDateClickHandler()}
        className={classNames(classes.arrow)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M7.707 10.293a1 1 0 00-1.414 1.414l4.294 4.294a1.995 1.995 0 002.826 0l4.294-4.294a1 1 0 00-1.414-1.414L12 14.586l-4.293-4.293z"></path>
      </svg>
    </div>
  );
};
