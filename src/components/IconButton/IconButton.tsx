import { ArrowLeft, ArrowRight, Delete, IconProps as FeatherIconProps, Move } from 'react-feather';

type IconProps = FeatherIconProps & {
  iconType: "delete" | "right-arrow" | "left-arrow" | "drag";
};

export const IconButton = ({
  iconType,
  width = 20,
  height = 20,
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
    case "delete": {
      icon = <Delete width={width} height={height} {...rest} />;
      break;
    }
  }

  return <>{icon}</>;
};
