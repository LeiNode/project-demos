import { ReactNode } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

interface Props {
    children: ReactNode;
}

const Alert = ({ children }: Props) => {
    
  return (
    <div className="alert alert-primary">{children}</div>
  )
}

export default Alert