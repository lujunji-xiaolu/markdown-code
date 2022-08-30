import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import * as React from "react";
// import { unstable_composeClasses as composeClasses } from "@mui/base";
// import TreeViewContext from "../TreeView/TreeViewContext";
// import { DescendantProvider, useDescendant } from "../TreeView/descendants";
// import treeItemClasses, { getTreeItemUtilityClass } from "./treeItemClasses";
import { Dir } from "../../types";
// import { useIsExpanded } from "./hooks";
import SegoeFluentIcon from "@/components/segoe-fluent-icon";
import Typography from "@mui/material/Typography";
import { useRecoilState, useRecoilValue } from "recoil";
import { expandedIdsState, focusedIdState, selectedIdsState } from "./atoms";
import TreeLeaf from "./tree-leaf";
import useUpdate from "react-use/lib/useUpdate";

// const useUtilityClasses = (ownerState) => {
//   const { classes } = ownerState;

//   const slots = {
//     root: ["root"],
//     content: ["content"],
//     expanded: ["expanded"],
//     selected: ["selected"],
//     focused: ["focused"],
//     disabled: ["disabled"],
//     iconContainer: ["iconContainer"],
//     label: ["label"],
//     group: ["group"],
//   };

//   return composeClasses(slots, getTreeItemUtilityClass, classes);
// };

const TreeItemRoot = styled("li", {
  name: "MuiTreeItem",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root,
})({
  listStyle: "none",
  margin: 0,
  padding: 0,
  outline: 0,
});

const ContentRoot = styled("div", {
  name: "MuiTreeItem",
  slot: "Content",
  // overridesResolver: (props, styles) => {
  //   return [
  //     styles.content,
  //     styles.iconContainer && {
  //       [`& .${treeItemClasses.iconContainer}`]: styles.iconContainer,
  //     },
  //     styles.label && {
  //       [`& .${treeItemClasses.label}`]: styles.label,
  //     },
  //   ];
  // },
})(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  height: 26,
  padding: "0px 13px",
  margin: "3px 5px",
  borderRadius: 4,
  cursor: "pointer",
  userSelect: "none",
  "& .content-icon": {
    color: theme.palette.text.primary,
  },
  "& .content": {
    color: theme.palette.text.primary,
  },
  // padding: "0 8px",
  // width: "100%",
  // display: "flex",
  // alignItems: "center",

  // WebkitTapHighlightColor: "transparent",
  "&:hover": {
    backgroundColor: theme.palette.fill.subtle.secondary,
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: "transparent",
    },
  },
  // [`&.${treeItemClasses.disabled}`]: {
  //   opacity: theme.palette.action.disabledOpacity,
  //   backgroundColor: "transparent",
  // },
  // [`&.${treeItemClasses.focused}`]: {
  //   backgroundColor: theme.palette.action.focus,
  // },
  // [`&.${treeItemClasses.selected}`]: {
  //   backgroundColor: alpha(
  //     theme.palette.primary.main,
  //     theme.palette.action.selectedOpacity
  //   ),
  //   "&:hover": {
  //     backgroundColor: alpha(
  //       theme.palette.primary.main,
  //       theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
  //     ),
  //     // Reset on touch devices, it doesn't add specificity
  //     "@media (hover: none)": {
  //       backgroundColor: alpha(
  //         theme.palette.primary.main,
  //         theme.palette.action.selectedOpacity
  //       ),
  //     },
  //   },
  //   [`&.${treeItemClasses.focused}`]: {
  //     backgroundColor: alpha(
  //       theme.palette.primary.main,
  //       theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity
  //     ),
  //   },
  // },
  // [`& .${treeItemClasses.iconContainer}`]: {
  //   marginRight: 4,
  //   width: 15,
  //   display: "flex",
  //   flexShrink: 0,
  //   justifyContent: "center",
  //   "& svg": {
  //     fontSize: 18,
  //   },
  // },
  // [`& .${treeItemClasses.label}`]: {
  //   width: "100%",
  //   // fixes overflow - see https://github.com/mui/material-ui/issues/27372
  //   minWidth: 0,
  //   paddingLeft: 4,
  //   position: "relative",
  //   ...theme.typography.body1,
  // },
}));

const TreeItemGroup = styled(Collapse, {
  name: "MuiTreeItem",
  slot: "Group",
  overridesResolver: (props, styles) => styles.group,
})({
  margin: 0,
  padding: 0,
  // marginLeft: 17,
});

interface TreeItemProps {
  depth: number;
  item: Dir;
}

const TreeItem = React.forwardRef<HTMLLIElement, TreeItemProps>(
  function TreeItem(props, ref) {
    // const props = useThemeProps({ props: inProps, name: "MuiTreeItem" });
    const {
      depth,
      item,
      // children,
      // className,
      // collapseIcon,
      // ContentComponent = TreeItemContent,
      // ContentProps,
      // endIcon,
      // expandIcon,
      // disabled: disabledProp,
      // icon,
      // id: idProp,
      // label,
      // nodeId,
      // onClick,
      // onMouseDown,
      // TransitionComponent = Collapse,
      // TransitionProps,
      // ...other
    } = props;

    const update = useUpdate();

    const [expandedIds, setExpandedIds] = useRecoilState(expandedIdsState);
    const expanded = expandedIds.has(item.id);

    if (item.id === 0) {
      // console.log(expanded);
    }

    const selectedIds = useRecoilValue(selectedIdsState);
    const selected = selectedIds.has(item.id);

    const focusedId = useRecoilValue(focusedIdState);
    const focused = item.id === focusedId;

    const updatedRef = React.useRef(false);
    updatedRef.current = false;
    React.useLayoutEffect(() => {
      updatedRef.current = true;
    });

    // const {
    //   icons: contextIcons = {},
    //   focus,
    //   isExpanded,
    //   isFocused,
    //   isSelected,
    //   isDisabled,
    //   multiSelect,
    //   disabledItemsFocusable,
    //   mapFirstChar,
    //   unMapFirstChar,
    //   registerNode,
    //   unregisterNode,
    //   treeId,
    // } = React.useContext(TreeViewContext);

    // let id = null;

    // if (idProp != null) {
    //   id = idProp;
    // } else if (treeId && nodeId) {
    //   id = `${treeId}-${nodeId}`;
    // }

    // const [treeitemElement, setTreeitemElement] = React.useState(null);
    // const contentRef = React.useRef(null);
    // const handleRef = useForkRef(setTreeitemElement, ref);

    // const descendant = React.useMemo(
    //   () => ({
    //     element: treeitemElement,
    //     id: nodeId,
    //   }),
    //   [nodeId, treeitemElement]
    // );

    // const { index, parentId } = useDescendant(descendant);

    // React.useEffect(() => {
    //   // On the first render a node's index will be -1. We want to wait for the real index.
    //   if (registerNode && unregisterNode && index !== -1) {
    //     registerNode({
    //       id: nodeId,
    //       idAttribute: id,
    //       index,
    //       parentId,
    //       expandable,
    //       disabled: disabledProp,
    //     });

    //     return () => {
    //       unregisterNode(nodeId);
    //     };
    //   }

    //   return undefined;
    // }, [
    //   registerNode,
    //   unregisterNode,
    //   parentId,
    //   index,
    //   nodeId,
    //   expandable,
    //   disabledProp,
    //   id,
    // ]);

    // React.useEffect(() => {
    //   if (mapFirstChar && unMapFirstChar && label) {
    //     mapFirstChar(
    //       nodeId,
    //       contentRef.current.textContent.substring(0, 1).toLowerCase()
    //     );

    //     return () => {
    //       unMapFirstChar(nodeId);
    //     };
    //   }
    //   return undefined;
    // }, [mapFirstChar, unMapFirstChar, nodeId, label]);

    // let ariaSelected;
    // if (multiSelect) {
    //   ariaSelected = selected;
    // } else if (selected) {
    //   /* single-selection trees unset aria-selected on un-selected items.
    //    *
    //    * If the tree does not support multiple selection, aria-selected
    //    * is set to true for the selected node and it is not present on any other node in the tree.
    //    * Source: https://www.w3.org/WAI/ARIA/apg/patterns/treeview/
    //    */
    //   ariaSelected = true;
    // }

    // function handleFocus(event) {
    //   // DOM focus stays on the tree which manages focus with aria-activedescendant
    //   if (event.target === event.currentTarget) {
    //     ownerDocument(event.target)
    //       .getElementById(treeId)
    //       .focus({ preventScroll: true });
    //   }

    //   const unfocusable = !disabledItemsFocusable && disabled;
    //   if (!focused && event.currentTarget === event.target && !unfocusable) {
    //     focus(event, nodeId);
    //   }
    // }

    const renderSubItems = () => {
      return item.dirs.map((subDir) => (
        <TreeItem key={subDir.id} depth={depth + 1} item={subDir}></TreeItem>
      ));
    };

    const renderSubLeaves = () => {
      return item.files.map((subFile) => (
        <TreeLeaf
          key={subFile.id}
          depth={depth + 1}
          item={subFile}
          // onContextMenu={handleFileContextMenu}
          // onClick={() => pushTab(file)}
        />
      ));
    };

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
      console.log("debug");
      // console.log("begin expansion");
      // if (!focused) {
      //   // focus(event, nodeId);
      // }

      const multiple = event.shiftKey || event.ctrlKey || event.metaKey;

      // If already expanded and trying to toggle selection don't close
      if (!(multiple && expanded)) {
        if (expanded) {
          expandedIds.delete(item.id);
        } else {
          expandedIds.add(item.id);
        }

        // console.log("begin update");
        console.log(updatedRef.current);
        if (updatedRef.current) {
          update();
        }

        // setExpandedIds(new Set(expandedIds));
        //  handleSelection(event);
      }
    };

    return (
      <TreeItemRoot
        // className={clsx(classes.root, className)}
        role="treeitem"
        // aria-expanded={expandable ? expanded : null}
        // aria-selected={ariaSelected}
        // aria-disabled={disabled || null}
        // ref={ref}
        // id={id}
        tabIndex={-1}
        // {...other}
        // ownerState={ownerState}
        // onFocus={handleFocus}
      >
        <button onClick={handleClick}>
          <ContentRoot style={{ paddingLeft: depth * 13 }}>
            <SegoeFluentIcon
              name={expanded ? "ChevronDownMed" : "ChevronRightMed"}
              className="content-icon"
              sx={{ marginRight: "14px" }}
            ></SegoeFluentIcon>
            <Typography variant="body2" className="content">
              {item.fileName}
            </Typography>
          </ContentRoot>
        </button>

        {/* <StyledTreeItemContent
        // as={ContentComponent}
        // ref={contentRef}
        // classes={{
        //   root: classes.content,
        //   expanded: classes.expanded,
        //   selected: classes.selected,
        //   focused: classes.focused,
        //   disabled: classes.disabled,
        //   iconContainer: classes.iconContainer,
        //   label: classes.label,
        // }}
        // label={item.fileName}
        // nodeId={nodeId}
        // onClick={onClick}
        // onMouseDown={onMouseDown}
        // icon={icon}
        // expansionIcon={expansionIcon}
        // displayIcon={displayIcon}
        // ownerState={ownerState}
        // {...ContentProps}
        /> */}
        {/* <TreeItemGroup
          // as={TransitionComponent}
          unmountOnExit
          // className={classes.group}
          in={expanded}
          component="ul"
          role="group"
          // {...TransitionProps}
        >
          {renderSubItems()}
          {renderSubLeaves()}
          {children}
        </TreeItemGroup> */}
        {expanded && (
          <ul>
            {renderSubItems()}
            {renderSubLeaves()}
          </ul>
        )}
      </TreeItemRoot>
    );
  }
);

export default TreeItem;
