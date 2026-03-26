from flask import Flask, jsonify
from flask_cors import CORS
import yfinance as yf
import pandas as pd

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return jsonify({"message": "Stock Dashboard Backend is Running!"})


@app.route("/stock/<ticker>")
def get_stock_data(ticker):
    try:
        stock = yf.Ticker(ticker)

        # Get stock info
        info = stock.info

        # Get 6 months historical data
        hist = stock.history(period="6mo")

        if hist.empty:
            return jsonify({"error": "No data found for this ticker"}), 404

        hist.reset_index(inplace=True)

        # Convert date to string
        hist["Date"] = hist["Date"].astype(str)

        latest = hist.iloc[-1]

        response = {
            "ticker": ticker.upper(),
            "companyName": info.get("longName", ticker.upper()),
            "currentPrice": round(float(latest["Close"]), 2),
            "open": round(float(latest["Open"]), 2),
            "high": round(float(latest["High"]), 2),
            "low": round(float(latest["Low"]), 2),
            "previousClose": round(float(info.get("previousClose", latest["Close"])), 2),
            "volume": int(latest["Volume"]),
            "history": hist[["Date", "Open", "High", "Low", "Close", "Volume"]].to_dict(orient="records")
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)