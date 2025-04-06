import { createStore } from 'vuex';
import { getCacheItem, setCacheItem } from '../services/cacheService';

// Create a plugin to persist and rehydrate the store
const persistedStatePlugin = (store) => {
  // Rehydrate store from localStorage on initialization
  const cachedState = getCacheItem('vuex_state');
  if (cachedState) {
    store.replaceState({
      ...store.state,
      ...cachedState
    });
  }

  // Subscribe to store mutations to cache state changes
  store.subscribe((mutation, state) => {
    // Cache the state (excluding any sensitive data)
    const stateToPersist = {
      // Only include the modules/state that should be persisted
      portfolio: state.portfolio,
      team: state.team,
      testimonials: state.testimonials,
      // Don't include user-specific or sensitive data
    };
    
    // Cache for 1 day (24 hours)
    setCacheItem('vuex_state', stateToPersist, 24 * 60 * 60 * 1000);
  });
};

// Create the store
export default createStore({
  state: {
    // Global app state
    isLoading: false,
    lastUpdated: null,
    
    // Portfolio state
    portfolio: {
      items: [],
      filteredItems: [],
      selectedClient: null,
      isLoaded: false
    },
    
    // Team state
    team: {
      members: [],
      isLoaded: false
    },
    
    // Testimonials state
    testimonials: {
      items: [],
      isLoaded: false
    }
  },
  
  getters: {
    // Portfolio getters
    getPortfolioItems: (state) => state.portfolio.items,
    getFilteredPortfolioItems: (state) => state.portfolio.filteredItems,
    getSelectedClient: (state) => state.portfolio.selectedClient,
    isPortfolioLoaded: (state) => state.portfolio.isLoaded,
    
    // Team getters
    getTeamMembers: (state) => state.team.members,
    isTeamLoaded: (state) => state.team.isLoaded,
    
    // Testimonials getters
    getTestimonials: (state) => state.testimonials.items,
    isTestimonialsLoaded: (state) => state.testimonials.isLoaded
  },
  
  mutations: {
    // Global mutations
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_LAST_UPDATED(state) {
      state.lastUpdated = new Date().toISOString();
    },
    
    // Portfolio mutations
    SET_PORTFOLIO_ITEMS(state, items) {
      state.portfolio.items = items;
      state.portfolio.isLoaded = true;
    },
    SET_FILTERED_PORTFOLIO_ITEMS(state, items) {
      state.portfolio.filteredItems = items;
    },
    SET_SELECTED_CLIENT(state, client) {
      state.portfolio.selectedClient = client;
    },
    
    // Team mutations
    SET_TEAM_MEMBERS(state, members) {
      state.team.members = members;
      state.team.isLoaded = true;
    },
    
    // Testimonials mutations
    SET_TESTIMONIALS(state, items) {
      state.testimonials.items = items;
      state.testimonials.isLoaded = true;
    }
  },
  
  actions: {
    // Portfolio actions
    async fetchPortfolioItems({ commit, state }) {
      // If already loaded, don't fetch again
      if (state.portfolio.isLoaded && state.portfolio.items.length > 0) {
        return state.portfolio.items;
      }
      
      commit('SET_LOADING', true);
      
      try {
        // In a real app, this would be an API call
        // For now, we'll use the static data
        const { portfolioItems } = await import('../data/portfolioItems');
        
        commit('SET_PORTFOLIO_ITEMS', portfolioItems);
        commit('SET_FILTERED_PORTFOLIO_ITEMS', portfolioItems);
        commit('SET_LAST_UPDATED');
        
        return portfolioItems;
      } catch (error) {
        console.error('Error fetching portfolio items:', error);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    
    filterPortfolioItems({ commit, state }, clientId) {
      if (!clientId) {
        // If no client is selected, show all items
        commit('SET_FILTERED_PORTFOLIO_ITEMS', state.portfolio.items);
        commit('SET_SELECTED_CLIENT', null);
      } else {
        // Filter items by client
        const filteredItems = state.portfolio.items.filter(item => 
          item.clientId === clientId
        );
        
        commit('SET_FILTERED_PORTFOLIO_ITEMS', filteredItems);
        
        // Find the client object
        const { clients } = require('../data/clients');
        const selectedClient = clients.find(client => client.id === clientId);
        commit('SET_SELECTED_CLIENT', selectedClient);
      }
    },
    
    // Team actions
    async fetchTeamMembers({ commit, state }) {
      // If already loaded, don't fetch again
      if (state.team.isLoaded && state.team.members.length > 0) {
        return state.team.members;
      }
      
      commit('SET_LOADING', true);
      
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        const teamMembers = [
          { id: 1, name: 'Tobi', image: '../../assets/images/team-tobi.jpg' },
          { id: 2, name: 'Kirsten', image: '../../assets/images/team-kirsten.jpg' },
          { id: 3, name: 'Jan', image: '../../assets/images/team-jan.jpg' },
          { id: 4, name: 'Melissa', image: '../../assets/images/team-melissa.jpg' },
          { id: 5, name: 'Anh', image: '../../assets/images/team-anh.jpg' },
          { id: 6, name: 'Rena', image: '../../assets/images/team-rena-omiros.jpg' }
        ];
        
        commit('SET_TEAM_MEMBERS', teamMembers);
        commit('SET_LAST_UPDATED');
        
        return teamMembers;
      } catch (error) {
        console.error('Error fetching team members:', error);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    
    // Testimonials actions
    async fetchTestimonials({ commit, state }) {
      // If already loaded, don't fetch again
      if (state.testimonials.isLoaded && state.testimonials.items.length > 0) {
        return state.testimonials.items;
      }
      
      commit('SET_LOADING', true);
      
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        const testimonials = [
          {
            id: 1,
            text: '„Unser langjähriger Agenturpartner TAKTZEIT versteht es, sich auf unsere vielfältigen Anforderungen agil einzustellen und sich mit uns kontinuierlich weiter-zuentwickeln. Das Agenturteam überzeugt durch sein herausragendes Servicelevel und verbindet zuverlässig kreative Ideen mit tatsächlicher Umsetzbarkeit. Die tiefgreifende Expertise von TAKTZEIT im Bereich Sales Activation und der kompetente Umgang mit unseren Marken erfüllen unsere hohen Ansprüche an einen modernen Kreativ-Dienstleister."',
            author: 'Julia J. Köhnen | Head of Marketing, Central Europe | DACH & Nordics Bridgestone Europe NV/SA',
            logo: '../../assets/images/bridgestone-logo.svg'
          },
          {
            id: 2,
            text: '„Unser langjähriger Agenturpartner TAKTZEIT versteht es, sich auf unsere vielfältigen Anforderungen agil einzustellen und sich mit uns kontinuierlich weiter-zuentwickeln. Das Agenturteam überzeugt durch sein herausragendes Servicelevel und verbindet zuverlässig kreative Ideen mit tatsächlicher Umsetzbarkeit. Die tiefgreifende Expertise von TAKTZEIT im Bereich Sales Activation und der kompetente Umgang mit unseren Marken erfüllen unsere hohen Ansprüche an einen modernen Kreativ-Dienstleister."',
            author: 'Michael Schmidt | Marketing Director | Beispiel GmbH',
            logo: '../../assets/images/bridgestone-logo.svg'
          }
        ];
        
        commit('SET_TESTIMONIALS', testimonials);
        commit('SET_LAST_UPDATED');
        
        return testimonials;
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  
  // Register plugins
  plugins: [persistedStatePlugin]
});
