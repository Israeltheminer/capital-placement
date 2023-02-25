const navItems = [
  { name: 'xxxxxxx' },
  { name: 'Application Form' },
  { name: 'xxxxxxxx' },
];

const Navbar = ({
  setActiveLink,
  activeLink,
}: {
  activeLink: string;
  setActiveLink: Function;
}) => {
  return (
    <nav className="h-[100px] flex shadow-lg">
      {navItems.map(({ name }, index) => (
        <div className="flex" key={'nav' + index}>
          <div
            className="h-[100px] min-w-[250px] grid place-content-center cursor-pointer"
            style={{
              backgroundColor: name === activeLink ? '#00635B' : 'transparent',
            }}
            onClick={() => setActiveLink(name)}
          >
            <span
              className="font-bold text-center"
              style={{ color: name === activeLink ? '#fff' : '#000' }}
            >
              {name}
            </span>
          </div>
          {name !== activeLink ? (
            <div className="border-r h-[60px] my-auto"></div>
          ) : (
            <div className="bg-[#00635b] my-auto w-[20px] h-[20px] rotate-45 right-[10px] relative"></div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
