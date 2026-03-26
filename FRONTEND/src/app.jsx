import { useState, useEffect } from 'react'
import axios from 'axios'
import StockCard from './components/stockcard.jsx'
import StockChart from './components/stockchart.jsx'
import StockTable from './components/stocktable.jsx'

function App() {
  const [ticker, setTicker] = useState('AAPL')
  const [stockData, setStockData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchStock = async (selectedTicker = ticker) => {
    try {
      setLoading(true)
      setError('')
      const response = await axios.get(`http://127.0.0.1:5000/stock/${selectedTicker}`)
      setStockData(response.data)
    } catch (err) {
      setError('Stock not found or server error')
      setStockData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStock('AAPL')
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchStock()
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">
          📈 Stock Market Dashboard
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Search and analyze stock market data in real-time
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
          <input
            type="text"
            placeholder="Enter stock ticker (e.g. AAPL, TSLA, RELIANCE.NS)"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            onKeyDown={handleKeyDown}
            className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 outline-none w-full md:w-[420px]"
          />
          <button
            onClick={() => fetchStock()}
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold transition"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-center text-lg">Loading stock data...</p>}
        {error && <p className="text-center text-red-400 mb-6">{error}</p>}

        {stockData && (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {stockData.companyName} ({stockData.ticker})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <StockCard title="Current Price" value={`$${stockData.currentPrice}`} />
              <StockCard title="Open" value={`$${stockData.open}`} />
              <StockCard title="High" value={`$${stockData.high}`} />
              <StockCard title="Low" value={`$${stockData.low}`} />
              <StockCard title="Prev Close" value={`$${stockData.previousClose}`} />
              <StockCard title="Volume" value={stockData.volume.toLocaleString()} />
            </div>

            <div className="mb-8">
              <StockChart />
            </div>

            <StockTable />
          </>
        )}
      </div>
    </div>
  )
}

export default App