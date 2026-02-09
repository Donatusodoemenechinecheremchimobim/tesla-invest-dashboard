'use client';
import { useEffect, useRef } from 'react';

export default function TradingTicker() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        { "proName": "FOREXCOM:SPXUSD", "title": "S&P 500" },
        { "proName": "FOREXCOM:NSXUSD", "title": "US 100" },
        { "proName": "FX_IDC:EURUSD", "title": "EUR/USD" },
        { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
        { "proName": "BITSTAMP:ETHUSD", "title": "Ethereum" },
        { "description": "Tesla", "proName": "NASDAQ:TSLA" }
      ],
      "showSymbolLogo": true,
      "colorTheme": "dark",
      "isTransparent": true,
      "displayMode": "adaptive",
      "locale": "en"
    });
    container.current?.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container w-full h-[50px] fixed top-0 z-40 bg-black border-b border-white/10">
      <div className="tradingview-widget-container__widget"></div>
      <div ref={container}></div>
    </div>
  );
}