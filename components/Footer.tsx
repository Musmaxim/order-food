import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='h-12 md:h-24 p-4 lg:p-20 xl:p-20 text-red-500 flex item-center justify-between'>
      <Link href='/' className='font-bold text-xl'>
        Вкусно и ладно!
      </Link>
      <p>&#169; Торговая марка</p>
    </div>
  )
}

export default Footer