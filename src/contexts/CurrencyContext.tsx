import React, { createContext, useContext, useMemo } from "react";
import {
  CurrencyCode,
  getUserCurrency,
  formatPriceForUser as formatPriceForUserLib,
} from "@/lib/currency";

interface CurrencyContextType {
  currency: CurrencyCode;
  formatPrice: (priceStr: string) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useMemo(() => {
    const currency = getUserCurrency();
    return {
      currency,
      formatPrice: (priceStr: string) => formatPriceForUserLib(priceStr, currency),
    };
  }, []);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
