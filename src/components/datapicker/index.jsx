import ClearIcon from '@mui/icons-material/Clear';
import { TextField } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import * as S from './styles';

const MyDataPicker = ({
  value,
  name,
  setFieldValue,
  maxData,
  clearButton = false,
  ...otherProps
}) => {
  const [dateFormated, setDateFormated] = useState('');

  const handleDateChange = (date) => {
    setDateFormated(date);
    const currentDate = new Date(dateFormated);
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setFieldValue(name, formattedDate);
  };

  const handleClear = () => {
    setDateFormated(null);
    setFieldValue(name, null);
  };

  useEffect(() => {
    if (value) {
      const dateString = value;
      const parts = dateString.split('-'); // Розділяємо рядок по дефісах
      const year = parseInt(parts[0], 10); // Отримуємо рік
      const month = parseInt(parts[1], 10) - 1; // Отримуємо місяць (нумерація місяців в JavaScript починається з 0)
      const day = parseInt(parts[2], 10); // Отримуємо день

      const date = new Date(year, month, day);
      setDateFormated(date);
    }
  }, [value]);

  return (
    <S.Picker>
      <DatePicker
        selected={dateFormated}
        maxDate={maxData ? new Date() : null}
        dateFormat="yyyy-MM-dd"
        onChange={(date) => handleDateChange(date)}
        customInput={<TextField readOnly {...otherProps} />}
      />
      {clearButton && value && (
        <S.PickerClear onClick={handleClear}>
          <ClearIcon />
        </S.PickerClear>
      )}
    </S.Picker>
  );
};
MyDataPicker.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  maxData: PropTypes.bool.isRequired,
  clearButton: PropTypes.bool.isRequired,
};
export default MyDataPicker;
