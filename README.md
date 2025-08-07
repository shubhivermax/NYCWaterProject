# 💧 NYC Water Quality Dashboard

An interactive dashboard that visualizes water sample data from New York City, built using **React**, **TypeScript**, **CSS**, **Recharts**, and the **NYC Open Data API**.

## 🔗 Demo

> ⚠️ *Note: The Loom link above is from another project — replace it with your own Loom walkthrough if needed!*

---

## 📊 Features

- ✅ Fetches live data from the **NYC Open Data API**
- ✅ Displays a **dashboard with 10+ unique items**, one per row
- ✅ Each row shows **at least two features** (e.g. borough, sampling date)
- ✅ Built using **`useEffect`** and **`async/await`** to handle API calls
- ✅ Includes **three+ summary statistics**, such as:
  - Total number of samples in the dataset
  - Mean chlorine level (or another relevant metric)
  - Range or quartile-based insights
- ✅ **Search bar**:
  - Filters items live as the user types
  - Matches items based on search terms
- ✅ **Category filter**:
  - Filters items by another attribute (e.g. borough or result)
  - Works independently from the search bar
  - Both search and filter dynamically update the results
- ✅ Includes visualizations using **Recharts** for trends and summaries

---

## 🛠 Tech Stack

- **Frontend:** React, TypeScript (TSX), CSS
- **Charts:** Recharts
- **Data Source:** NYC Open Data API
- **Hooks Used:** `useState`, `useEffect`, `async/await`

---

## 📁 Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/nyc-water-dashboard.git

# Navigate into the project
cd nyc-water-dashboard

# Install dependencies
npm install

# Run the app
npm run dev

