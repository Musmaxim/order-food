import Link from 'next/link'

const Footer = () => {
  return (
    <div className='h-12 md:h-24 p-4 lg:px-20 xl:px-20 text-red-500 flex item-center justify-between'>
      <Link href='/' className='font-bold text-xl'>
        Massimo
      </Link>
      <p>&#169; Trade mark</p>
    </div>
  )
}

export default Footer