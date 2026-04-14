import React, { useState } from 'react';
import { Calendar, Shirt, Edit2, RotateCcw, CheckCircle2, AlertTriangle } from 'lucide-react';
import { LaundryRecord } from '../types';

interface DashboardProps {
  record: LaundryRecord;
  onEdit: () => void;
  onReset: () => void;
}

const ItemRow: React.FC<{ label: string; count: number }> = ({ label, count }) => {
  if (count === 0) return null;
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-full text-sm">
        {count}
      </span>
    </div>
  );
};

export default function Dashboard({ record, onEdit, onReset }: DashboardProps) {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const standardItemsTotal = 
    record.shirts + 
    record.pants + 
    record.tshirts + 
    record.towels + 
    record.bedSheets;
    
  const otherItemsTotal = record.otherItems.reduce((sum, item) => sum + item.count, 0);
  const totalItems = standardItemsTotal + otherItemsTotal;

  const formattedDate = new Date(record.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-blue-600 p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shirt className="text-blue-200" />
            Current Laundry
          </h2>
          <p className="text-blue-100 flex items-center gap-2 mt-1 text-sm">
            <Calendar size={16} />
            Submitted on {formattedDate}
          </p>
        </div>
        <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm text-center">
          <div className="text-3xl font-bold">{totalItems}</div>
          <div className="text-blue-100 text-xs font-medium uppercase tracking-wider">Total Items</div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <CheckCircle2 size={20} className="text-green-500" />
            Item Breakdown
          </h3>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <ItemRow label="Shirts" count={record.shirts} />
            <ItemRow label="Pants" count={record.pants} />
            <ItemRow label="T-Shirts" count={record.tshirts} />
            <ItemRow label="Towels" count={record.towels} />
            <ItemRow label="Bed Sheets" count={record.bedSheets} />
            
            {record.otherItems.map(item => (
              <ItemRow key={item.id} label={item.name} count={item.count} />
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Edit2 size={18} />
            Edit Record
          </button>
          
          {showConfirmReset ? (
            <div className="flex-1 flex gap-2">
              <button
                onClick={onReset}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                <AlertTriangle size={16} />
                Confirm Clear
              </button>
              <button
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 flex items-center justify-center px-3 py-2.5 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirmReset(true)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors"
            >
              <RotateCcw size={18} />
              Start New Cycle
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
