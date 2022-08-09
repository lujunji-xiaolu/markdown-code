import { ControlledMenu } from "@szhsin/react-menu";
import { styled } from "@mui/material/styles";
import { getFlyoutStyles } from "@/components/flyout";

const ContextMenu = styled(ControlledMenu, {
  name: "WinUIContextMenu",
  slot: "Root",
})(({ theme }) => ({
  "& .szh-menu": {
    ...getFlyoutStyles(theme),
    margin: 0,
    listStyle: "none",
    boxSizing: "border-box",
    width: "max-content",
    zIndex: 100,
    userSelect: "none",
    color: "#212529",
    borderRadius: "0.25rem",
    minWidth: "10rem",
    padding: "0.5rem 0",
    "&:focus": {
      outline: "none",
    },
  },
  // .szh-menu__arrow {
  //   box-sizing: border-box;
  //   width: 0.75rem;
  //   height: 0.75rem;
  //   background-color: #fff;
  //   border: 1px solid transparent;
  //   border-left-color: rgba(0, 0, 0, 0.1);
  //   border-top-color: rgba(0, 0, 0, 0.1);
  //   z-index: -1;
  // }
  // .szh-menu__arrow--dir-left {
  //   right: -0.375rem;
  //   transform: translateY(-50%) rotate(135deg);
  // }
  // .szh-menu__arrow--dir-right {
  //   left: -0.375rem;
  //   transform: translateY(-50%) rotate(-45deg);
  // }
  // .szh-menu__arrow--dir-top {
  //   bottom: -0.375rem;
  //   transform: translateX(-50%) rotate(-135deg);
  // }
  // .szh-menu__arrow--dir-bottom {
  //   top: -0.375rem;
  //   transform: translateX(-50%) rotate(45deg);
  // }

  // .szh-menu__item--focusable {
  //   cursor: default;
  //   background-color: inherit;
  // }

  // .szh-menu__group {
  //   box-sizing: border-box;
  // }
  // .szh-menu__radio-group {
  //   margin: 0;
  //   padding: 0;
  //   list-style: none;
  // }

  // .szh-menu-button {
  //   box-sizing: border-box;
  // }

  // .szh-menu-container--itemTransition .szh-menu__item {
  //   transition-property: background-color, color;
  //   transition-duration: 0.15s;
  //   transition-timing-function: ease-in-out;
  // }
  // .szh-menu__item--type-radio {
  //   padding-left: 2.2rem;
  // }
  // .szh-menu__item--type-radio::before {
  //   content: "○";
  //   position: absolute;
  //   left: 0.8rem;
  //   top: 0.55rem;
  //   font-size: 0.8rem;
  // }

  // .szh-menu__item--type-checkbox {
  //   padding-left: 2.2rem;
  // }
  // .szh-menu__item--type-checkbox::before {
  //   position: absolute;
  //   left: 0.8rem;
  // }

  // .szh-menu__header {
  //   color: #888;
  //   font-size: 0.8rem;
  //   padding: 0.2rem 1.5rem;
  //   text-transform: uppercase;
  // }
}));

export default ContextMenu;
