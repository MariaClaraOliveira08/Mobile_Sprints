import React, { useState } from "react";
import { View, Button } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

const DateTimePickerDefault = ({ type, buttonTitle, dateKey, setValue }) => {
  const [isDatePickerVisable, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (data) => {
    setValue((prevState) => ({
      ...prevState,
      [dateKey]: data, // Salva sempre como objeto Date
    }));
    hideDatePicker();
  };

  return (
    <View>
      <Button title={buttonTitle} onPress={showDatePicker} color="violet" />
      <DateTimePicker
        isVisible={isDatePickerVisable}
        mode={type}
        locale="pt_BR"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        pickerContainerStyleIOS={{ backgroundColor: "#fff" }}
        textColor="#000"
      />
    </View>
  );
};
export default DateTimePickerDefault;
