import { useState } from 'react'
import StockCard from './components/stockcard'
import StockChart from './components/stockchart'
import StockTable from './components/stocktable'

function App() {
  const [ticker, setTicker] = useState('AAPL')

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-2">
          📈 Stock Market Dashboard
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Search and analyze stock market data
        </p>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
          <input
            type="text"
            placeholder="Enter stock ticker (e.g. AAPL, TSLA)"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 outline-none w-full md:w-[420px]"
          />
          <button
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold transition"
          >
            Search
          </button>
        </div>

        {/* Stock Name */}
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Apple Inc. ({ticker})
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StockCard title="Current Price" value="$192.45" />
          <StockCard title="Open" value="$191.80" />
          <StockCard title="High" value="$193.20" />
          <StockCard title="Low" value="$190.95" />
          <StockCard title="Prev Close" value="$191.12" />
          <StockCard title="Volume" value="54,321,200" />
        </div>

        {/* Chart */}
        <div className="mb-8">
          <StockChart />
        </div>

        {/* Table */}
        <StockTable />
      </div>
    </div>
  )
}

export default App