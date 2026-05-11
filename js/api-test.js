// WebCrest API Testing - Implementation File
// Use this file for testing payment integrations and API calls

// ============================================
// TEST CONFIGURATION
// ============================================

const API_CONFIG = {
  TEST_MODE: true,
  
  // Flutterwave Test Keys
  FLUTTERWAVE: {
    publicKey: "FLWPUBK_TEST-0000000000000000000000000000000000000000",
    secretKey: "FLWSECK_TEST-0000000000000000000000000000000000000000",
    baseUrl: "https://api.flutterwave.com/v3"
  },

  // Test Data
  TEST_CARDS: {
    visaSuccess: {
      number: "4187427415564246",
      cvv: "828",
      description: "Visa - Success"
    },
    visaDeclined: {
      number: "4111111111111111",
      cvv: "856",
      description: "Visa - Declined"
    },
    mastercardSuccess: {
      number: "5438898014560229",
      cvv: "381",
      description: "Mastercard - Success"
    },
    mastercardDeclined: {
      number: "5425233010103291",
      cvv: "001",
      description: "Mastercard - Declined"
    },
    verveCard: {
      number: "5061020000000000001",
      cvv: "123",
      description: "Verve - Success"
    }
  },

  TEST_MOBILE_MONEY: {
    mtnSuccess: "0556414145",
    mtnFailed: "0554445555"
  },

  TEST_USSD: {
    success: "*901*01#",
    declined: "*901*02#"
  }
};

// ============================================
// TEST PAYMENT PROCESSING
// ============================================

class WebCrestAPITester {
  constructor(config = API_CONFIG) {
    this.config = config;
    this.logs = [];
  }

  /**
   * Test successful payment transaction
   */
  async testSuccessfulPayment() {
    const testData = {
      card: this.config.TEST_CARDS.visaSuccess,
      amount: 5000,
      currency: "NGN",
      email: "test@webcrest.com",
      name: "Test User",
      phone: "08000000000"
    };

    return this.processPayment(testData);
  }

  /**
   * Test declined payment transaction
   */
  async testDeclinedPayment() {
    const testData = {
      card: this.config.TEST_CARDS.visaDeclined,
      amount: 5000,
      currency: "NGN",
      email: "declined@webcrest.com",
      name: "Declined User",
      phone: "08000000001"
    };

    return this.processPayment(testData);
  }

  /**
   * Process payment (mock implementation for testing)
   */
  async processPayment(data) {
    console.log("🔄 Processing payment...", data);

    const transaction = {
      id: Math.random().toString(36).substr(2, 9),
      txRef: `WEBCREST-TEST-${Date.now()}`,
      amount: data.amount,
      currency: data.currency,
      customer: {
        email: data.email,
        name: data.name,
        phone_number: data.phone
      },
      cardDetails: {
        last4: data.card.number.slice(-4),
        type: this.getCardType(data.card.number)
      },
      status: this.determinePaymentStatus(data.card),
      timestamp: new Date().toISOString()
    };

    this.logs.push(transaction);
    return transaction;
  }

  /**
   * Determine card type
   */
  getCardType(cardNumber) {
    if (cardNumber.startsWith('4')) return 'Visa';
    if (cardNumber.startsWith('5')) return 'Mastercard';
    if (cardNumber.startsWith('506102')) return 'Verve';
    return 'Unknown';
  }

  /**
   * Determine payment status based on test card
   */
  determinePaymentStatus(card) {
    if (card.number === this.config.TEST_CARDS.visaSuccess.number) {
      return 'successful';
    }
    if (card.number === this.config.TEST_CARDS.mastercardSuccess.number) {
      return 'successful';
    }
    if (card.number === this.config.TEST_CARDS.verveCard.number) {
      return 'successful';
    }
    return 'failed';
  }

  /**
   * Test form validation
   */
  validateQuoteForm(formData) {
    const errors = [];

    if (!formData.name || formData.name.trim().length < 2) {
      errors.push("❌ Name must be at least 2 characters");
    }

    if (!formData.email || !this.isValidEmail(formData.email)) {
      errors.push("❌ Please enter a valid email address");
    }

    if (!formData.service) {
      errors.push("❌ Please select a service");
    }

    if (!formData.message || formData.message.trim().length < 10) {
      errors.push("❌ Message must be at least 10 characters");
    }

    if (errors.length === 0) {
      console.log("✅ Form validation passed!");
      return { valid: true };
    }

    return { valid: false, errors };
  }

  /**
   * Validate email format
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Generate test transaction report
   */
  generateTestReport() {
    return {
      totalTransactions: this.logs.length,
      successful: this.logs.filter(t => t.status === 'successful').length,
      failed: this.logs.filter(t => t.status === 'failed').length,
      transactions: this.logs,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Clear test logs
   */
  clearLogs() {
    this.logs = [];
    console.log("🗑️ Test logs cleared");
  }

  /**
   * Log all transactions
   */
  printLogs() {
    console.table(this.logs);
  }
}

// ============================================
// INITIALIZE TESTER & RUN TESTS
// ============================================

// Create tester instance
const tester = new WebCrestAPITester();

// Example test functions to run in browser console
function runAllTests() {
  console.log("🚀 Starting API Tests...\n");

  // Test 1: Successful Payment
  console.log("Test 1: Successful Payment");
  const successResult = tester.testSuccessfulPayment();
  console.log(successResult);
  console.log("---\n");

  // Test 2: Declined Payment
  console.log("Test 2: Declined Payment");
  const declinedResult = tester.testDeclinedPayment();
  console.log(declinedResult);
  console.log("---\n");

  // Test 3: Form Validation
  console.log("Test 3: Form Validation (Valid)");
  const validationPass = tester.validateQuoteForm({
    name: "John Doe",
    email: "john@example.com",
    service: "Web Development",
    message: "I would like a quote for a new website"
  });
  console.log(validationPass);
  console.log("---\n");

  console.log("Test 4: Form Validation (Invalid)");
  const validationFail = tester.validateQuoteForm({
    name: "J",
    email: "invalid-email",
    service: "",
    message: "Hi"
  });
  console.log(validationFail);
  console.log("---\n");

  // Print all transactions
  console.log("📊 Transaction Report:");
  console.log(tester.generateTestReport());
  console.log("\n");

  // Print detailed logs
  console.log("📝 Detailed Logs:");
  tester.printLogs();
}

// Test URLs for reference
const TEST_URLS = {
  flutterwaveCheckout: "https://checkout.flutterwave.com/v3/hosted/",
  flutterwaveAPI: "https://api.flutterwave.com/v3",
  webhookTest: "http://localhost:3000/api/payment/webhook",
  paymentStatus: "https://api.flutterwave.com/v3/transactions/{id}/verify"
};

// ============================================
// HOW TO USE THIS FILE
// ============================================

/*
  
1. In Browser Console, run:
   - runAllTests() - Run all test scenarios
   - tester.testSuccessfulPayment() - Test successful payment
   - tester.testDeclinedPayment() - Test failed payment
   - tester.validateQuoteForm({...}) - Test form validation
   - tester.generateTestReport() - Get test summary
   - tester.printLogs() - Print transaction logs
   - tester.clearLogs() - Clear all logs

2. Test Cards:
   - Use the TEST_CARDS object for different payment scenarios
   - All test cards work with any future expiry and CVV

3. Integration:
   - Copy this to your browser console
   - Or include as a script tag in your HTML for development

4. API Endpoints:
   - See TEST_URLS object for Flutterwave endpoints
   - Replace placeholders with actual transaction IDs when testing

*/

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WebCrestAPITester, API_CONFIG, TEST_URLS };
}
