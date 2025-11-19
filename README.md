# Noroff Online Shop – JavaScript Frameworks Course Assignment

A fully functional e-commerce application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **React Testing Library + Vitest**.  
This project fulfills all requirements for the Noroff JavaScript Frameworks Course Assignment.

---

## Live Demo  
**Vercel Deployment:** *<jsfw-2025-v1-ole-kristian-jsframewo.vercel.app>*  

## GitHub Repository  
**Repository:** *<https://github.com/NoroffFEU/jsfw-2025-v1-ole-kristian-jsframeworks>*

---

## Features

### Fetch & Display Products  
- Retrieves all products from **GET /online-shop**  
- Displays:
  - Product Image  
  - Title  
  - Original + Discounted Price  
  - Discount sticker (%)  
  - Rating  
- Fully responsive grid layout  

### Product Details Page  
Uses **GET /online-shop/:id** to show:  
- Title  
- Description  
- Image  
- Price + Discount  
- Tags  
- Reviews  
- Average rating  
- **Add to Cart button** with toast confirmation  

### Search & Sorting  
- Live search with suggestion dropdown  
- Sort by name or price  
- Toast message when **no results** are found  

### Shopping Cart System  
- Global cart state with Context + Reducer  
- Add/remove items  
- Adjustable quantities (+/- buttons)  
- Total price calculation  
- Cart persists through refresh (localStorage)  
- Toast on item removal  
- Cart count visible in header  

### Checkout Flow  
- Checkout button → success page  
- Cart clears on success  
- Toast: *"Checkout successful"*    

### Contact Form  
With full TypeScript validation:  
- Full Name (min 3 chars)  
- Subject (min 3 chars)  
- Email (valid format)  
- Message (min 10 chars)  
- Toasts for success + errors  

### Toast Notification System  
Uses **react-hot-toast** across the whole app.

### Responsive Design  
- Works on mobile, tablet, desktop  
- Clean layout using Tailwind CSS  
- Gradient header  
- Modern spacing & component styles  

### TypeScript Integration  
- Strict types for products  
- Strongly typed context state  
- Typed API functions  
- Typed components and props  

### Automated Tests  
Using **Vitest + React Testing Library**  
Included tests:
- `ProductGrid` renders product titles & prices  
- `CartCount` displays correct quantity  

Run tests:
```bash
npm run test
```

---

## Technologies Used

- **Next.js 14+ (App Router)**
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Vitest**
- **React Testing Library**
- **react-hot-toast**
- **JSDOM**
- **ESLint**

---

## API  
The project uses the Noroff Online Shop API:  
https://docs.noroff.dev/docs/v2/basic/online-shop

Endpoints used:
- `GET /online-shop`
- `GET /online-shop/:id`

---

## Running Tests

### Run all tests:
```bash
npm run test
```

### Watch mode:
```bash
npm run test:watch
```

Vitest config is located in:
```
vitest.config.ts
vitest.setup.ts
```

---

## Running the Project Locally

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

### 4. Start production build
```bash
npm start
```

App will run at:
```
http://localhost:3000
```

---

## Project Structure

```
src/
 ├── app/
 │   ├── page.tsx
 │   ├── cart/
 │   ├── product/[id]/
 │   ├── checkout/success/
 │   ├── contact/
 │   ├── layout.tsx
 │   └── cart-provider.tsx
 ├── components/
 │   ├── ProductGrid.tsx
 │   └── cart-count.tsx
 ├── lib/
 │   ├── api.ts
 │   └── cart.ts
 │   ├── types.ts
...
```

---

## Deployment (Vercel)

This project is deployed using **Vercel**.

### Steps:
1. Push your code to GitHub  
2. Go to https://vercel.com  
3. Import your repository  
4. Use defaults:
   - **Framework:** Next.js  
   - **Root:** `./`  
   - **Build command:** `next build`  
   - **Output:** `.next`  
5. Deploy  

---

## License  
This project is for educational use as part of the Noroff JavaScript Frameworks course.

---

## Author  
**Ole Kristian**  
JS Frameworks Course Assignment – Noroff 2025


















