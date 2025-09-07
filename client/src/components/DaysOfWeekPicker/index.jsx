export default function DaysOfWeekPicker(props) {
  const { selectedDays, onToggleDay } = props

  const daysOfWeek = [
    { value: 'monday', label: 'Mon' },
    { value: 'tuesday', label: 'Tue' },
    { value: 'wednesday', label: 'Wed' },
    { value: 'thursday', label: 'Thu' },
    { value: 'friday', label: 'Fri' },
    { value: 'saturday', label: 'Sat' },
    { value: 'sunday', label: 'Sun' }
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