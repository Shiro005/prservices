import { useState } from 'react';
import { generateInvoice } from '../utils/InvoiceGenerator';

const ClientModal = ({ client, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCall = () => {
    window.open(`tel:${client.mobileNumber}`);
  };

  const handleWhatsApp = () => {
    const message = `Hello ${client.clientName},\n\nThank you for choosing PR Services. Your service "${client.services}" has been completed successfully.\n\nAmount: ₹${client.amount}\nPayment Mode: ${client.paymentMode}\n\nRegards,\nPR Services Team`;
    window.open(`https://wa.me/91${client.mobileNumber}?text=${encodeURIComponent(message)}`);
  };

  const handleGreeting = () => {
    const message = `Dear ${client.clientName},\n\nWe appreciate your business with PR Services. Wishing you all the best!\n\nRegards,\nPR Services Team`;
    window.open(`https://wa.me/91${client.mobileNumber}?text=${encodeURIComponent(message)}`);
  };

  const handleGenerateInvoice = async () => {
    setIsGenerating(true);
    try {
      await generateInvoice(client);
    } catch (error) {
      console.error("Error generating invoice:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Client Details</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Basic Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {client.clientName}</p>
                <p><span className="font-medium">Mobile:</span> {client.mobileNumber}</p>
                <p><span className="font-medium">Date:</span> {client.date}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Service Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Services:</span> {client.services}</p>
                <p><span className="font-medium">Amount:</span> ₹{client.amount}</p>
                <p><span className="font-medium">Amount in Words:</span> {client.amountInWords}</p>
                <p>
                  <span className="font-medium">Payment Mode:</span> 
                  <span className={`inline-block ml-2 px-2 py-1 text-xs rounded-full ${
                    client.paymentMode === 'cash' ? 'bg-green-100 text-green-800' :
                    client.paymentMode === 'upi' ? 'bg-purple-100 text-purple-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {client.paymentMode}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {client.notes && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Notes</h3>
              <p className="bg-gray-50 p-3 rounded border border-gray-200">{client.notes}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCall}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Client
            </button>
            <button
              onClick={handleWhatsApp}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29-12.968c-5.297 0-9.598 4.293-9.598 9.593 0 2.119.711 4.074 1.904 5.66L2.072 20.07l1.634-.475c1.495.43 3.131.657 4.848.657 5.297 0 9.598-4.293 9.598-9.594 0-5.3-4.299-9.593-9.598-9.593" />
              </svg>
              WhatsApp
            </button>
            <button
              onClick={handleGreeting}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              Send Greeting
            </button>
            <button
              onClick={handleGenerateInvoice}
              disabled={isGenerating}
              className={`flex items-center px-4 py-2 rounded-lg transition ${
                isGenerating ? 'bg-gray-400 text-white' : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
              </svg>
              {isGenerating ? 'Generating...' : 'Generate Invoice'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientModal;