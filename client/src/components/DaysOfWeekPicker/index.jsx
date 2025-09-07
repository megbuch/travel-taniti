export default function DaysOfWeekPicker(props) {
  const { selectedDays, onToggleDay } = props

  const daysOfWeek = [
    { value: 'Monday', label: 'Mon' },
    { value: 'Tuesday', label: 'Tue' },
    { value: 'Wednesday', label: 'Wed' },
    { value: 'Thursday', label: 'Thu' },
    { value: 'Friday', label: 'Fri' },
    { value: 'Saturday', label: 'Sat' },
    { value: 'Sunday', label: 'Sun' }
  ]

  return (
    <div className='days-of-week-picker-comp row'>
      {daysOfWeek.map(day => (
        <label className='row' key={day.value}>
          <input
            type='checkbox'
            checked={selectedDays.includes(day.value)}
            onChange={()=>onToggleDay(day.value)}
          />
          <span>{day.label}</span>
        </label>
      ))}
    </div>
  )
}