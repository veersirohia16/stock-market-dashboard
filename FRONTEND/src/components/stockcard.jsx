function StockCard({ title, value }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-5 shadow-lg text-center">
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  )
}

export default StockCard