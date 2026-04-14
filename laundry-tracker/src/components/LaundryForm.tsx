import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { LaundryRecord, LaundryItem } from '../types';

interface LaundryFormProps {
  initialData: LaundryRecord | null;
  onSave: (data: LaundryRecord) => void;
}

export default function LaundryForm({ initialData, onSave }: LaundryFormProps) {
  const [shirts, setShirts] = useState(0);
  const [pants, setPants] = useState(0);
  const [tshirts, setTshirts] = useState(0);
  const [towels, setTowels] = useState(0);
  const [bedSheets, setBedSheets] = useState(0);
  const [otherItems, setOtherItems] = useState<LaundryItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCount, setNewItemCount] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (initialData) {
      setShirts(initialData.shirts);
      setPants(initialData.pants);
      setTshirts(initialData.tshirts);
      setTowels(initialData.towels);
      setBedSheets(initialData.bedSheets);
      setOtherItems(initialData.otherItems || []);
    }
  }, [initialData]);

  const handleAddOtherItem = () => {
    if (newItemName.trim() && newItemCount > 0) {
      setOtherItems([
        ...otherItems,
        {
          id: crypto.randomUUID(),
          name: newItemName.trim(),
          count: newItemCount,
        },
      ]);
      setNewItemName('');
      setNewItemCount(1);
    }
  };

  const handleRemoveOtherItem = (id: string) => {
    setOtherItems(otherItems.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const record: LaundryRecord = {
      date: initialData?.date || new Date().toISOString(),
      shirts: Math.max(0, shirts),
      pants: Math.max(0, pants),
      tshirts: Math.max(0, tshirts),
      towels: Math.max(0, towels),
      bedSheets: Math.max(0, bedSheets),
      otherItems,
    };

    onSave(record);
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Standard Items</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shirts</label>
            <input
              type="number"
              min="0"
              value={shirts}
              onChange={(e) => setShirts(parseInt(e.target.value) || 0)}
              className={inputClasses}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pants</label>
            <input
              type="number"
              min="0"
              value={pants}
              onChange={(e) => setPants(parseInt(e.target.value) || 0)}
              className={inputClasses}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">T-Shirts</label>
            <input
              type="number"
              min="0"
              value={tshirts}
              onChange={(e) => setTshirts(parseInt(e.target.value) || 0)}
              className={inputClasses}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Towels</label>
            <input
              type="number"
              min="0"
              value={towels}
              onChange={(e) => setTowels(parseInt(e.target.value) || 0)}
              className={inputClasses}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bed Sheets</label>
            <input
              type="number"
              min="0"
              value={bedSheets}
              onChange={(e) => setBedSheets(parseInt(e.target.value) || 0)}
              className={inputClasses}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold text-gray-800">Other Items</h2>
        
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="e.g., Socks, Jackets"
              className={inputClasses}
            />
          </div>
          <div className="w-24">
            <label className="block text-sm font-medium text-gray-700 mb-1">Count</label>
            <input
              type="number"
              min="1"
              value={newItemCount}
              onChange={(e) => setNewItemCount(parseInt(e.target.value) || 1)}
              className={inputClasses}
            />
          </div>
          <button
            type="button"
            onClick={handleAddOtherItem}
            disabled={!newItemName.trim()}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors flex items-center justify-center h-[42px]"
          >
            <Plus size={20} />
          </button>
        </div>

        {otherItems.length > 0 && (
          <ul className="space-y-2 mt-4">
            {otherItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                <span className="font-medium text-gray-700">{item.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 bg-white px-3 py-1 rounded-md border text-sm font-medium">
                    {item.count}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveOtherItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-6 border-t flex items-center justify-between">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Save size={20} />
          Save Laundry Record
        </button>
        
        {showSuccess && (
          <span className="text-green-600 font-medium animate-fade-in flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Saved successfully!
          </span>
        )}
      </div>
    </form>
  );
}
