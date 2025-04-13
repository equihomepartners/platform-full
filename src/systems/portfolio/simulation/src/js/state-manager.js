/**
 * State Manager for Equihome Fund Modeling
 * Handles state persistence across pages and maintains data consistency
 */

// Define the default state
const defaultState = {
  // Fund Settings
  fundSettings: {
    // Fund Information
    fund_name: 'Equihome Fund I',
    fund_size: 100000000,
    fund_term: 10,
    fund_type: 'closed',
    vintage_year: new Date().getFullYear(),
    time_horizon: 10,

    // Fee Structure
    management_fee_rate: 0.02,
    hurdle_rate: 0.06,
    performance_fee_rate: 0.20,
    origination_fee_rate: 0.03,
    simple_interest_rate: 0.05,
    gp_investment_percentage: 0.05,

    // Capital Calls
    capital_call_schedule: 'custom',
    initial_investment: 25000000,
    call1_date: 0,
    call1_amount: 25000000,
    call2_date: 3,
    call2_amount: 25000000,
    call3_date: 6,
    call3_amount: 25000000,
    call4_date: 9,
    call4_amount: 25000000,

    // Loan Parameters
    average_property_value: 500000,
    average_ltv: 0.5,
    max_ltv: 0.75,
    green_zone_allocation: 0.6,
    orange_zone_allocation: 0.3,
    red_zone_allocation: 0.1,
    early_exit_probability: 0.1,
    average_exit_year: 5,
    exit_year_std_dev: 1.5,
    reinvestment_cap_year: 5
  },

  // Portfolio Generation
  portfolioGeneration: {
    // Portfolio Parameters
    num_loans: 400,
    ltv_variance: 0.1,
    property_value_variance: 0.2,
    appreciation_rate_green: 0.05,
    appreciation_rate_orange: 0.03,
    appreciation_rate_red: 0.01,

    // Generated Portfolio
    portfolio: null,
    portfolioGenerated: false,
    generationDate: null
  },

  // Fund Returns
  fundReturns: {
    // Return Metrics
    irr: 0.1432,
    gross_irr: 0.1875,
    equity_multiple: 2.4,
    moic: 2.4,
    total_investment: 100000000,
    total_return: 240000000,
    net_profit: 140000000,
    roi: 1.4,

    // GP/LP Split
    hurdle_amount: 60000000,
    gp_carried_interest: 16000000,
    lp_return: 204000000,
    gp_return: 36000000,

    // Cash Flows
    cashFlows: [],

    // Calculated
    calculationComplete: false,
    calculationDate: null
  },

  // User Journey
  userJourney: {
    fundSettingsComplete: false,
    portfolioGenerationComplete: false,
    fundOverviewViewed: false,
    gpEconomicsViewed: false,
    lpEconomicsViewed: false
  }
};

// Initialize state from localStorage or use default
let state = JSON.parse(localStorage.getItem('equihomeFundState')) || defaultState;

/**
 * Get the current state
 * @returns {Object} The current state
 */
function getState() {
  return state;
}

/**
 * Get a specific section of the state
 * @param {string} section - The section to get (fundSettings, portfolioGeneration, fundReturns, userJourney)
 * @returns {Object} The requested section of state
 */
function getStateSection(section) {
  return state[section];
}

/**
 * Update the state
 * @param {string} section - The section to update (fundSettings, portfolioGeneration, fundReturns, userJourney)
 * @param {Object} newData - The new data to merge with the existing state
 */
function updateState(section, newData) {
  // Merge the new data with the existing section
  state[section] = { ...state[section], ...newData };

  // Save to localStorage
  saveState();

  // Dispatch a custom event to notify listeners
  const event = new CustomEvent('stateChanged', {
    detail: { section, newData }
  });
  document.dispatchEvent(event);
}

/**
 * Reset a section of the state to default
 * @param {string} section - The section to reset (fundSettings, portfolioGeneration, fundReturns, userJourney)
 */
function resetStateSection(section) {
  state[section] = { ...defaultState[section] };
  saveState();

  // Dispatch a custom event to notify listeners
  const event = new CustomEvent('stateReset', {
    detail: { section }
  });
  document.dispatchEvent(event);
}

/**
 * Reset the entire state to default
 */
function resetState() {
  state = { ...defaultState };
  saveState();

  // Dispatch a custom event to notify listeners
  const event = new CustomEvent('stateReset', {
    detail: { fullReset: true }
  });
  document.dispatchEvent(event);
}

/**
 * Save the state to localStorage
 */
function saveState() {
  localStorage.setItem('equihomeFundState', JSON.stringify(state));
}

/**
 * Check if a section is dirty (has unsaved changes)
 * @param {string} section - The section to check
 * @param {Object} currentData - The current data to compare with the state
 * @returns {boolean} True if the section is dirty
 */
function isSectionDirty(section, currentData) {
  const sectionState = state[section];

  // Compare each property in currentData with the state
  for (const key in currentData) {
    if (sectionState[key] !== currentData[key]) {
      return true;
    }
  }

  return false;
}

/**
 * Mark a step in the user journey as complete
 * @param {string} step - The step to mark as complete
 */
function completeJourneyStep(step) {
  const userJourney = { ...state.userJourney };
  userJourney[step] = true;
  updateState('userJourney', userJourney);
}

/**
 * Check if a step in the user journey is complete
 * @param {string} step - The step to check
 * @returns {boolean} True if the step is complete
 */
function isJourneyStepComplete(step) {
  return state.userJourney[step];
}

/**
 * Get the next step in the user journey
 * @returns {string} The next step in the user journey
 */
function getNextJourneyStep() {
  const { userJourney } = state;

  if (!userJourney.fundSettingsComplete) {
    return 'fundSettings';
  }

  if (!userJourney.portfolioGenerationComplete) {
    return 'portfolioGeneration';
  }

  if (!userJourney.fundOverviewViewed) {
    return 'fundOverview';
  }

  if (!userJourney.gpEconomicsViewed) {
    return 'gpEconomics';
  }

  if (!userJourney.lpEconomicsViewed) {
    return 'lpEconomics';
  }

  return 'complete';
}

/**
 * Calculate derived values based on the current state
 * @returns {Object} Derived values
 */
function calculateDerivedValues() {
  const { fundSettings } = state;

  // Calculate GP and LP investment amounts
  const gpInvestment = fundSettings.fund_size * fundSettings.gp_investment_percentage;
  const lpInvestment = fundSettings.fund_size - gpInvestment;

  // Calculate average loan size
  const avgLoanSize = fundSettings.average_property_value * fundSettings.average_ltv;

  // Calculate estimated number of loans
  const estimatedLoans = Math.floor(fundSettings.fund_size / avgLoanSize);

  // Calculate extended fund term based on reinvestment cap
  const extendedFundTerm = fundSettings.reinvestment_cap_year + fundSettings.fund_term;

  return {
    gpInvestment,
    lpInvestment,
    avgLoanSize,
    estimatedLoans,
    extendedFundTerm
  };
}

// Export the state manager functions
window.StateManager = {
  getState,
  getStateSection,
  updateState,
  resetStateSection,
  resetState,
  isSectionDirty,
  completeJourneyStep,
  isJourneyStepComplete,
  getNextJourneyStep,
  calculateDerivedValues
};
