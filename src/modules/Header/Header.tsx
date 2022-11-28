import './Header.css';

export const Header = () => {
  return (
    <div className="header-container">
      <div className="header-actions-container">
        <span className="heading">Actions</span>
        <span className="sub-heading">Move, outdent, indent and delete</span>
      </div>
      <div className="header-standards-container">
        <span className="heading">Standards</span>
        <span className="sub-heading">Text of the standard</span>
      </div>
    </div>
  );
};
