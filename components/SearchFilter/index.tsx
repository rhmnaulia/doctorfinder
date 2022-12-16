import { useEffect, useState } from 'react'

interface ISearchFilterProps {
  hospitalOption: Array<string>
  specializationOption: Array<string>
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  getCheckedValue: (data: { hospital?: any; specialization?: any }) => void
}

const SearchFilter: React.FC<ISearchFilterProps> = ({
  hospitalOption,
  specializationOption,
  handleChange,
  getCheckedValue,
}) => {
  const [checkedHospitalItems, setCheckedHospitalItems] = useState<string[]>([])
  const [checkedSpecializationItems, setCheckedSpecializationItems] = useState<
    string[]
  >([])

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const { name, checked } = event.target
    if (checked) {
      if (type === 'hospital') {
        setCheckedHospitalItems([...checkedHospitalItems, name])
      } else {
        setCheckedSpecializationItems([...checkedSpecializationItems, name])
      }
    } else {
      if (type === 'hospital') {
        setCheckedHospitalItems(
          checkedHospitalItems.filter((item) => item !== name)
        )
      } else {
        setCheckedSpecializationItems(
          checkedSpecializationItems.filter((item) => item !== name)
        )
      }
    }
  }

  useEffect(() => {
    getCheckedValue({
      hospital: checkedHospitalItems,
      specialization: checkedSpecializationItems,
    })
  }, [checkedHospitalItems, checkedSpecializationItems])

  return (
    <div className='flex gap-2 lg:flex-row flex-col w-full items-start'>
      <input
        type='text'
        name='name'
        placeholder='Search here'
        className='input input-bordered input-success w-full max-w-sm text-base-content'
        onChange={handleChange}
      />
      <div className='flex gap-2'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn'>
            Hospital
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu p-2 shadow bg-base-100 text-base-content rounded-box w-52'
          >
            {hospitalOption.map((hospital, i) => (
              <li key={i}>
                <div className='form-control active:bg-base-200'>
                  <label className='cursor-pointer label'>
                    <span className='label-text'>{hospital}</span>
                    <input
                      name={hospital}
                      onChange={(e) => handleCheckboxChange(e, 'hospital')}
                      type='checkbox'
                      checked={checkedHospitalItems.includes(hospital)}
                      className='checkbox checkbox-accent'
                    />
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='dropdown'>
          <label tabIndex={0} className='btn'>
            Specialization
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu p-2 shadow bg-base-100 text-base-content rounded-box w-52'
          >
            {specializationOption.map((specialization, i) => (
              <li key={i}>
                <div className='form-control active:bg-base-200'>
                  <label className='cursor-pointer label grid grid-cols-5 w-full justify-between'>
                    <span className='label-text col-span-4'>
                      {specialization}
                    </span>
                    <span className=''>
                      <input
                        name={specialization}
                        onChange={(e) =>
                          handleCheckboxChange(e, 'specialization')
                        }
                        type='checkbox'
                        checked={checkedSpecializationItems.includes(
                          specialization
                        )}
                        className='checkbox checkbox-accent'
                      />
                    </span>
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SearchFilter
