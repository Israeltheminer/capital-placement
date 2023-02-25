import React from 'react';

const navItems = [
  [{ name: 'hamburger', iconUrl: '/hamburger.svg' }],
  [
    { name: 'home', iconUrl: '/home.svg' },
    { name: 'questions', iconUrl: '/questions.svg' },
  ],
];

const Sidenav = () => {
  return (
    <div className="min-w-[76px] inline sticky top-0 h-screen left-shadow pt-2">
      {navItems.map((navItem, index) => (
        <div className="pt-[40px] mb-[40px] flex flex-col gap-10" key={index}>
          {navItem.map(({ name, iconUrl }) => (
            <img src={iconUrl} key={name} className="mx-auto" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidenav;
