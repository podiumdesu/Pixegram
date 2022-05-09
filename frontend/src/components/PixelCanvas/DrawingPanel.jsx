import React, { useRef, useState } from "react";

import "./styles/drawingPanel.scss";
import Row from "./Row";
import { exportComponentAsPNG } from "react-component-export-image";

export default function DrawingPanel(props) {
  const { width, height, selectedColor } = props;
  const [canDraw, setCanDraw] = useState(false)
  const panelRef = useRef();

  let rows = [];
  
  for (let i = 0; i < height; i++) {
    rows.push(<Row key={i} width={width} selectedColor={selectedColor} canDraw={canDraw} />);
  }

  const onMouseDown = () => {
    setCanDraw(true)
  }
  const onMouseUp = () => {
    setCanDraw(false)
  }

  return (
    <div id="drawingPanel">
      <button onClick={() => exportComponentAsPNG(panelRef)} className="button">
        Export as PNG
      </button>

      <div id="pixels"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        ref={panelRef}>
        {rows}
      </div>

    </div>
  );

}
