import ProductFilters from './components/ProductFilters';
import StockStatus from './components/StockStatus';
import Pagination from './components/StockTable/Pagination';
import StockTable from './components/StockTable/StockTable';

const StockManager = () => {
	return (
		<>
			<StockStatus />
			<ProductFilters />
			<StockTable />
			<Pagination />
		</>
	);
};
export default StockManager;
