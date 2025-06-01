import { HTMLProps } from "react";
import { classnames } from "@figliolia/classnames";
import "./styles.scss";
/* eslint-disable jsx-a11y/alt-text */

export const DisappearingImage = ({ hidden, className, ...rest }: Props) => {
  return (
    <img
      className={classnames("disappearing-image", className, { hidden })}
      {...rest}
    />
  );
};

interface Props extends HTMLProps<HTMLImageElement> {
  hidden: boolean;
}
