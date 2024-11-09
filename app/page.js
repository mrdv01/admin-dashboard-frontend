import Link from 'next/link';

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                Blog Platform
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
                Welcome to our blogging platform. Manage your content easily.
              </p>
              <div className="mt-5 max-w-md mx-auto flex justify-center gap-3">
                <Link
                  href="/admin"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Admin Dashboard
                </Link>
                <Link
                  href="/admin/blogList"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 border-blue-600"
                >
                  View Blog
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">Manage Content</h3>
                <p className="mt-2 text-gray-600">
                  Create, edit, and delete blog posts easily through the admin dashboard.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">SEO Friendly</h3>
                <p className="mt-2 text-gray-600">
                  Optimize your content with built-in SEO tools and meta tags.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">Media Support</h3>
                <p className="mt-2 text-gray-600">
                  Add images and videos to make your content more engaging.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © 2024 Blog Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}