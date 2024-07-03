export default function StatsBar(props) {
  const renderStat = (value,header) =>{
    const dataType = header.dataType;
    switch (dataType) {
      case "money":
        return `$${Number.parseFloat(value).toFixed(2)}`;
      case "duration":
        return `${Number.parseFloat(value)} sec`;
      case "number":
        return Number.parseInt(value);
      default:
        return value
    }
  }
    return (
      <div>        
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
          {props.headers.map((header) => (            
            <div key={header.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">              
              <dt className="truncate text-sm font-medium text-gray-500">{header.name}</dt>                            
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{props.stats?renderStat(props.stats[header.key],header):""}</dd> 
            </div>
          ))}
        </dl>
      </div>
    )
  }