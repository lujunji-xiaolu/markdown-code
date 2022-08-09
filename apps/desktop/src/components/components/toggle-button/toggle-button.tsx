import * as React from "react";
import Button from "@/components/button";

interface ToggleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (props, ref) => {
    const { selected = false, disabled = false, children, ...other } = props;

    const variant = selected ? "accent" : "standard";

    return (
      <Button variant={variant} disabled={disabled} ref={ref} {...other}>
        {children}
      </Button>
    );
  }
);

export default ToggleButton;
