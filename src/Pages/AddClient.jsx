import { useState, useEffect } from 'react';
import { database, ref, push, set } from '../Database/Firebase';
import { useNavigate } from 'react-router-dom';
import { numberToWords } from '../utils/numberToWords';

const AddClient = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    mobileNumber: '',
    services: '',
    amount: '',
    amountInWords: '',
    paymentMode: 'cash',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.amount) {
      const words = numberToWords(parseInt(formData.amount));
      setFormData(prev => ({ ...prev, amountInWords: words }));
    } else {
      setFormData(prev => ({ ...prev, amountInWords: '' }));
    }
  }, [formData.amount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const newClientRef = push(ref(database, 'clients'));
      await set(newClientRef, {
        ...formData,
        createdAt: new Date().toISOString()
      });
      navigate('/');
    } catch (error) {
      console.error("Error adding client: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Client</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-gray-700 mb-2" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="clientName">
              Client Name
            </label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="mobileNumber">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              pattern="[0-9]{10}"
              maxLength="10"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="services">
              Services
            </label>
            <input
              type="text"
              id="services"
              name="services"
              value={formData.services}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="amount">
              Amount (₹)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="paymentMode">
              Payment Mode
            </label>
            <select
              id="paymentMode"
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
              <option value="card">Card</option>
              <option value="bankTransfer">Bank Transfer</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 mb-2" htmlFor="amountInWords">
              Amount in Words
            </label>
            <input
              type="text"
              id="amountInWords"
              name="amountInWords"
              value={formData.amountInWords}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 mb-2" htmlFor="notes">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-lg text-white font-medium ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition`}
          >
            {isSubmitting ? 'Saving...' : 'Save Client'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClient;