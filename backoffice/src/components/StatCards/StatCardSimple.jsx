
export default function StatCardSimple(props) {
	return (
		
				<div
					key={props.item.name}
					className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
				>
					<dt className="truncate text-sm font-medium text-gray-500">
						{props.item.name}
					</dt>
					<dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
						{props.item.stat}
					</dd>
				</div>		
	);
}
