import { getStockExchanges } from "../../api/stockExchangeApi";
import StockExchange from "../../components/stockExchanges/StockExchange";

export const get = async (setStockExchanges, refresh) => {
  var response = await getStockExchanges();
  var result = [];
  if (response.error !== true) {
    result = response.message.map((data) => {
      return <StockExchange key={data.id} data={data} refresh={refresh} />;
    });
    setStockExchanges(result);
  }
};
