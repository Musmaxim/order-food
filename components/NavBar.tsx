import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import CartIcon from "./CartIcon";
import Image from "next/image";

const NavBar = () => {
  const user = false;
  return (
    <div className="h-12 text-red-500 p-2 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-5 xl:px-15">
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Главная</Link>
        <Link href="/menu">Меню</Link>
        <Link href="/">Контакты</Link>
      </div>
      <div className="text-xl md:font-bold flex-1 md:text-center">
        <Link href="/">Вкусно и ладно!</Link>
      </div>
      <div className="md:hidden">
        <Menu />
      </div>
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <div className="md:absolute top-3 r-2 lg:static flex items-center gap-4 cursor-pointer bg-orange-300 px-1 rounded-md">
          <Image src="/phone.png" alt="Номер телефона" width={20} height={20} />
          <span>123 45 67</span>
        </div>
        {!user ? (
          <Link href="/profile">Профиль</Link>
        ) : (
          <Link href="/orders">Заказы</Link>
        )}
        <CartIcon />
      </div>
    </div>
  );
};

export default NavBar;
