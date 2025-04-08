const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    // Add a catch for loading errors
    beforeEnter: (to, from, next) => {
      try {
        next();
      } catch (error) {
        console.error('Error loading route:', error);
        // Fallback to a simple redirect
        window.location.href = to.fullPath;
      }
    }
  },
  {
    path: '/karriere',
    name: 'Karriere',
    component: () => import('../views/KarriereView.vue')
  },
  {
    path: '/employer-branding',
    name: 'EmployerBranding',
    component: () => import('../views/EmployerBrandingView.vue')
  },
  {
    path: '/packaging',
    name: 'Packaging',
    component: () => import('../views/PackagingView.vue')
  },
  {
    path: '/automotive',
    name: 'Automotive',
    component: () => import('../views/AutomotiveView.vue')
  },
  {
    path: '/components',
    name: 'Components',
    component: () => import('../views/ComponentsView.vue')
  },
  {
    path: '/impressum',
    name: 'Impressum',
    component: () => import('../views/ImpressumView.vue')
  },
  {
    path: '/agb',
    name: 'AGB',
    component: () => import('../views/AGBView.vue')
  },
  {
    path: '/datenschutz',
    name: 'Datenschutz',
    component: () => import('../views/DatenschutzView.vue')
  },
  {
    path: '/email-test',
    name: 'EmailTest',
    component: () => import('../views/EmailTestView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue')
  }
]

export default routes