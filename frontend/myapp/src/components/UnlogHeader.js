//Navigate from page to page

import React from 'react';


function UnlogHeader() {
  return (
    <header className='w-screen  bg-slate-700'>
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
        <h1 className="flex w-full text-3xl font-bold text-[#ddfff4]"> <a href="http://localhost:3000/" >SamePageApp</a>  <img src="./android-chrome-192x192.png" alt="logo" className="h-9" /> </h1>
    </div>
    </header>
  );
}

export default UnlogHeader;
