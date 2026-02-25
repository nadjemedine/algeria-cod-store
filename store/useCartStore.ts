import { create } from 'zustand';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: any;
  selectedSize?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string, size?: string) => void;
  updateQuantity: (id: string, size: string | undefined, delta: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find(
        (i) => i._id === item._id && i.selectedSize === item.selectedSize
      );
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i._id === item._id && i.selectedSize === item.selectedSize
              ? { ...i, quantity: i.quantity + (item.quantity || 1) }
              : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: item.quantity || 1 }] };
    });
  },
  removeItem: (id, size) => {
    set((state) => ({
      items: state.items.filter((i) => !(i._id === id && i.selectedSize === size)),
    }));
  },
  updateQuantity: (id, size, delta) => {
    set((state) => ({
      items: state.items.map((i) => {
        if (i._id === id && i.selectedSize === size) {
          const newQuantity = i.quantity + delta;
          return { ...i, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return i;
      }),
    }));
  },
  clearCart: () => set({ items: [] }),
  totalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
