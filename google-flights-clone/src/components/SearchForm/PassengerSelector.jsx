import { useState } from 'react';
import { FiChevronDown, FiUsers } from 'react-icons/fi';
import { Menu, Transition } from '@headlessui/react';

export const PassengerSelector = ({ value, onChange }) => {
  const [passengers, setPassengers] = useState(value);

  const updatePassengers = (newValue) => {
    const val = Math.max(1, newValue);
    setPassengers(val);
    onChange(val);
  };

  return (
    <Menu as="div" className="relative">
      <label className="block text-sm text-gray-700 mb-1">Passengers</label>
      <Menu.Button className="w-full p-2 border rounded-lg flex items-center justify-between">
        <div className="flex items-center">
          <FiUsers className="mr-2 text-gray-500" />
          {passengers} {passengers > 1 ? 'Passengers' : 'Passenger'}
        </div>
        <FiChevronDown className="text-gray-500" />
      </Menu.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span>Passengers</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updatePassengers(passengers - 1)}
                  className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  -
                </button>
                <span>{passengers}</span>
                <button
                  onClick={() => updatePassengers(passengers + 1)}
                  className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};