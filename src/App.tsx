import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WashingMachine } from 'lucide-react';
import LaundryForm from './components/LaundryForm';
import Dashboard from './components/Dashboard';
import { LaundryRecord } from './types';

export default function App() {
  const [record, setRecord] = useState<LaundryRecord | null>(null);
  const [isEditing, setIsEditing] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('laundryRecord');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setRecord(parsed);
        setIsEditing(false);
      } catch (e) {
        console.error("Failed to parse saved laundry record", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const handleSave = (newRecord: LaundryRecord) => {
    setRecord(newRecord);
    localStorage.setItem('laundryRecord', JSON.stringify(newRecord));
    setIsEditing(false);
  };

  const handleReset = () => {
    setRecord(null);
    localStorage.removeItem('laundryRecord');
    setIsEditing(true);
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <WashingMachine size={24} />
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Hostel Laundry Tracker</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {record ? 'Edit Laundry Record' : 'New Laundry Record'}
                </h2>
                <p className="text-gray-600 mt-1">
                  Enter the count of items you are giving to the laundry service.
                </p>
              </div>
              <LaundryForm initialData={record} onSave={handleSave} />
              
              {record && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-gray-500 hover:text-gray-800 font-medium transition-colors"
                  >
                    Cancel Editing
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Dashboard 
                record={record!} 
                onEdit={() => setIsEditing(true)} 
                onReset={handleReset} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
