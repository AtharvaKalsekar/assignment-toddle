import './IconButton.css';

import { ArrowLeft, ArrowRight, IconProps as FeatherIconProps, Move, Trash2, XCircle } from 'react-feather';

type IconProps = FeatherIconProps & {
  iconType: "delete" | "right-arrow" | "left-arrow" | "drag" | "cancel";
  disbaled?: boolean;
};

export const IconButton = ({
  iconType,
  width = 20,
  height = 20,
  disbaled = false,
  ...rest
}: IconProps) => {
  let icon;
  switch (iconType) {
    case "right-arrow": {
      icon = <ArrowRight width={width} height={height} {...rest} />;
      break;
    }
    case "left-arrow": {
      icon = <ArrowLeft width={width} height={height} {...rest} />;
      break;
    }
    case "drag": {
      icon = <Move width={width} height={height} {...rest} />;
      break;
    }
    case "cancel": {
      icon = (
        <XCircle
          className="icon-button-danger"
          width={width}
          height={height}
          {...rest}
        />
      );
      break;
    }
    case "delete": {
      icon = (
        <Trash2
          className="icon-button-danger"
          width={width}
          height={height}
          {...rest}
        />
      );
      break;
    }
  }

  return (
    <div className={`icon-button ${disbaled ? "icon-button-disabled" : ""}`}>
      {icon}
    </div>
  );
};
