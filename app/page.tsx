import Image from 'next/image'

export default function Home() {
  return (
    <main>
      
      <nav className='flex flex-row justify-between bg-black px-4 w-full h-20 items-center fixed'>
        <div className='px-5 flex flex-row justify-start items-center'>
          <Image src="/images/logo.png" alt="logo" width={70} height={70} />
          <h1 className='text-white text-3xl font-semibold px-3'>DegChain</h1>
        </div>
        <div className='flex flex-row justify-evenly basis-1/4' >
          <button className='bg-white h-8 px-3 rounded-full m-1'>Register</button>
          <button className='bg-white h-8 px-3 rounded-full m-1'>Login</button>
        </div>
      </nav>

      <div className="flex items-center  bg-cover  w-full h-screen bg-center bg-no-repeat bg-local 
      text-white  text-4xl pl-4 capitalize font-bold " 
      style={{ backgroundImage: 'url("/images/background.png")' }}>
        Intuitive Blockchain 

        powered Document 

        management system
      </div>

      <div className='h-98 bg-black rounded-t-3xl mt-2'>
        <h2 className='text-white  text-center pt-10 text-2xl font-medium'>
         The Document Management Systems Infrastructure:
        </h2>
        <div className='flex flex-row flex-wrap justify-around gap-4 items-start p-10 '>
          <div className='flex flex-col basis-1/5 min-w-48 items-center gap-2  '>
              <Image src="/images/image1.png" alt="" width={200} height={200}/>
              <p className='text-white font-medium'>Web UI for administrators</p>
          </div>
          <div className='flex flex-col basis-1/5 min-w-48 items-center gap-2 '>
              <Image src="/images/image2.png" alt="" width={150} height={200} />
              <p className='text-white font-medium'>Database</p>
          </div>
          <div className='flex flex-col basis-1/5 min-w-48 items-center gap-2 '>
              <Image src="/images/image3.png" alt="" width={200} height={200}/>
              <p className='text-white font-medium'>Secure API gateway for data access</p>
          </div>
          <div className='flex flex-col basis-1/5 min-w-48 items-center gap-2 '>
              <Image src="/images/image4.png" alt="" width={200} height={200}/>
              <p className='text-white font-medium '>User interface for document storage and access</p>
          </div>
        </div>
      </div>

      <div className='h-98 bg-white '>
        <h2 className='text-black text-center pt-10 text-2xl font-medium'>
         DegChains Features:
        </h2>
        <div className='flex flex-row flex-wrap justify-around gap-4 items-start p-10 '>
          <div className='flex flex-col basis-1/5 min-w-48 items-center text-center gap-2'>
              <Image src="/images/feature1.png" alt="" width={60} height={60} className='justify-start'/>
              <p className='text-black'>System instance setup</p>
          </div>
          <div className='flex flex-col basis-1/5 min-w-48 items-center text-center gap-2'>
              <Image src="/images/feature2.png" alt="" width={60} height={60} className='justify-start'/>
              <p className='text-black'>Dedicated accounts and login for admins and users</p>
          </div>
          <div className='flex flex-col basis-1/5 min-w-48 items-center text-center gap-2'>
              <Image src="/images/feature3.png" alt="" width={60} height={60}/>
              <p className='text-black'>Invite, manage, and remove users</p>
          </div>
          <div className='flex flex-col basis-1/5 min-w-48 items-center text-center gap-2'>
              <Image src="/images/feature4.png" alt="" width={60} height={60}/>
              <p className='text-black '>Gateways with traffic certification support and blockchain
data confirmation</p>
          </div>
        </div>
      </div>

    </main>
  )
}
