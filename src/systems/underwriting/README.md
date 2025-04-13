# Underwriting System (UWS)

The Underwriting System is the third layer of the Equihome platform, serving as a comprehensive pipeline management and underwriting solution. It collects applications from brokers and the Equihome website, evaluates properties and homeowners for no-monthly-payment loan approval within the green-zone suburbs identified by the Traffic Light System, and generates an optimal portfolio based on inputs from the Portfolio Management System. The system performs due diligence, financial modeling, and risk assessment to ensure each loan aligns with Equihome's investment criteria and financial goals.

## Quick Start

```bash
# Start the development server
npm run dev

# Run tests
npm test
```

## System Overview

The Underwriting System consists of four main modules:

1. **Pipeline Management**: Tracks and ranks deals based on criteria from the Traffic Light System and Portfolio Management System, managing the flow of applications through the evaluation process.

2. **Underwriting & Origination**: Evaluates applications and generates term sheets for homeowners, performing due diligence, financial modeling, and risk assessment.

3. **Sales & Marketing Dashboard**: Facilitates outreach through email marketing campaigns directed at properties in target Traffic Light System zones with the highest metrics, integrating with Mailchimp for campaign management.

4. **Analytics & Reporting**: Tracks performance metrics, generates reports, and provides insights into the underwriting process and portfolio performance.

## Documentation

Comprehensive documentation is available in the [docs](./docs) directory:

- [Architecture Documentation](./docs/architecture/README.md)
- [API Documentation](./docs/api/README.md)
- [Development Documentation](./docs/development/README.md)
- [Module Documentation](./docs/modules/README.md)

## Key Features

### Pipeline Management
- **Deal Tracking**: Track applications from submission to closing
- **Deal Ranking**: Rank deals based on criteria from TFS and PMS
- **Pipeline Analytics**: Analyze pipeline performance and conversion rates
- **Task Management**: Assign and track tasks related to deal processing

### Underwriting & Origination
- **Loan Application Processing**: Comprehensive form for loan application submission
- **Property Evaluation**: Detailed property assessment with PropTrack integration
- **Risk Assessment**: ML-powered risk scoring for loan applications
- **Decision Engine**: Automated approval/rejection based on risk assessment
- **Term Sheet Generation**: Generate term sheets for approved loans
- **Document Management**: Manage documents related to loan applications

### Sales & Marketing Dashboard
- **Target Property Identification**: Identify properties in target TFS zones
- **Email Campaign Management**: Create and manage email marketing campaigns
- **Mailchimp Integration**: Seamless integration with Mailchimp for campaign delivery
- **Campaign Analytics**: Track campaign performance and conversion rates
- **Lead Management**: Track and manage leads generated from campaigns

### Analytics & Reporting
- **Performance Metrics**: Track key performance indicators
- **Custom Reports**: Generate custom reports for different stakeholders
- **Data Visualization**: Visualize data through charts and graphs
- **Export Functionality**: Export data in various formats

## Integration with Other Systems

The Underwriting System integrates with:

- **Traffic Light System**: Consumes green-zone suburbs for loan origination and targeting
- **Portfolio Management System**: Consumes deal rankings and portfolio optimization criteria
- **Mailchimp**: Integrates for email marketing campaign management
- **PropTrack**: Integrates for property valuation and market data
- **Equihome Website**: Receives applications from the pre-application form

## Current Status

- **Version**: Alpha 0.2.0
- **Last Updated**: 2024-04-18
- **Development Status**: In development - Restructuring for comprehensive pipeline management and underwriting solution
