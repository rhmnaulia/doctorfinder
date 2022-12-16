import { useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { TDoctor, TDoctorList } from '../types'
import SearchFilter from 'components/SearchFilter'
import Card from 'components/Card'
import Spinner from 'components/Spinner'

export default function Home() {
  const [hospitals, setHospitals] = useState<any>([''])
  const [specialization, setSpecialization] = useState<any>([''])
  const [doctors, setDoctors] = useState<TDoctorList | []>([])
  const [checkboxData, setCheckboxData] = useState<any>({})
  const [filterName, setFilterName] = useState<string>('')

  const { isLoading, error, data } = useQuery({
    queryKey: ['getdoctorList'],
    queryFn: () =>
      axios
        .get('https://run.mocky.io/v3/c9a2b598-9c93-4999-bd04-0194839ef2dc')
        .then((res) => {
          setDoctors(res.data.data)
          setHospitals([
            ...new Set(
              res.data.data.flatMap((doctor: TDoctor) =>
                doctor.hospital.map((h) => h.name)
              )
            ),
          ])
          setSpecialization([
            ...new Set(
              res.data.data.map((doctor: TDoctor) => doctor.specialization.name)
            ),
          ])
          return res.data.data
        }),
  })

  const handleNameFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(e.target.value)
  }

  const filteredDoctorList = doctors.filter((doctor: TDoctor) => {
    if (
      checkboxData.hospital.length === 0 &&
      checkboxData.specialization.length === 0
    ) {
      return doctor.name.toLowerCase().includes(filterName.toLowerCase())
    } else if (
      checkboxData.hospital.length > 0 &&
      checkboxData.specialization.length > 0
    ) {
      return (
        doctor.name.toLowerCase().includes(filterName.toLowerCase()) &&
        checkboxData?.hospital?.includes(doctor.hospital[0].name) &&
        checkboxData?.specialization?.includes(doctor.specialization.name)
      )
    }
    return (
      (doctor.name.toLowerCase().includes(filterName.toLowerCase()) &&
        checkboxData?.hospital?.includes(doctor.hospital[0].name)) ||
      checkboxData?.specialization?.includes(doctor.specialization.name)
    )
  })

  return (
    <div className='container mx-auto xl:px-20 lg:px-10 px-5'>
      <div className='px-6 py-7 rounded navbar bg-brand text-primary-content flex-col items-start'>
        <h1 className='lg:text-4xl text-3xl font-semibold mb-2 '>
          Doctor Finder
        </h1>
        <SearchFilter
          handleChange={handleNameFilter}
          hospitalOption={hospitals}
          specializationOption={specialization}
          getCheckedValue={(data) => setCheckboxData(data)}
        />
      </div>
      {isLoading ? (
        <div className='w-full grid h-[calc(100vh-350px)] place-items-center'>
          <Spinner />
        </div>
      ) : error ? (
        <div className='w-full grid h-[calc(100vh-350px)] place-items-center'>
          <p>{`An error has occurred: ${error}`}</p>
        </div>
      ) : (
        <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1  lg:gap-8 gap-3 justify-between lg:mt-8 mt-3'>
          {filteredDoctorList.map((doctor: TDoctor, i: number) => (
            <Card key={doctor.doctor_id} doctorData={doctor} />
          ))}
        </div>
      )}
    </div>
  )
}
