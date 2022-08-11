import useStore from "@/hooks/useStore";
import { useEffect, useRef } from "react";

export default function useDrag(defaultWidth: number) {
  const store = useStore();
  const targetRef = useRef<HTMLDivElement>(null);
  const dragBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dragBar = dragBarRef.current!;
    const target = targetRef.current!;

    let beginClientX = 0;
    let beginWidth = 0;
    let endWidth = 0;

    const initializeWidth = async () => {
      const width = (await store.get<number>("sideBar.width")) ?? defaultWidth;
      target.style.width = `${width}px`;
    };
    initializeWidth();

    const handleStopDrag = () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleStopDrag);
      document.body.style.cursor = "auto";
      store.set("sideBar.width", endWidth);
    };

    const handleDrag = (ev: MouseEvent) => {
      const movement = ev.clientX - beginClientX;
      endWidth = beginWidth + movement;
      target.style.width = `${endWidth}px`;
    };

    const handleBeginDrag = (ev: MouseEvent) => {
      ev.preventDefault();
      beginClientX = ev.clientX;
      beginWidth = target.offsetWidth;
      document.addEventListener("mousemove", handleDrag);
      document.addEventListener("mouseup", handleStopDrag);
      document.body.style.cursor = "e-resize";
    };

    dragBar.addEventListener("mousedown", handleBeginDrag);

    return () => {
      dragBar.removeEventListener("mousedown", handleBeginDrag);
    };
  }, []);

  return {
    dragBarRef,
    targetRef,
  };
}
