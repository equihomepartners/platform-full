# Underwriting System Overview

## Introduction

The Underwriting System is the third layer of the Equihome platform, serving as a comprehensive pipeline management and underwriting solution. It collects applications from brokers and the Equihome website, evaluates properties and homeowners for no-monthly-payment loan approval within the green-zone suburbs identified by the Traffic Light System, and generates an optimal portfolio based on inputs from the Portfolio Management System. The system performs due diligence, financial modeling, and risk assessment to ensure each loan aligns with Equihome's investment criteria and financial goals.

## System Purpose

The Underwriting System serves the following purposes:

1. **Pipeline Management**: Track and rank deals based on criteria from the Traffic Light System and Portfolio Management System
2. **Underwriting & Origination**: Evaluate applications and generate term sheets for homeowners
3. **Sales & Marketing**: Facilitate outreach through email marketing campaigns directed at properties in target Traffic Light System zones
4. **Analytics & Reporting**: Track performance metrics, generate reports, and provide insights into the underwriting process

## System Architecture

The Underwriting System consists of four main modules:

1. **Pipeline Management Module**: Manages the flow of applications through the evaluation process
2. **Underwriting & Origination Module**: Evaluates applications and generates term sheets
3. **Sales & Marketing Dashboard Module**: Facilitates outreach through email marketing campaigns
4. **Analytics & Reporting Module**: Tracks performance metrics and generates reports

Each module is composed of the following layers:

1. **Frontend**: React-based user interface with forms, dashboards, and visualizations
2. **Backend API**: RESTful API services for data processing and business logic
3. **Data Storage**: Supabase database for storing application data, property data, and more
4. **Integration Layer**: Services for integrating with other systems

### Frontend Architecture

The frontend is built with:

- **React**: For component-based UI development
- **TypeScript**: For type-safe code
- **Tailwind CSS**: For styling
- **Chart.js**: For data visualization
- **React Router**: For navigation between modules
- **Zustand**: For state management

### Backend Architecture

The backend is built with:

- **Node.js**: For API services
- **Express**: For RESTful API endpoints
- **Supabase**: For database, authentication, and storage
- **TypeScript**: For type-safe code
- **OpenAI API**: For ML-powered risk assessment and decision making

### Data Storage Architecture

The data storage is built with:

- **Supabase**: PostgreSQL database for storing application data, property data, and more
- **Supabase Storage**: For storing documents and files
- **Supabase Auth**: For authentication and authorization

### Integration Architecture

The integration layer is built with:

- **RESTful APIs**: For integrating with other systems
- **Webhooks**: For event-driven integration
- **Message Queue**: For asynchronous communication

## Module Architecture

### Pipeline Management Module

The Pipeline Management module consists of the following components:

1. **Deal Tracking**: Track applications from submission to closing
2. **Deal Ranking**: Rank deals based on criteria from TFS and PMS
3. **Pipeline Analytics**: Analyze pipeline performance and conversion rates
4. **Task Management**: Assign and track tasks related to deal processing

### Underwriting & Origination Module

The Underwriting & Origination module consists of the following components:

1. **Loan Application Processing**: Process loan applications
2. **Property Evaluation**: Evaluate properties with PropTrack integration
3. **Risk Assessment**: Assess risk using ML-powered scoring
4. **Decision Engine**: Make loan approval decisions
5. **Term Sheet Generation**: Generate term sheets for approved loans
6. **Document Management**: Manage documents related to loan applications

### Sales & Marketing Dashboard Module

The Sales & Marketing Dashboard module consists of the following components:

1. **Target Property Identification**: Identify properties in target TFS zones
2. **Email Campaign Management**: Create and manage email marketing campaigns
3. **Mailchimp Integration**: Integrate with Mailchimp for campaign delivery
4. **Campaign Analytics**: Track campaign performance and conversion rates
5. **Lead Management**: Track and manage leads generated from campaigns

### Analytics & Reporting Module

The Analytics & Reporting module consists of the following components:

1. **Performance Metrics**: Track key performance indicators
2. **Custom Reports**: Generate custom reports for different stakeholders
3. **Data Visualization**: Visualize data through charts and graphs
4. **Export Functionality**: Export data in various formats

## Data Flow

The data flow within the Underwriting System follows these steps:

1. **Application Submission**: Applications are submitted through brokers or the Equihome website
2. **Pipeline Management**: Applications are tracked and ranked in the pipeline
3. **Underwriting & Origination**: Applications are evaluated and term sheets are generated
4. **Sales & Marketing**: Marketing campaigns are directed at properties in target TFS zones
5. **Analytics & Reporting**: Performance metrics are tracked and reports are generated

## Integration with Other Systems

The Underwriting System integrates with:

1. **Traffic Light System**: Consumes green-zone suburbs for loan origination and targeting
2. **Portfolio Management System**: Consumes deal rankings and portfolio optimization criteria
3. **Mailchimp**: Integrates for email marketing campaign management
4. **PropTrack**: Integrates for property valuation and market data
5. **Equihome Website**: Receives applications from the pre-application form

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Chart.js, React Router, Zustand
- **Backend**: Node.js, Express, Supabase, TypeScript, OpenAI API
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Integration**: RESTful APIs, Webhooks, Message Queue
- **Email Marketing**: Mailchimp API
- **Property Data**: PropTrack API
