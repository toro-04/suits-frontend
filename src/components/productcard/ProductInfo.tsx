interface ProductInfoProps {
  name?: string;
  price?: number;
}

export function ProductInfo({ name, price }: ProductInfoProps) {
  return (
    <div className="px-4 pt-4 space-y-2">
      <h3 className="text-lg font-medium text-gray-900 leading-tight group-hover:text-black transition-colors">
        {name || 'Unknown Product'}
      </h3>
      <p className="text-xl font-semibold text-gray-900">
        ₹{(price || 0).toLocaleString("en-IN")}
      </p>
    </div>
  );
}
