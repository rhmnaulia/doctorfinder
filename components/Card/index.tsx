import Image from 'next/image'
import { TDoctor } from 'types'

interface ICardProps {
  doctorData: TDoctor
}

const Card: React.FC<ICardProps> = ({ doctorData }) => {
  return (
    <div className='card rounded xl:card-side lg:card-side md:card-side bg-base-100 shadow-xl hover:outline outline-2  outline-brand'>
      <figure className='w-72 self-center'>
        <Image
          priority
          src={doctorData.photo.url}
          width={300}
          height={300}
          alt='foto'
        />
      </figure>
      <div className='card-body lg:w-1/2 w-auto min-h-full'>
        <span>
          <h2 className='card-title font-bold leading-tight mb-1'>
            {doctorData.name}
          </h2>
          <p>{`${doctorData.hospital[0].name} - ${doctorData.specialization.name}`}</p>
        </span>
        <span
          className='break-all text-xs py-5'
          dangerouslySetInnerHTML={{ __html: doctorData.about }}
        />
        <div className='card-actions lg:mt-0 mt-8 justify-end items-end'>
          <button className='btn btn-primary bg-brand border-none hover:bg-brand hover:shadow-md'>
            {doctorData.price.formatted}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
