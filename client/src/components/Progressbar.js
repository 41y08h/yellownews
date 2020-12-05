import React from "react";
import { Transition } from "react-transition-group";

export default function Progressbar({ progress }) {
  const defaultStyle = {
    transition: "opacity 1s ease-in-out",
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  return (
    <Transition in={progress < 100} timeout={1000} unmountOnExit>
      {(state) => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <div className="progress margin-bottom">
            <div className={"bar success w-" + progress}>{progress}%</div>
          </div>
        </div>
      )}
    </Transition>
  );
}
