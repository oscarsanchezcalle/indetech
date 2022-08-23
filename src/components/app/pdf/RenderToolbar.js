import React from 'react'
import { toolbarPlugin, ToolbarSlot } from "@react-pdf-viewer/toolbar";

const RenderToolbar = (Toolbar) => (
    <Toolbar>
      {(slots) => {
        const { ZoomOut } = slots;
        return (
          <div
            style={{
              alignItems: "center",
              display: "flex"
            }}
          >
            <div style={{ padding: "0px 2px" }}></div>
            ...
          </div>
        );
      }}
    </Toolbar>
  );
