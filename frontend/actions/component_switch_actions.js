export const BUY = "BUY";
export const SELL = "SELL";

export const TRANSACTIONS = "TRANSACTIONS";
export const PORTFOLIO = "PORTFOLIO";

export const buy = () => ({
    type: BUY,
    action: "buy"
});

export const sell = () => ({
    type: SELL,
    action: "sell"
});

export const transactions = () => ({
    type: TRANSACTIONS,
});

export const portfolio = () => ({
    type: PORTFOLIO,
});