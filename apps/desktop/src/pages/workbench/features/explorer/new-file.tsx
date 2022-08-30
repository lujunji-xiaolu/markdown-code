import TreeItem, { TreeItemContentProps, useTreeItem } from "@mui/lab/TreeItem";
import clsx from "clsx";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { showNewFileInputState } from "./atoms";
import { Dir } from "./types";

const TreeItemContent = forwardRef<unknown, TreeItemContentProps>(
  (props, ref) => {
    const {
      classes,
      className,
      displayIcon,
      expansionIcon,
      icon: iconProp,
      label,
      nodeId,
      onClick,
      onMouseDown,
      ...other
    } = props;

    const [value, setValue] = useState("");
    const handleInput: React.FormEventHandler<HTMLInputElement> = (event) => {
      setValue(event.currentTarget.value);
    };

    const setShowInput = useSetRecoilState(showNewFileInputState);
    const handleBlur = () => {
      setShowInput(false);
      setValue("");
    };

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      inputRef.current!.focus();
    }, []);

    const {
      disabled,
      expanded,
      selected,
      focused,
      handleExpansion,
      handleSelection,
      preventSelection,
    } = useTreeItem(nodeId);

    const icon = iconProp || expansionIcon || displayIcon;

    const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (
      event
    ) => {
      preventSelection(event);

      if (onMouseDown) {
        onMouseDown(event);
      }
    };

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
      handleExpansion(event);
      handleSelection(event);

      if (onClick) {
        onClick(event);
      }
    };

    return (
      /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions -- Key event is handled by the TreeView */
      <div
        className={clsx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled,
        })}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        // @ts-ignore
        ref={ref}
        {...other}
      >
        <div className={classes.iconContainer}>{icon}</div>
        <div className={classes.label}>
          <input
            ref={inputRef}
            value={value}
            onInput={handleInput}
            onBlur={handleBlur}
          ></input>
        </div>
      </div>
    );
  }
);

interface NewFileProps {
  dir: Dir;
}

export default function NewFile(props: NewFileProps) {
  const { dir } = props;

  return (
    <TreeItem
      nodeId={`${dir.path}-new-file`}
      ContentComponent={TreeItemContent}
    ></TreeItem>
  );
}
