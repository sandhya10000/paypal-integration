# PayPal Payment Integration (React + Node.js)

This project demonstrates PayPal payment gateway integration using React.js for the frontend and Node.js with Express for the backend.

The application allows users to make secure payments using PayPal's REST API. It includes order creation, payment approval, and payment capture functionality.

## Tech Stack

Frontend

- React.js
- Axios
- PayPal React SDK

Backend

- Node.js
- Express.js
- PayPal REST API

## Features

- PayPal checkout button integration
- Create payment order from backend
- Capture payment after approval
- Secure client-server communication
- Sandbox testing environment

## Project Structure

client/

- React frontend

server/

- Node.js backend APIs

## Payment Flow

User clicks PayPal button  
↓  
React calls backend API to create order  
↓  
User approves payment on PayPal  
↓  
Backend captures payment  
↓  
Payment success response

## Installation

### Backend
