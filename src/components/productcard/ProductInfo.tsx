// ProductInfo.tsx
interface ProductInfoProps {
  name?: string;
  price?: number;
}

export function ProductInfo({ name, price }: ProductInfoProps) {
  return (
    <div className="p-4 space-y-2">
      <h3 className="text-sm font-light text-gray-900 leading-tight group-hover:text-black transition-colors">
        {name || 'Unknown Product'}
      </h3>
      <p className="text-base font-medium text-gray-900">
        ₹{(price || 0).toLocaleString("en-IN")}
      </p>
    </div>
  );
}
