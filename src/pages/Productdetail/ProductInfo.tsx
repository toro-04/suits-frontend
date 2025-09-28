// ProductInfo.tsx
interface ProductInfoProps {
  name?: string;
  price?: number;
  description?: string;
}

export function ProductInfo({ name, price, description }: ProductInfoProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl lg:text-4xl font-light tracking-wide text-gray-900 leading-tight">
          {name}
        </h1>
        <p className="text-2xl lg:text-3xl text-gray-900 font-light">
          ₹{price?.toLocaleString("en-IN")}
        </p>
      </div>
      
      {description && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900 uppercase tracking-wider">
            Description
          </h2>
          <p className="text-gray-700 leading-relaxed font-light">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
