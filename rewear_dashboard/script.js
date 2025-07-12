// Global State Management
const state = {
  user: {
    name: 'Alex Morgan',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    points: 1247,
    pointsEarned: 1450,
    pointsSpent: 203,
    level: 8,
    memberSince: 'March 2023',
    status: 'premium'
  },
  theme: 'light',
  items: [
    {
      id: 1,
      title: 'Vintage Denim Jacket',
      description: 'Classic blue denim jacket in excellent condition',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      category: 'outerwear',
      size: 'M',
      condition: 'excellent',
      status: 'active',
      points: 120,
      uploadDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Floral Summer Dress',
      description: 'Beautiful floral print dress perfect for summer',
      image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      category: 'dresses',
      size: 'S',
      condition: 'good',
      status: 'pending',
      points: 85,
      uploadDate: '2024-01-12'
    },
    {
      id: 3,
      title: 'Black Leather Boots',
      description: 'Stylish ankle boots with minimal wear',
      image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      category: 'accessories',
      size: '8',
      condition: 'excellent',
      status: 'active',
      points: 95,
      uploadDate: '2024-01-10'
    },
    {
      id: 4,
      title: 'Wool Sweater',
      description: 'Cozy cream-colored wool sweater',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      category: 'tops',
      size: 'L',
      condition: 'good',
      status: 'swapped',
      points: 70,
      uploadDate: '2024-01-08'
    },
    {
      id: 5,
      title: 'High-Waisted Jeans',
      description: 'Classic blue jeans with vintage appeal',
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      category: 'bottoms',
      size: 'M',
      condition: 'excellent',
      status: 'active',
      points: 110,
      uploadDate: '2024-01-05'
    },
    {
      id: 6,
      title: 'Silk Scarf',
      description: 'Elegant patterned silk scarf',
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      category: 'accessories',
      size: 'OS',
      condition: 'excellent',
      status: 'active',
      points: 65,
      uploadDate: '2024-01-03'
    }
  ],
  transactions: [
    {
      id: 1,
      type: 'upload',
      title: 'Uploaded Vintage Denim Jacket',
      value: '+120',
      time: '2 hours ago',
      icon: '📤'
    },
    {
      id: 2,
      type: 'swap',
      title: 'Swapped Wool Sweater for Silk Blouse',
      value: '-70',
      time: '1 day ago',
      icon: '🔄'
    },
    {
      id: 3,
      type: 'points',
      title: 'Monthly Bonus Points',
      value: '+50',
      time: '3 days ago',
      icon: '🎁'
    },
    {
      id: 4,
      type: 'upload',
      title: 'Uploaded Floral Summer Dress',
      value: '+85',
      time: '5 days ago',
      icon: '📤'
    },
    {
      id: 5,
      type: 'swap',
      title: 'Received Designer Handbag',
      value: '-150',
      time: '1 week ago',
      icon: '🔄'
    }
  ],
  filters: {
    items: 'all',
    transactions: 'all'
  },
  viewMode: 'grid'
};
// Theme Management
const themeManager = {
  init: () => {
    // Load saved theme or detect system preference
    const savedTheme = localStorage.getItem('rewear-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      state.theme = savedTheme;
    } else {
      state.theme = systemPrefersDark ? 'dark' : 'light';
    }
    
    themeManager.applyTheme(state.theme);
    themeManager.setupSystemThemeListener();
  },
  
  applyTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    state.theme = theme;
    localStorage.setItem('rewear-theme', theme);
    
    // Update theme toggle button state
    const themeToggle = dom.get('#themeToggle');
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', 
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
  },
  
  toggleTheme: () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    themeManager.applyTheme(newTheme);
    
    // Add a subtle animation effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
    
    components.showNotification(
      `Switched to ${newTheme} mode`, 
      'info'
    );
  },
  
  setupSystemThemeListener: () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem('rewear-theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        themeManager.applyTheme(newTheme);
      }
    });
  }
};

