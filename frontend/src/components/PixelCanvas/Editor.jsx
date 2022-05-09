import React, { useState } from "react"
import { SwatchesPicker } from "react-color"
import DrawingPanel from "./DrawingPanel"

import "./styles/editor.scss"

export default function Editor() {
    const [panelWidth, setPanelWidth] = useState(16)
    const [panelHeight, setPanelHeight] = useState(16)
    const [hideOptions, setHideOptions] = useState(false)
    const [selectedColor, setColor] = useState("#ffaaff")

    function initializeDrawingPanel() {
        setHideOptions(!hideOptions)
    }

    function changeColor(color) {
        setColor(color.hex)
    }

    return (
        <div id="editor">
            <div className="grid grid-cols-2 grid-flow-col gap-10">
                <div className="flex items-center flex-col">
                    <button onClick={initializeDrawingPanel} className="button">
                        RESET CANVAS
                    </button>
                    <SwatchesPicker height={300} width={270} color={selectedColor} onChangeComplete={changeColor} />
                </div>
                <div>
                    {
                        hideOptions && (
                            <DrawingPanel
                                width={panelWidth}
                                height={panelHeight}
                                selectedColor={selectedColor}
                            />
                        )
                    }
                    {
                        !hideOptions && (
                            <DrawingPanel
                                width={panelWidth}
                                height={panelHeight}
                                selectedColor={selectedColor}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}
