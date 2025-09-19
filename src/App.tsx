import { ProductListPage } from "./pages/ProductListPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">DIDI Suits</h1>
        </nav>
      </header>
      <main className="container mx-auto p-6 lg:p-8">
        <ProductListPage />
      </main>
    </div>
  );
}

export default App;
