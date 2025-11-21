import { create } from 'zustand';

export const useTicketStore = create((set, get) => ({
  tickets: [],
  selectedTicket: null,
  filters: {
    status: 'all',
    priority: 'all',
    category: 'all',
    assignedTo: 'all',
    search: '',
  },
  
  setTickets: (tickets) => set({ tickets }),
  
  addTicket: (ticket) => set((state) => ({
    tickets: [ticket, ...state.tickets],
  })),
  
  updateTicket: (ticketId, updates) => set((state) => ({
    tickets: state.tickets.map((ticket) =>
      ticket.id === ticketId ? { ...ticket, ...updates } : ticket
    ),
    selectedTicket:
      state.selectedTicket?.id === ticketId
        ? { ...state.selectedTicket, ...updates }
        : state.selectedTicket,
  })),
  
  deleteTicket: (ticketId) => set((state) => ({
    tickets: state.tickets.filter((ticket) => ticket.id !== ticketId),
  })),
  
  setSelectedTicket: (ticket) => set({ selectedTicket: ticket }),
  
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters },
  })),
  
  resetFilters: () => set({
    filters: {
      status: 'all',
      priority: 'all',
      category: 'all',
      assignedTo: 'all',
      search: '',
    },
  }),
  
  getFilteredTickets: () => {
    const { tickets, filters } = get();
    
    return tickets.filter((ticket) => {
      const matchesStatus = filters.status === 'all' || ticket.status === filters.status;
      const matchesPriority = filters.priority === 'all' || ticket.priority === filters.priority;
      const matchesCategory = filters.category === 'all' || ticket.category === filters.category;
      const matchesAssignedTo = filters.assignedTo === 'all' || ticket.assignedTo?.id === filters.assignedTo;
      const matchesSearch = !filters.search || 
        ticket.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        ticket.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        ticket.ticketNumber.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesStatus && matchesPriority && matchesCategory && matchesAssignedTo && matchesSearch;
    });
  },
}));