// User Management
const userManager = {
  init: () => {
    // Load saved user data or use default
    const savedUser = localStorage.getItem('rewear-user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        state.user = { ...state.user, ...userData };
      } catch (error) {
        console.warn('Failed to load saved user data:', error);
      }
    }
    
    userManager.updateUserDisplay();
  },
  
  updateUserDisplay: () => {
    // Update welcome message
    const welcomeUsername = dom.get('#currentUsername');
    if (welcomeUsername) {
      welcomeUsername.textContent = state.user.name;
    }
    
    // Update profile name
    const profileName = dom.get('.profile-name');
    if (profileName) {
      profileName.textContent = state.user.name;
    }
    
    // Update avatar alt text
    const avatarImg = dom.get('.avatar-img');
    if (avatarImg) {
      avatarImg.alt = `${state.user.name}'s profile picture`;
    }
  },
  
  saveUserData: () => {
    try {
      localStorage.setItem('rewear-user', JSON.stringify(state.user));
    } catch (error) {
      console.warn('Failed to save user data:', error);
    }
  },
  
  updateUserName: (newName) => {
    if (newName && newName.trim()) {
      state.user.name = newName.trim();
      userManager.updateUserDisplay();
      userManager.saveUserData();
      components.showNotification('Profile updated successfully!', 'success');
    }
  }
};

// Utility Functions
const utils = {
  formatNumber: (num) => {
    return new Intl.NumberFormat().format(num);
  },
  
  formatDate: (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  },
  
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  animateValue: (element, start, end, duration = 1000) => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        current = end;
        clearInterval(timer);
      }
      element.textContent = utils.formatNumber(Math.floor(current));
    }, 16);
  },
  
  createRippleEffect: (event, element) => {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple 0.6s linear;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
};

// DOM Manipulation
const dom = {
  get: (selector) => document.querySelector(selector),
  getAll: (selector) => document.querySelectorAll(selector),
  create: (tag, className, textContent) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
  },
  
  addClass: (element, className) => element.classList.add(className),
  removeClass: (element, className) => element.classList.remove(className),
  toggleClass: (element, className) => element.classList.toggle(className),
  
  show: (element) => {
    element.style.display = 'block';
    element.style.opacity = '0';
    setTimeout(() => element.style.opacity = '1', 10);
  },
  
  hide: (element) => {
    element.style.opacity = '0';
    setTimeout(() => element.style.display = 'none', 250);
  }
};

