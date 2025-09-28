import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductListPage } from "./pages/ProductListPage";
import ProductDetailPage from "./pages/Productdetail/ProductDetailPage";
import { Layout } from "./components/layout/Layout"; // Import the new Layout component

// A simple component for a "Not Found" page
function NotFoundPage() {
  return <div className="text-center text-xl">404 - Page Not Found</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All pages will now share the same Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductListPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          
          {/* A catch-all route for any invalid URLs */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;