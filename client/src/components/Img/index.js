import React from "react";

function Img ({ src, className, alt, height, width }) {
  return <img src={src} className = {className} alt={alt} height={height} width={width} />;
}

export default Img;