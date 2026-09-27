# SP Co., LTD. — Inventory Management System (Stockflow)

A modern, full-stack **Central Inventory Intelligence and Stock Control** platform built with Next.js 14 (App Router), TypeScript, Tailwind CSS, SQLite (`better-sqlite3`), and Chart.js.

Designed for high-throughput warehouse logistics, component tracking, purchase/sales order fulfillment, vendor relationship management, and financial valuation reporting.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features & Modules](#-key-features--modules)
  - [1. Executive Dashboard](#1-executive-dashboard)
  - [2. Master Inventory Directory](#2-master-inventory-directory)
  - [3. Warehouse Spatial Allocation & Bins](#3-warehouse-spatial-allocation--bins)
  - [4. Order Fulfillment Workflows](#4-order-fulfillment-workflows)
  - [5. Suppliers Directory](#5-suppliers-directory)
  - [6. Valuation Reports & Analytics](#6-valuation-reports--analytics)
- [Tech Stack](#-tech-stack)
- [Project Architecture & File Tree](#-project-architecture--file-tree)
- [Database Schema & Models](#-database-schema--models)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup & Seeding](#database-setup--seeding)
  - [Running the Application](#running-the-application)
- [Scripts Reference](#-scripts-reference)
- [Future Enhancements](#-future-enhancements)

---

## 🌟 Overview

The **SP Co., LTD. Inventory Management System** (also known as *Stockflow / Nexus Stock*) delivers end-to-end visibility into physical warehouse operations. It replaces manual spreadsheets with real-time stock level monitoring, automated low-stock warnings, vendor lead-time tracking, spatial bin occupancy visualization, and automated order fulfillment pipelines.

---

## 🚀 Key Features & Modules

### 1. Executive Dashboard (`/dashboard`)
- **Real-Time KPI Cards**:
  - Total Stock Valuation (dynamically calculated from unit prices and stock quantities).
  - Low Stock & Critical Shortage Alerts.
  - Active Inbound POs & Outbound Shipments.
  - Warehouse Capacity & Utilization meter.
- **Visual Analytics**:
  - **30-Day Movement Trends**: Interactive line chart showing inbound vs outbound inventory velocity.
  - **Category Breakdown**: Doughnut chart showing stock distribution across Hydraulics, Electronics, Machinery Parts, and Fasteners.
- **Quick Operations Bar**: One-click shortcuts for adding SKUs, quick barcode scans, generating POs, and exporting valuation reports.
- **Live Activity Feed**: Real-time notifications for threshold breaches, order dispatch, and receiving confirmations.

### 2. Master Inventory Directory (`/inventory`)
- **Full Item Catalog**:
  - SKU code, product title, category, physical bin location, on-hand stock, reorder threshold, unit price, and total value.
- **Dynamic Search & Filtering**:
  - Live text search by item name or SKU.
  - Category filters (*Electronics*, *Machinery Parts*, *Hydraulics*, *Fasteners & Hardware*).
  - Status filters (*In Stock*, *Low Stock Alert*, *Out of Stock*).
- **Status Badges**:
  - **In Stock** (healthy quantity > reorder threshold)
  - **Low Stock** (stock $\le$ reorder threshold)
  - **Out of Stock** (0 units on hand)
- **Data Export**: Export inventory records as CSV.

### 3. Warehouse Spatial Allocation & Bins (`/warehouse`)
- **Visual Rack & Bin Layout**:
  - Multi-zone warehouse architecture (*Zone A: High-Velocity Heavy Parts*, *Zone B: High-Density Micro-Components*, *Zone C: Bulk Fluid & Dangerous Goods*).
  - Bin-level utilization gauges showing fill percentage and capacity limits.
  - Color-coded occupancy indicators (Safe, Warning, Critical capacity).

### 4. Order Fulfillment Workflows (`/orders`)
- **Dual Pipeline Tracking**:
  - **Purchase Orders (PO)**: Inbound vendor replenishments.
  - **Sales Orders (SO)**: Outbound customer distributions.
- **Order Lifecycle States**: Draft, Pending Approval, In Transit, Received / Delivered.
- **Progress Tracking**: Step-by-step progress indicators and estimated time of arrival (ETA) monitoring.

### 5. Suppliers Directory (`/suppliers`)
- **Vendor Relationship Management**:
  - Catalog of active and pending suppliers.
  - Primary contact details, email addresses, and phone numbers.
  - Searchable supplier list with fast communication triggers.

### 6. Valuation Reports & Analytics (`/reports`)
- **Financial Stock Valuation**:
  - Gross asset valuation aggregated across all categories.
  - Critical stock shortage audit count.
  - Category-by-category valuation distribution and asset density breakdown.

---

## 🛠 Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Framework** | [Next.js 14.1.0](https://nextjs.org/) | React 18 App Router, Server & Client Components |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Full-stack strict type safety |
| **Styling** | [Tailwind CSS 3.3](https://tailwindcss.com/) | Responsive UI with custom color palettes |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent SVG icon set |
| **Charts** | [Chart.js 4.4](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/) | High-performance canvas data visualizations |
| **Database** | [SQLite](https://www.sqlite.org/) via [`better-sqlite3`](https://github.com/WiseLibs/better-sqlite3) | Fast, zero-config local relational database (`dev.db`) |
| **ORM / Schema** | [Prisma](https://www.prisma.io/) | Schema definition & client models |
| **Utilities** | `clsx`, `tailwind-merge` | Conditional class name composition |

---

## 📁 Project Architecture & File Tree

```text
Inventory-Management-System/
├── dev.db                             # Local SQLite database
├── next.config.mjs                    # Next.js configuration
├── package.json                       # Project metadata & dependencies
├── postcss.config.js                  # PostCSS plugins
├── seed.js                            # Standalone DB seed script (Node.js)
├── tailwind.config.ts                 # Tailwind design tokens & themes
├── tsconfig.json                      # TypeScript configuration
├── prisma/
│   └── schema.prisma                  # Prisma ORM data schema
└── src/
    ├── app/                           # Next.js App Router
    │   ├── layout.tsx                 # Root HTML layout and Inter font
    │   ├── page.tsx                   # Redirects "/" to "/dashboard"
    │   ├── globals.css                # Global Tailwind directives
    │   ├── loading.tsx                # Fallback loading skeleton
    │   ├── not-found.tsx              # Custom 404 page
    │   ├── error.tsx                  # Error boundary handler
    │   ├── dashboard/
    │   │   └── page.tsx               # Analytics & Executive dashboard
    │   ├── inventory/
    │   │   └── page.tsx               # Inventory table & filtering
    │   ├── orders/
    │   │   └── page.tsx               # Purchase & sales order workflows
    │   ├── reports/
    │   │   └── page.tsx               # Financial stock valuation reports
    │   ├── suppliers/
    │   │   └── page.tsx               # Supplier directory
    │   ├── warehouse/
    │   │   └── page.tsx               # Spatial warehouse & bin layout
    │   └── api/                       # REST API route handlers
    │       ├── inventory/route.ts     # GET / POST inventory items
    │       ├── orders/route.ts        # GET / POST orders
    │       ├── suppliers/route.ts     # GET / POST suppliers
    │       └── warehouse/route.ts     # GET warehouse zones & bins
    ├── components/
    │   └── layout/
    │       ├── Header.tsx             # Top navigation, facility picker & notifications
    │       ├── Sidebar.tsx            # Navigation sidebar with badges & mobile drawer
    │       └── MainLayout.tsx         # Unified layout shell wrapper
    ├── lib/
    │   ├── constants.ts               # Default mock data
    │   ├── db.ts                      # better-sqlite3 DB connection & DDL initialization
    │   └── seed.ts                    # TypeScript DB seed runner
    └── types/
        └── inventory.ts               # Core TypeScript interface definitions
```

---

## 🗄 Database Schema & Models

The database uses SQLite (`dev.db`) initialized and managed via `src/lib/db.ts` and Prisma (`prisma/schema.prisma`).

### `inventory_items` (`InventoryItem`)
| Field | Type | Description |
|---|---|---|
| `id` | `INTEGER` (PK) | Auto-increment primary key |
| `sku` | `TEXT` (UNIQUE) | Unique Stock Keeping Unit code (e.g. `HYD-4012`) |
| `name` | `TEXT` | Human-readable item name |
| `category` | `TEXT` | Category (`Hydraulics`, `Electronics`, etc.) |
| `bin` | `TEXT` | Physical warehouse bin code (e.g. `Bin C-301`) |
| `stock` | `INTEGER` | Current quantity on hand |
| `reorder` | `INTEGER` | Minimum reorder threshold |
| `price` | `REAL` | Unit purchase/sale price |
| `supplier` | `TEXT` | Primary vendor / supplier name |

### `orders` (`Order`)
| Field | Type | Description |
|---|---|---|
| `id` | `INTEGER` (PK) | Auto-increment primary key |
| `orderId` | `TEXT` (UNIQUE) | Unique order identifier (e.g. `PO-2026-8821`) |
| `type` | `TEXT` | Order classification (`po` = Purchase Order, `so` = Sales Order) |
| `supplier` | `TEXT` | Vendor or destination account |
| `itemName` | `TEXT` | Line item description |
| `details` | `TEXT` | Units and financial summary |
| `status` | `TEXT` | Current status (e.g., `In Transit`, `Pending`) |
| `eta` | `TEXT` | Delivery estimate |
| `progress` | `INTEGER` | Milestone stage indicator (1 to 4) |

### `suppliers` (`Supplier`)
| Field | Type | Description |
|---|---|---|
| `id` | `INTEGER` (PK) | Auto-increment primary key |
| `name` | `TEXT` (UNIQUE) | Registered vendor company name |
| `contact` | `TEXT` | Point-of-contact person |
| `email` | `TEXT` | Vendor contact email |
| `phone` | `TEXT` | Vendor phone number |
| `status` | `TEXT` | Relationship state (`Active` / `Pending`) |

### `warehouse_zones` & `warehouse_bins`
Tracks visual warehouse physical layout:
- **`warehouse_zones`**: `id`, `name`, `description`, `capacity`, `capacityColor`
- **`warehouse_bins`**: `id`, `zoneId` (FK), `name`, `value`, `percentage`, `color`

---

## 🔌 API Endpoints

All endpoints are built using Next.js Route Handlers:

| Endpoint | Method | Description |
|---|---|---|
| `/api/inventory` | `GET` | Fetches all inventory items ordered by `id DESC`. |
| `/api/inventory` | `POST` | Creates a new inventory item (`sku`, `name`, `category`, `bin`, `stock`, `reorder`, `price`, `supplier`). |
| `/api/orders` | `GET` | Fetches all orders ordered by `id DESC`. |
| `/api/orders` | `POST` | Creates a new PO or SO order (`orderId`, `type`, `supplier`, `itemName`, `details`, `status`, `eta`, `progress`). |
| `/api/suppliers` | `GET` | Fetches all vendors ordered by `id DESC`. |
| `/api/suppliers` | `POST` | Adds a new supplier record (`name`, `contact`, `email`, `phone`, `status`). |
| `/api/warehouse` | `GET` | Returns an aggregated hierarchy of warehouse zones and their associated bins. |

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: v18.17.0 or higher
- **npm**: v9+ (or `pnpm` / `yarn`)

### Installation

1. Navigate to the project directory:
   ```bash
   cd Inventory-Management-System
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Database Setup & Seeding

The SQLite database (`dev.db`) auto-creates tables on first run via `src/lib/db.ts`. To populate initial mock data (items, orders, suppliers, warehouse layout):

```bash
node seed.js
```

### Running the Application

1. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser. The app will automatically redirect to `/dashboard`.

2. **Build for Production**:
   ```bash
   npm run build
   npm run start
   ```

3. **Code Linting**:
   ```bash
   npm run lint
   ```

---

## 📜 Scripts Reference

| Command | Action |
|---|---|
| `npm run dev` | Runs the Next.js development server with hot reloading. |
| `npm run build` | Compiles the production build. |
| `npm run start` | Serves the optimized production build. |
| `npm run lint` | Runs ESLint to verify code quality. |
| `node seed.js` | Resets and seeds the SQLite database with initial records. |

---

## 🔮 Future Enhancements

- [ ] **Barcode / QR Scanning**: Direct camera scanning integration via WebRTC to instantly check in/out items.
- [ ] **Multi-Facility Switching**: Complete multi-warehouse tenant management with localized inventory counts.
- [ ] **Automated PO Generation**: Automatic purchase order creation when stock levels drop below reorder thresholds.
- [ ] **Role-Based Access Control (RBAC)**: Role permissions for Warehouse Staff, Procurement Managers, and Admins.
- [ ] **Authentication**: NextAuth.js or OAuth integration for secure user sessions.
