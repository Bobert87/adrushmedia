import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	ChevronUpIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/20/solid";

const SortDirection = {
	NONE: "none",
	ASC: "asc",
	DESC: "desc",
};

export default function DataTable({ headers, data }) {
	const [sortConfig, setSortConfig] = useState({
		key: null,
		direction: SortDirection.NONE,
	});
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);

	const requestSort = (key) => {
		let direction = SortDirection.ASC;
		if (sortConfig.key === key && sortConfig.direction === SortDirection.ASC) {
			direction = SortDirection.DESC;
		}
		setSortConfig({ key, direction });
	};

	const sortedData = () => {
		const sortableData = data?[...data]:[];
		if (sortConfig.direction !== SortDirection.NONE) {
			sortableData.sort((a, b) => {
				const aValue = a[sortConfig.key];
				const bValue = b[sortConfig.key];
				if (aValue === bValue) return 0;
				if (sortConfig.direction === SortDirection.ASC) {
					return aValue < bValue ? -1 : 1;
				}
				if (sortConfig.direction === SortDirection.DESC) {
					return aValue > bValue ? -1 : 1;
				}
			});
		}
		return sortableData;
	};

	const paginatedData = () => {
		const startIndex = (currentPage - 1) * pageSize;
		return sortedData().slice(startIndex, startIndex + pageSize);
	};

	const changePageSize = (size) => {
		setPageSize(size);
		setCurrentPage(1); // Reset to first page when changing page size
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const totalPages = Math.ceil(sortedData().length / pageSize);

	return (		
		<div className="px-4 sm:px-6 lg:px-8">					
			<div className="mt-8 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table className="min-w-full divide-y divide-gray-300">
							<thead>
								<tr>
									{headers.map((header, index) => (
										// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
										<th
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={index}
											scope="col"
											className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 cursor-pointer"
											onClick={() => requestSort(header.key)}
										>
											{header.label}{" "}
											{sortConfig.key === header.key &&
												(sortConfig.direction === SortDirection.ASC ? (
													<ChevronUpIcon className="h-4 w-4 inline-block" />
												) : (
													<ChevronDownIcon className="h-4 w-4 inline-block" />
												))}
										</th>
									))}
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white">
								{paginatedData().map((item, rowIndex) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									<tr key={rowIndex}>
										{headers.map((header, colIndex) => (
											<td
												// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												key={colIndex}
												className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0"
											>
												{renderCell(item[header.key], header, item)}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div className="mt-4 flex justify-between items-center ">
				<div>
					<span className="text-sm text-gray-700">
						Showing {currentPage === 1 ? 1 : (currentPage - 1) * pageSize + 1}{" "}
						to {Math.min(currentPage * pageSize, data?data.length:0)} of {data?data.length:0}{" "}
						entries
					</span>
				</div>
				<div className="mt-4 flex justify-between items-center space-x-10">
					<div className="flex space-x-2 items-center">
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className="p-1 rounded-md bg-gray-200 text-gray-700 font-medium shadow-sm hover:bg-gray-300 focus:outline-none flex items-center"
						>
							<ChevronLeftIcon className="h-4 w-4" />
						</button>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							className="p-1 rounded-md bg-gray-200 text-gray-700 font-medium shadow-sm hover:bg-gray-300 focus:outline-none flex items-center"
						>
							<ChevronRightIcon className="h-4 w-4" />
						</button>
					</div>
					<div className="flex space-x-2 items-center">
						<span className="text-sm text-gray-700">Rows per page:</span>
						<select
							className="rounded-md bg-white border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							value={pageSize}
							onChange={(e) => changePageSize(Number(e.target.value))}
						>
							{[20, 50, 100].map((size) => (
								<option key={size} value={size}>
									{size}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
		</div>
	);
}

const pickPillColor = (value) => {
	switch (value) {
		case "ACTIVE":
			return "bg-green-100 text-green-800";
		case "PAUSED":
			return "bg-orange-100 text-orange-800";
		case "PENDING":
			return "bg-orange-100 text-orange-800";
		case "DRAFT":
			return "bg-blue-100 text-blue-800";
		case "OVERDUE":
			return "bg-red-100 text-red-800";
		case "MAXED_OUT":
			return "bg-purple-100 text-purple-800";
		case "CANCELLED":
			return "bg-red-100 text-red-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

const renderCell = (value, header, row) => {
	const formatDateMY = (dateString) => {
		const options = { month: "long", year: "numeric" };
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", options);
	};

	const formatDateMMDDYYYY = (dateString) => {
		const date = new Date(dateString);
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		const year = date.getFullYear();
		return `${month}/${day}/${year}`;
	};

	const formatDateMMDDYYYYHHmm = (dateString) => {
		const date = new Date(dateString);
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		const year = date.getFullYear();
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		return `${month}/${day}/${year} ${hours}:${minutes}`;
	};

	const dataType = header.dataType;
	const actionKey = header.actionKey;
	const path = actionKey ? `${header.action.replace("{actionKey}",row[actionKey])}` : value;
	switch (dataType) {
		case "money":
			return `$${Number.parseFloat(value).toFixed(2)}`;
        case "duration":
			return `${Number.parseFloat(value)} sec`;
		case "number":
			return Number.parseFloat(value).toFixed(2);
		case "enum":
			return (
				<span
					className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${pickPillColor(
						value,
					)}`}
				>
					{value}
				</span>
			);
		case "dateMY":
			return formatDateMY(value); // Format date as "Month, Year"
		case "dateMMDDYYYY":
			return formatDateMMDDYYYY(value); // Format date as "Month, Year"
		case "dateMMDDYYYYHHmm":
			return formatDateMMDDYYYYHHmm(value); // Format date as "Month, Year"
		case "action":
			return (
				<Link to={path} className="text-indigo-600 hover:text-indigo-900">
					{header.label}
				</Link>
			);
            case "url":
                return (
                    <a href={value} className="text-indigo-600 hover:text-indigo-900">
                        {value}
                    </a>
                );
		default:
			return value;
	}
};