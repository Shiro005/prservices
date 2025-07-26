import React from 'react'

const ClientCard = ({ client, onClick }) => {
  return (
    <div 
      className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{client.clientName}</h3>
          <p className="text-gray-600">{client.mobileNumber}</p>
          <p className="text-gray-600">{client.services}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-blue-600">₹{client.amount}</p>
          <p className="text-sm text-gray-500">{client.date}</p>
          <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
            client.paymentMode === 'cash' ? 'bg-green-100 text-green-800' :
            client.paymentMode === 'upi' ? 'bg-purple-100 text-purple-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {client.paymentMode}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;