// Components
const components = {
  renderItemCard: (item) => {
    return `
      <div class="item-card" data-item-id="${item.id}">
        <div class="item-image">
          <img src="${item.image}" alt="${item.title}" class="lazy-load" loading="lazy">
          <div class="item-status ${item.status}">${item.status}</div>
        </div>
        <div class="item-info">
          <h4 class="item-title">${item.title}</h4>
          <div class="item-meta">
            <span>${item.size} • ${item.condition}</span>
            <span class="item-points">${item.points} pts</span>
          </div>
        </div>
      </div>
    `;
  },
  
  renderTransactionItem: (transaction) => {
    const isPositive = transaction.value.startsWith('+');
    return `
      <div class="transaction-item" data-transaction-id="${transaction.id}">
        <div class="transaction-icon ${transaction.type}">
          ${transaction.icon}
        </div>
        <div class="transaction-info">
          <div class="transaction-title">${transaction.title}</div>
          <div class="transaction-time">${transaction.time}</div>
        </div>
        <div class="transaction-value ${isPositive ? 'positive' : 'negative'}">
          ${transaction.value}
        </div>
      </div>
    `;
  },
  
  showNotification: (message, type = 'success') => {
    const notification = dom.create('div', `notification notification-${type}`);
    notification.innerHTML = `
      <div class="notification-content">
        <span>${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => dom.addClass(notification, 'show'), 100);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      dom.removeClass(notification, 'show');
      setTimeout(() => notification.remove(), 300);
    });
    
    setTimeout(() => {
      dom.removeClass(notification, 'show');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  },
  
  showLoadingState: (element, text = 'Loading...') => {
    const loadingHTML = `
      <div class="loading-state">
        <div class="loading-spinner"></div>
        <p>${text}</p>
      </div>
    `;
    element.innerHTML = loadingHTML;
  },
  
  showErrorState: (element, message = 'Something went wrong') => {
    const errorHTML = `
      <div class="error-state">
        <div class="error-icon">⚠️</div>
        <p>${message}</p>
        <button class="retry-btn">Try Again</button>
      </div>
    `;
    element.innerHTML = errorHTML;
  }
};

// Event Handlers
const handlers = {
  handleNavToggle: () => {
    const navMenu = dom.get('#navMenu');
    dom.toggleClass(navMenu, 'active');
  },
  
  handleItemFilter: (filter) => {
    state.filters.items = filter;
    handlers.renderItems();
  },
  
  handleTransactionFilter: (filter) => {
    state.filters.transactions = filter;
    handlers.renderTransactions();
  },
  
  handleViewToggle: () => {
    state.viewMode = state.viewMode === 'grid' ? 'list' : 'grid';
    const itemsGrid = dom.get('#itemsGrid');
    dom.toggleClass(itemsGrid, 'list-view');
    handlers.renderItems();
  },
  
  handleUploadModal: (show = true) => {
    const modal = dom.get('#uploadModal');
    if (show) {
      dom.addClass(modal, 'active');
      document.body.style.overflow = 'hidden';
    } else {
      dom.removeClass(modal, 'active');
      document.body.style.overflow = '';
    }
  },
  
  handleUploadForm: (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const newItem = {
      id: Date.now(),
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      size: formData.get('size'),
      condition: formData.get('condition'),
      status: 'active',
      points: Math.floor(Math.random() * 100) + 50,
      uploadDate: new Date().toISOString().split('T')[0],
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    };
    
    // Simulate upload delay
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Uploading...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      state.items.unshift(newItem);
      state.user.points += newItem.points;
      state.user.pointsEarned += newItem.points;
      
      // Add transaction
      state.transactions.unshift({
        id: Date.now(),
        type: 'upload',
        title: `Uploaded ${newItem.title}`,
        value: `+${newItem.points}`,
        time: 'Just now',
        icon: '📤'
      });
      
      handlers.updatePointsDisplay();
      handlers.renderItems();
      handlers.renderTransactions();
      handlers.handleUploadModal(false);
      userManager.saveUserData();
      
      components.showNotification('Item uploaded successfully!');
      
      // Reset form
      event.target.reset();
      submitBtn.textContent = 'Upload Item';
      submitBtn.disabled = false;
    }, 2000);
  },
  
  handleItemClick: (itemId) => {
    const item = state.items.find(i => i.id === parseInt(itemId));
    if (item) {
      components.showNotification(`Viewing ${item.title}`, 'info');
    }
  },
  
  handleThemeToggle: () => {
    themeManager.toggleTheme();
  },
  
  handleProfileEdit: () => {
    const newName = prompt('Enter your new name:', state.user.name);
    if (newName !== null) {
      userManager.updateUserName(newName);
    }
  },
  
  handleQuickAction: (action) => {
    switch (action) {
      case 'upload':
        handlers.handleUploadModal(true);
        break;
      case 'browse':
        components.showNotification('Redirecting to browse page...', 'info');
        break;
      case 'swap':
        components.showNotification('Starting new swap...', 'info');
        break;
      case 'messages':
        components.showNotification('Opening messages...', 'info');
        break;
    }
  },
  
  renderItems: () => {
    const itemsGrid = dom.get('#itemsGrid');
    let filteredItems = state.items;
    
    if (state.filters.items !== 'all') {
      filteredItems = state.items.filter(item => item.status === state.filters.items);
    }
    
    if (filteredItems.length === 0) {
      itemsGrid.innerHTML = '<div class="empty-state">No items found</div>';
      return;
    }
    
    const itemsHTML = filteredItems.map(components.renderItemCard).join('');
    itemsGrid.innerHTML = itemsHTML;
    
    // Add click handlers
    itemsGrid.querySelectorAll('.item-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const itemId = card.dataset.itemId;
        handlers.handleItemClick(itemId);
        utils.createRippleEffect(e, card);
      });
    });
    
    // Lazy load images
    handlers.setupLazyLoading();
  },
  
  renderTransactions: () => {
    const transactionsList = dom.get('#transactionsList');
    let filteredTransactions = state.transactions;
    
    if (state.filters.transactions !== 'all') {
      filteredTransactions = state.transactions.filter(t => t.type === state.filters.transactions);
    }
    
    if (filteredTransactions.length === 0) {
      transactionsList.innerHTML = '<div class="empty-state">No transactions found</div>';
      return;
    }
    
    const transactionsHTML = filteredTransactions.map(components.renderTransactionItem).join('');
    transactionsList.innerHTML = transactionsHTML;
  },
  
  updatePointsDisplay: () => {
    const pointsNumber = dom.get('.points-number');
    const earnedAmount = dom.get('.points-item.earned .points-amount');
    const spentAmount = dom.get('.points-item.spent .points-amount');
    
    if (pointsNumber) {
      utils.animateValue(pointsNumber, 0, state.user.points);
    }
    
    if (earnedAmount) {
      earnedAmount.textContent = `+${utils.formatNumber(state.user.pointsEarned)}`;
    }
    
    if (spentAmount) {
      spentAmount.textContent = `-${utils.formatNumber(state.user.pointsSpent)}`;
    }
  },
  
  setupLazyLoading: () => {
    const images = dom.getAll('.lazy-load');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          dom.addClass(img, 'loaded');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  },
  
  handleResize: utils.debounce(() => {
    // Handle responsive changes
    const isMobile = window.innerWidth <= 768;
    const navMenu = dom.get('#navMenu');
    
    if (!isMobile) {
      dom.removeClass(navMenu, 'active');
    }
  }, 250),
  
  handleKeyboardNavigation: (event) => {
    // ESC key to close modals
    if (event.key === 'Escape') {
      const activeModal = dom.get('.modal-overlay.active');
      if (activeModal) {
        handlers.handleUploadModal(false);
      }
    }
    
    // Ctrl/Cmd + D to toggle theme
    if ((event.ctrlKey || event.metaKey) && event.key === 'd') {
      event.preventDefault();
      handlers.handleThemeToggle();
    }
  }
};

// Error Handling
const errorHandler = {
  handleError: (error, context = 'Unknown') => {
    console.error(`Error in ${context}:`, error);
    components.showNotification('Something went wrong. Please try again.', 'error');
  },
  
  handleNetworkError: () => {
    components.showNotification('Network error. Please check your connection.', 'error');
  },
  
  handleValidationError: (message) => {
    components.showNotification(message, 'warning');
  }
};

// Initialization
const app = {
  init: () => {
    try {
      themeManager.init();
      userManager.init();
      app.setupEventListeners();
      app.loadInitialData();
      app.setupAccessibility();
      
      // Hide loading overlay
      setTimeout(() => {
        const loadingOverlay = dom.get('#loadingOverlay');
        dom.addClass(loadingOverlay, 'hidden');
      }, 1500);
      
    } catch (error) {
      errorHandler.handleError(error, 'App initialization');
    }
  },
  
  setupEventListeners: () => {
    // Navigation
    const navToggle = dom.get('#navToggle');
    if (navToggle) {
      navToggle.addEventListener('click', handlers.handleNavToggle);
    }
    
    // Theme Toggle
    const themeToggle = dom.get('#themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', handlers.handleThemeToggle);
    }
    
    // Profile Edit (click on profile name)
    const profileName = dom.get('.profile-name');
    if (profileName) {
      profileName.addEventListener('click', handlers.handleProfileEdit);
      profileName.style.cursor = 'pointer';
      profileName.title = 'Click to edit your name';
    }
    
    // Quick Actions
    const uploadBtn = dom.get('#uploadBtn');
    const browseBtn = dom.get('#browseBtn');
    const swapBtn = dom.get('#swapBtn');
    const messagesBtn = dom.get('#messagesBtn');
    
    if (uploadBtn) uploadBtn.addEventListener('click', () => handlers.handleQuickAction('upload'));
    if (browseBtn) browseBtn.addEventListener('click', () => handlers.handleQuickAction('browse'));
    if (swapBtn) swapBtn.addEventListener('click', () => handlers.handleQuickAction('swap'));
    if (messagesBtn) messagesBtn.addEventListener('click', () => handlers.handleQuickAction('messages'));
    
    // Filters
    const itemsFilter = dom.get('#itemsFilter');
    const transactionFilter = dom.get('#transactionFilter');
    
    if (itemsFilter) {
      itemsFilter.addEventListener('change', (e) => handlers.handleItemFilter(e.target.value));
    }
    
    if (transactionFilter) {
      transactionFilter.addEventListener('change', (e) => handlers.handleTransactionFilter(e.target.value));
    }
    
    // View Toggle
    const viewToggle = dom.get('#viewToggle');
    if (viewToggle) {
      viewToggle.addEventListener('click', handlers.handleViewToggle);
    }
    
    // Modal Controls
    const closeUploadModal = dom.get('#closeUploadModal');
    const cancelUpload = dom.get('#cancelUpload');
    const uploadForm = dom.get('#uploadForm');
    
    if (closeUploadModal) {
      closeUploadModal.addEventListener('click', () => handlers.handleUploadModal(false));
    }
    
    if (cancelUpload) {
      cancelUpload.addEventListener('click', () => handlers.handleUploadModal(false));
    }
    
    if (uploadForm) {
      uploadForm.addEventListener('submit', handlers.handleUploadForm);
    }
    
    // Load More
    const loadMoreItems = dom.get('#loadMoreItems');
    if (loadMoreItems) {
      loadMoreItems.addEventListener('click', () => {
        components.showNotification('Loading more items...', 'info');
      });
    }
    
    // Global Events
    window.addEventListener('resize', handlers.handleResize);
    window.addEventListener('keydown', handlers.handleKeyboardNavigation);
    
    // Click outside modal to close
    const uploadModal = dom.get('#uploadModal');
    if (uploadModal) {
      uploadModal.addEventListener('click', (e) => {
        if (e.target === uploadModal) {
          handlers.handleUploadModal(false);
        }
      });
    }
    
    // Ripple effects for buttons
    dom.getAll('.action-btn, .btn-primary, .btn-secondary').forEach(btn => {
      btn.addEventListener('click', (e) => {
        utils.createRippleEffect(e, btn);
      });
    });
  },
  
  loadInitialData: () => {
    try {
      handlers.updatePointsDisplay();
      handlers.renderItems();
      handlers.renderTransactions();
      handlers.setupLazyLoading();
    } catch (error) {
      errorHandler.handleError(error, 'Loading initial data');
    }
  },
  
  setupAccessibility: () => {
    // Add ARIA labels and roles where needed
    const actionBtns = dom.getAll('.action-btn');
    actionBtns.forEach(btn => {
      btn.setAttribute('role', 'button');
      btn.setAttribute('tabindex', '0');
    });
    
    // Keyboard navigation for custom buttons
    dom.getAll('[role="button"]').forEach(btn => {
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }
};

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: var(--space-3);
    box-shadow: var(--shadow-large);
    z-index: var(--z-modal);
    transform: translateX(100%);
    opacity: 0;
    transition: all var(--transition-base);
    max-width: 300px;
  }
  
  .notification.show {
    transform: translateX(0);
    opacity: 1;
  }
  
  .notification-success {
    border-left: 4px solid var(--success-color);
  }
  
  .notification-error {
    border-left: 4px solid var(--error-color);
  }
  
  .notification-warning {
    border-left: 4px solid var(--warning-color);
  }
  
  .notification-info {
    border-left: 4px solid var(--info-color);
  }
  
  .notification-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-2);
  }
  
  .notification-close {
    background: none;
    border: none;
    font-size: var(--font-size-lg);
    cursor: pointer;
    color: var(--text-secondary);
    padding: 0;
    line-height: 1;
  }
  
  .empty-state {
    text-align: center;
    padding: var(--space-6);
    color: var(--text-secondary);
    font-style: italic;
  }
  
  .loading-state, .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-6);
    text-align: center;
    color: var(--text-secondary);
  }
  
  .error-icon {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--space-2);
  }
  
  .retry-btn {
    margin-top: var(--space-2);
    padding: var(--space-1) var(--space-3);
    background: var(--primary-color);
    color: var(--text-inverse);
    border: none;
    border-radius: var(--border-radius-base);
    cursor: pointer;
    transition: var(--transition-fast);
  }
  
  .retry-btn:hover {
    background: var(--primary-dark);
  }
`;

document.head.appendChild(style);

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', app.init);
} else {
  app.init();
}

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Service worker would be registered here for offline functionality
    console.log('App loaded - Service worker support detected');
  });
}

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { state, utils, components, handlers, errorHandler, app, themeManager, userManager };
}