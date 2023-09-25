import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CartIcon = () => {
  return (
    <Link href='/cart' className='flex items-center gap-4'>
        <div className='relative w-8 h-8 md:h-5 md:w-5'>
            <Image src='/cart.png' alt='корзина' fill />
        </div>
        <span>Корзина (3)</span>
    </Link>
  )
}

export default CartIcon