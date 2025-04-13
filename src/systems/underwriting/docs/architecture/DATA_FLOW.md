# Underwriting System Data Flow

## Overview

This document outlines the data flow within the Underwriting System and its integration with other systems in the Equihome platform.

## Data Sources

The Underwriting System integrates with the following data sources:

### External Data Sources

- **PropTrack API**: Property valuation data
- **CoreLogic API**: Property data and market analytics
- **Credit Bureau API**: Borrower credit data
- **ABS Census Demographics**: Population and demographic information
- **NSW Land Registry Services**: Property ownership and sales data

### Internal Data Sources

- **Traffic Light System**: Green-zone suburbs and risk assessments
- **Portfolio Management System**: Deal rankings and portfolio metrics

## Data Processing Pipeline

The data processing pipeline consists of the following stages:

### 1. Data Collection

- **Loan Application Form**: Collects borrower information, property details, and loan requirements
- **Traffic Light System API**: Retrieves green-zone suburbs and risk assessments
- **Portfolio Management System API**: Retrieves deal rankings and portfolio metrics
- **PropTrack API**: Retrieves property valuation data
- **CoreLogic API**: Retrieves property data and market analytics
- **Credit Bureau API**: Retrieves borrower credit data

### 2. Data Validation

- **Form Validation**: Validates loan application form data
- **Property Validation**: Validates property details against PropTrack and CoreLogic data
- **Borrower Validation**: Validates borrower information against Credit Bureau data
- **Zone Validation**: Validates property location against Traffic Light System green zones

### 3. Risk Assessment

- **Property Risk**: Assesses property risk based on location, condition, and market trends
- **Borrower Risk**: Assesses borrower risk based on credit score, income, and employment
- **Market Risk**: Assesses market risk based on Traffic Light System risk assessments
- **Portfolio Risk**: Assesses portfolio risk based on Portfolio Management System metrics

### 4. Financial Modeling

- **Loan Metrics**: Calculates loan metrics such as LTV, CLTV, and debt-to-income ratio
- **Return Projections**: Projects returns based on interest, appreciation, and exit timeframe
- **Portfolio Impact**: Models the impact of the loan on the portfolio using Portfolio Management System data
- **Stress Testing**: Stress tests the loan under various market scenarios

### 5. Decision Making

- **Rule-Based Decisions**: Applies business rules to loan application data
- **ML-Based Decisions**: Applies ML models to risk assessment data
- **Portfolio-Based Decisions**: Applies Portfolio Management System deal rankings
- **Manual Override**: Allows for manual override of automated decisions

### 6. Result Presentation

- **Decision Summary**: Presents loan approval decision with detailed rationale
- **Risk Analysis**: Presents risk analysis with risk factors and mitigation strategies
- **Financial Analysis**: Presents financial analysis with return projections and portfolio impact
- **Property Report**: Presents property report with valuation, market trends, and comparable properties

## Integration Data Flow

### Integration with Traffic Light System

1. **Traffic Light System to Underwriting System**:
   - Green-zone suburbs for loan origination
   - Risk assessments for specific suburbs
   - Property value forecasts
   - Market cycle positions

2. **Underwriting System to Traffic Light System**:
   - Feedback on loan evaluations
   - Approval rate statistics
   - Default rate statistics

### Integration with Portfolio Management System

1. **Portfolio Management System to Underwriting System**:
   - Deal rankings for loan prioritization
   - Portfolio allocation recommendations
   - Risk exposure limits
   - Target return metrics

2. **Underwriting System to Portfolio Management System**:
   - Approved loans for portfolio inclusion
   - Loan application statistics
   - Property valuation data
   - Risk assessment data

## Data Storage

The Underwriting System stores data in the following locations:

- **Supabase Database**: Loan applications, property data, borrower data, and decision data
- **Supabase Storage**: Property documents, borrower documents, and decision documents
- **In-Memory Cache**: Temporary data for processing and decision making
