import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

export default function ProgressChart ({ totalAnswers, meta = 2000 }) {
  const restante = Math.max(meta - totalAnswers, 0)
  const data = [
    { name: 'Respondido', value: totalAnswers },
    { name: 'Restante', value: restante }
  ]

  const COLORS = ['#00C49F', '#f0f0f0'] 
  const percentage = Math.min((totalAnswers / meta) * 100, 100).toFixed(1)

  return (
    <div style={{ width: 500, height: 500, position: 'relative', textAlign: 'center' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            startAngle={90}
            endAngle={-270}
            innerRadius={60}
            outerRadius={80}
            dataKey='value'
            stroke='none'>
            {data.map((entry, index) => (
               <Cell key={`cell-${index}`} fill={COLORS[index]} />
             ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      <div
        style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -60%)',
        fontSize: '24px',
        fontWeight: 'bold'
        }}>
        {percentage}%
      </div>
    
      <div style={{
        position: 'absolute',
        top: '70%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '14px',
        color: '#555'
        }}>
        {`${totalAnswers}`} de
        {` ${meta}`} respostas
      </div>
      
    </div>
  )
}
