# AliExpress Choice Product Scraper

## Overview

This project is a web application that utilizes Spring Boot for backend development, exposing an endpoint for scraping AliExpress product data. The scraping functionality is implemented using JSoup, a Java library for working with HTML. The frontend is built with React, providing a user-friendly interface to view the scraped data.

## Features

- **Scraping AliExpress Data:**
  - The Spring Boot backend exposes an endpoint for scraping AliExpress product information.
  - JSoup is used for web scraping to retrieve details such as product name, image, amount sold, price, and whether the product qualifies for free shipping or is marked as a choice product.

- **React Frontend:**
  - The React frontend provides a clean and responsive user interface to interact with the scraped product data.
  - Users can view product details, including images, prices, and the number of units sold.

## Prerequisites

- Java Development Kit (JDK) 17 or later
- Node.js and npm
- IDE of your choice (e.g., IntelliJ IDEA, Eclipse)

## Getting Started

### Backend (Spring Boot)

1. **Clone the repository:**

   ```bash
    git clone https://github.com/abdelmottalib/aliexpressChoice-scrapper/
   ```
2. **Open the backend directory in your preferred IDE.**

3. **Build and run the Spring Boot application.**

4. **The backend will be accessible at http://localhost:8080. The endpoint for scraping AliExpress data is /api/v1/scrapper/{product}.**

### Frontend (Next)

 **Clone the repository:**

   ```bash
    cd aliexpressChoice-scrapper/frontend
    npm install
    npm run dev
   ```
  **The frontend will run on http://localhost:3000**
  
  
### Usage

  1. **Access the React frontend in your web browser.**

  2. **Enter the product name in the search bar and click the "Search" button.**

  3. **View the scraped product data, including images, prices, and additional details.**
