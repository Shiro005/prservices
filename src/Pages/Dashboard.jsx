import { useState, useEffect } from 'react';
import { database, ref, onValue, query, orderByChild, equalTo } from '../Database/Firebase';
import ClientCard from '../Components/ClientCard';
import ClientModal from '../Components/ClientModal';
import { format } from 'date-fns';

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const clientsRef = ref(database, 'clients');
    let clientsQuery = query(clientsRef, orderByChild('date'));

    if (dateFilter) {
      clientsQuery = query(clientsRef, orderByChild('date'), equalTo(dateFilter));
    }

    const unsubscribe = onValue(clientsQuery, (snapshot) => {
      const clientsData = [];
      snapshot.forEach((childSnapshot) => {
        clientsData.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      setClients(clientsData.reverse()); // Newest first
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dateFilter]);

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.mobileNumber.includes(searchTerm);
    return matchesSearch;
  });

  const todayClients = clients.filter(client => 
    client.date === format(new Date(), 'yyyy-MM-dd')
  );

  const openModal = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-gray-600 font-medium">Total Clients</h3>
            <p className="text-3xl font-bold text-blue-600">{clients.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-gray-600 font-medium">Today's Clients</h3>
            <p className="text-3xl font-bold text-green-600">{todayClients.length}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h3 className="text-gray-600 font-medium">Total Revenue</h3>
            <p className="text-3xl font-bold text-purple-600">
              ₹{clients.reduce((sum, client) => sum + parseInt(client.amount || 0), 0)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">Search Clients</label>
            <input
              type="text"
              placeholder="Search by name or mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Filter by Date</label>
            <div className="flex space-x-2">
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {dateFilter && (
                <button
                  onClick={() => setDateFilter('')}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {dateFilter ? `Clients for ${dateFilter}` : 'All Clients'}
        </h2>
        
        {filteredClients.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No clients found {searchTerm ? 'matching your search' : dateFilter ? 'for this date' : ''}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredClients.map(client => (
              <ClientCard 
                key={client.id} 
                client={client} 
                onClick={() => openModal(client)}
              />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && selectedClient && (
        <ClientModal client={selectedClient} onClose={closeModal} />
      )}
    </div>
  );
};

export default Dashboard;