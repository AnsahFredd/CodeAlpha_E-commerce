import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { type CartItemProps } from '../interface';

const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) => {
  return (
    <div className="flex flex-col gap-6 rounded-lg bg-white p-6 shadow-sm sm:flex-row">
      <Link to={`/product/${item.id}`} className="shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="h-24 w-24 rounded-lg object-cover transition-opacity hover:opacity-75"
        />
      </Link>

      <div className="flex-1">
        <Link to={`/product/${item.id}`}>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 transition-colors hover:text-indigo-600">
            {item.name}
          </h3>
        </Link>
        <p className="mb-2 text-sm text-gray-500">{item.category}</p>
        <p className="mb-4 text-lg font-bold text-gray-900">
          ${item.price.toFixed(2)}
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDecrease(item.id, item.quantity)}
              disabled={item.quantity <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-300 transition-colors hover:border-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center text-lg font-semibold">
              {item.quantity}
            </span>
            <button
              onClick={() => onIncrease(item.id, item.quantity, item.stock)}
              disabled={item.quantity >= item.stock}
              className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-300 transition-colors hover:border-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          {item.quantity >= item.stock && (
            <span className="text-sm text-amber-600">Max stockReached</span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <p className="text-xl font-bold text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => onRemove(item.id)}
          className="flex items-center gap-2 text-red-600 transition-colors hover:text-red-700"
        >
          <Trash2 className="h-5 w-5" />
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
