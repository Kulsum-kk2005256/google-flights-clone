import DatePicker from 'react-datepicker';
import { FiCalendar } from 'react-icons/fi';
import 'react-datepicker/dist/react-datepicker.css';

export const DatePickerInput = ({ selected, onChange }) => (
  <div className="relative">
    <label className="block text-sm text-gray-700 mb-1">Departure</label>
    <div className="relative">
      <DatePicker
        selected={selected}
        onChange={onChange}
        minDate={new Date()}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-google-blue focus:outline-none"
        dateFormat="MMM d, yyyy"
      />
      <FiCalendar className="absolute right-3 top-3 text-gray-500" />
    </div>
  </div>
);