import { FiMenu, FiUser } from 'react-icons/fi'

export const Header = () => {
  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold text-google-blue">
            Google Flights
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <FiMenu className="text-xl text-google-gray" />
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-full">
            <FiUser className="text-xl text-google-gray" />
            <span className="text-google-gray">Sign in</span>
          </button>
        </div>
      </div>
    </header>
  )
}