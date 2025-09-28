import { Button } from '..'
import './styles.scss'

export default function Report({ title, startDate, endDate, data }) {
  const columns = data?.length > 0 ? Object.keys(data[0]) : []

  const print = () => {
    window.print()
  }
  return (
    <div className='report-comp details'>
      <h1>{title}</h1>
      {startDate && endDate && <p>{`${startDate} - ${endDate}`}</p>}
      <table>
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map(column => (
                <td key={column}>{item[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <>
        <div>
          <p className='subtitle'>Total Records: {data.length}</p>
          <p className='subtitle'>Report Generated: {new Date().toLocaleString()}</p>
        </div>
        <div className='hide-from-print'>
          <Button text='Print' onClick={print} />
        </div>
      </>
    </div>
  )
}