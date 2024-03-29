import Link from 'next/link'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='min-w-0 flex-1'>
        <div className="font-inter relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <p>Climbing Data App Homepage</p>
        </div>
        <div className='font-dmsans text-teal-500 mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left'>
          <p className='text-teal-500'>
            visit the dashboard <Link href='/dashboard'>here</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
