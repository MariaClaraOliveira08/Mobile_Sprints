//npm install @react-native-community/datetimepicker
//npm install react-native-modal-datetime-picker
import React, { useState } from "react";
import { View, Button } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

const DateTimePickerDefault = ({ type, buttonTitle, setValue }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); //estado da visibilidade do DateTimePicker

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (data) => {
    setValue(data); //atualiza o valor da data/hora 
    hideDatePicker();
  };

  return (
    <View>
      <Button title={buttonTitle} onPress={showDatePicker} color="#e53935" />
      <DateTimePicker
        isVisible={isDatePickerVisible}
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
