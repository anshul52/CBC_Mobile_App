import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

const CalendarComponent = ({onDateSelect, selectedDate, setSelectedDate}) => {
  const today = new Date()?.toISOString()?.split('T')[0];
  
  const markedDates = selectedDate ? {
    [selectedDate]: {
      selected: true,
      selectedColor: 'blue',
      disableTouchEvent: false,
    }
  } : {};

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    onDateSelect(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={today}
        minDate={today}
        markedDates={markedDates}
        onDayPress={onDayPress}
        enableSwipeMonths={true}
        hideExtraDays={true}
        markingType={'custom'}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6b6b6',
          selectedDayBackgroundColor: '#FFA14A',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#000000',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          monthTextColor: '#000000',
          textMonthFontSize: 16,
          textDayFontSize: 14,
          textDayHeaderFontSize: 14,
          'stylesheet.calendar.header': {
            header: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 10,
              marginTop: 6,
              alignItems: 'center',
            },
            monthText: {
              fontSize: 16,
              fontWeight: '500',
              color: '#000000',
            },
          },
          'stylesheet.day.basic': {
            base: {
              width: 32,
              height: 32,
              alignItems: 'center',
              justifyContent: 'center',
            },
            text: {
              fontSize: 14,
              fontWeight: '400',
            },
          },
          'stylesheet.calendar.main': {
            week: {
              marginTop: 4,
              marginBottom: 4,
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
          },
        }}
        renderArrow={direction => (
          <Text style={styles.arrow}>
            {direction === 'left' ? '‹' : '›'}
          </Text>
        )}
        renderHeader={date => {
          const month = date.toString('MMMM yyyy');
          return (
            <Text style={styles.monthText}>
              {month}
            </Text>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 0,
  },
  arrow: {
    fontSize: 24,
    color: '#000000',
    padding: 10,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  }
});

export default CalendarComponent;
