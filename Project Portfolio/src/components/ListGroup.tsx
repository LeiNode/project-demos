import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

interface Props {
    items: string[];
    heading: String;
}

function ListGroup({ items, heading }:Props) {
  // State Hook
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <RxHamburgerMenu></RxHamburgerMenu>
      <h1>{heading}</h1>
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => setSelectedIndex(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
