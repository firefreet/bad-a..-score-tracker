import React from "react";

// Exporting the Container, Row, and Col components from this file

// This Container component allows us to use a bootstrap container without worrying about class names
export function Container(props) {
  return <div className={`${props.classes ? props.classes : 'container'}`}>{props.children}</div>;;
}

// This Row component lets us use a bootstrap row without having to think about class names
export function Row(props) {
  return <div className={`${props.classes ? + props.classes : 'row'}`}>{props.children}</div>;;
}

// This Col component lets us size bootstrap columns with less syntax
// e.g. <Col size="md-12"> instead of <div className="col-md-12">
export function Col(props) {
  return <div className={`${props.classes ? props.classes : 'col'}`}>{props.children}</div>;;
}
