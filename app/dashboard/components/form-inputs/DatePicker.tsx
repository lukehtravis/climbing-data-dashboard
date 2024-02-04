import React from 'react'
import { Dispatch, SetStateAction } from 'react'
interface Props {
  date?: string
  setDate: Dispatch<SetStateAction<string>>
}

const DatePicker: React.FC<Props> = ({ date, setDate }) => {
  const changeDate = (e: React.FormEvent<HTMLInputElement>) => {
    setDate((e.target as HTMLInputElement).value)
  }
  return (
    <div>
      <input type='date' onChange={(e) => changeDate(e)} value={date} />
    </div>
  )
}

export default DatePicker
